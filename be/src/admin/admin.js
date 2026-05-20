const state = {
  projects: [],
  pricingPlans: [],
};

const adminKeyInput = document.querySelector("#adminKey");
const notice = document.querySelector("#notice");
const projectForm = document.querySelector("#projectForm");
const pricingForm = document.querySelector("#pricingForm");
const projectsTable = document.querySelector("#projectsTable");
const pricingTable = document.querySelector("#pricingTable");
const projectImageFileInput = document.querySelector("#projectImageFile");
const projectImagePreview = document.querySelector("#projectImagePreview");

adminKeyInput.value = localStorage.getItem("mocmoc_admin_key") || "";

function showNotice(message, isError = false) {
  notice.textContent = message;
  notice.classList.toggle("is-error", isError);
  notice.hidden = false;
  window.setTimeout(() => {
    notice.hidden = true;
  }, 4000);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function api(path, options = {}) {
  const adminKey = adminKeyInput.value.trim();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
      ...(options.headers || {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || "Có lỗi xảy ra");
  }

  return body.data;
}

async function uploadApi(path, formData) {
  const adminKey = adminKeyInput.value.trim();
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "X-Admin-Key": adminKey,
    },
    body: formData,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || "Không thể tải ảnh lên");
  }

  return body.data;
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function getPreviewSrc(value) {
  if (!value) return "";
  return value.startsWith("/uploads/") ? value : value;
}

function updateProjectImagePreview(src) {
  if (!src) {
    projectImagePreview.hidden = true;
    projectImagePreview.removeAttribute("src");
    return;
  }

  projectImagePreview.src = getPreviewSrc(src);
  projectImagePreview.hidden = false;
}

function resetProjectForm() {
  projectForm.reset();
  projectForm.elements.id.value = "";
  projectForm.elements.image.value = "";
  projectForm.elements.width.value = 1200;
  projectForm.elements.height.value = 800;
  projectForm.elements.sortOrder.value = 0;
  projectForm.elements.blank.checked = true;
  projectImageFileInput.value = "";
  updateProjectImagePreview("");
}

function resetPricingForm() {
  pricingForm.reset();
  pricingForm.elements.id.value = "";
  pricingForm.elements.currency.value = "VNĐ";
  pricingForm.elements.sortOrder.value = 0;
}

function renderProjects() {
  projectsTable.innerHTML = state.projects
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.title)}</td>
          <td>${item.sortOrder}</td>
          <td>${item.isActive ? "Hiển thị" : "Ẩn"}</td>
          <td>
            <div class="row-actions">
              <button type="button" data-edit-project="${item.id}">Sửa</button>
              <button class="danger" type="button" data-delete-project="${item.id}">Xóa</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderPricing() {
  pricingTable.innerHTML = state.pricingPlans
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.currentPrice)} ${escapeHtml(item.currency)}</td>
          <td>${item.isActive ? "Hiển thị" : "Ẩn"}</td>
          <td>
            <div class="row-actions">
              <button type="button" data-edit-pricing="${item.id}">Sửa</button>
              <button class="danger" type="button" data-delete-pricing="${item.id}">Xóa</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

async function loadProjects() {
  state.projects = await api("/api/admin/projects");
  renderProjects();
}

async function loadPricing() {
  state.pricingPlans = await api("/api/admin/pricing-plans");
  renderPricing();
}

async function loadAll() {
  await Promise.all([loadProjects(), loadPricing()]);
}

document.querySelector("#saveKeyBtn").addEventListener("click", async () => {
  localStorage.setItem("mocmoc_admin_key", adminKeyInput.value.trim());
  try {
    await loadAll();
    showNotice("Đã lưu key và tải dữ liệu.");
  } catch (error) {
    showNotice(error.message, true);
  }
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    const selected = tab.dataset.tab;
    document.querySelector("#projectsPanel").hidden = selected !== "projects";
    document.querySelector("#pricingPanel").hidden = selected !== "pricing";
  });
});

document.querySelector("#newProjectBtn").addEventListener("click", resetProjectForm);
document.querySelector("#newPricingBtn").addEventListener("click", resetPricingForm);
document.querySelector('[data-reset="project"]').addEventListener("click", resetProjectForm);
document.querySelector('[data-reset="pricing"]').addEventListener("click", resetPricingForm);

projectImageFileInput.addEventListener("change", () => {
  const file = projectImageFileInput.files?.[0];
  if (!file) return;

  updateProjectImagePreview(URL.createObjectURL(file));
});

document.querySelector("#uploadProjectImageBtn").addEventListener("click", async () => {
  const file = projectImageFileInput.files?.[0];
  if (!file) {
    showNotice("Vui lòng chọn ảnh trước khi tải lên.", true);
    return;
  }

  const formData = new FormData();
  formData.append("projectTitle", projectForm.elements.title.value || "du-an");
  formData.append("image", file);

  try {
    const uploaded = await uploadApi("/api/admin/uploads/projects", formData);
    projectForm.elements.image.value = uploaded.url;
    updateProjectImagePreview(uploaded.url);
    showNotice("Đã tải ảnh lên và điền đường dẫn.");
  } catch (error) {
    showNotice(error.message, true);
  }
});

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const raw = formToObject(projectForm);
  const id = raw.id;
  const payload = {
    title: raw.title,
    link: raw.link || "#",
    image: raw.image,
    width: Number(raw.width || 1200),
    height: Number(raw.height || 800),
    sortOrder: Number(raw.sortOrder || 0),
    blank: projectForm.elements.blank.checked,
    isActive: raw.isActive === "true",
  };

  try {
    await api(id ? `/api/admin/projects/${id}` : "/api/admin/projects", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });
    resetProjectForm();
    await loadProjects();
    showNotice("Đã lưu dự án.");
  } catch (error) {
    showNotice(error.message, true);
  }
});

pricingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const raw = formToObject(pricingForm);
  const id = raw.id;
  const payload = {
    name: raw.name,
    description: raw.description,
    oldPrice: raw.oldPrice,
    currentPrice: raw.currentPrice,
    currency: raw.currency || "VNĐ",
    badge: raw.badge,
    buttonLabel: raw.buttonLabel,
    buttonVariant: raw.buttonVariant,
    features: raw.features.split("\n").map((item) => item.trim()).filter(Boolean),
    sortOrder: Number(raw.sortOrder || 0),
    isFeatured: pricingForm.elements.isFeatured.checked,
    isActive: raw.isActive === "true",
  };

  try {
    await api(id ? `/api/admin/pricing-plans/${id}` : "/api/admin/pricing-plans", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });
    resetPricingForm();
    await loadPricing();
    showNotice("Đã lưu gói giá.");
  } catch (error) {
    showNotice(error.message, true);
  }
});

document.addEventListener("click", async (event) => {
  const editProjectId = event.target.dataset.editProject;
  const deleteProjectId = event.target.dataset.deleteProject;
  const editPricingId = event.target.dataset.editPricing;
  const deletePricingId = event.target.dataset.deletePricing;

  if (editProjectId) {
    const item = state.projects.find((project) => String(project.id) === editProjectId);
    if (!item) return;
    projectForm.elements.id.value = item.id;
    projectForm.elements.title.value = item.title;
    projectForm.elements.link.value = item.link;
    projectForm.elements.image.value = item.image;
    projectForm.elements.width.value = item.width;
    projectForm.elements.height.value = item.height;
    projectForm.elements.sortOrder.value = item.sortOrder;
    projectForm.elements.blank.checked = item.blank;
    projectForm.elements.isActive.value = String(item.isActive);
    projectImageFileInput.value = "";
    updateProjectImagePreview(item.image);
  }

  if (deleteProjectId && confirm("Xóa dự án này?")) {
    try {
      await api(`/api/admin/projects/${deleteProjectId}`, { method: "DELETE" });
      await loadProjects();
      showNotice("Đã xóa dự án.");
    } catch (error) {
      showNotice(error.message, true);
    }
  }

  if (editPricingId) {
    const item = state.pricingPlans.find((plan) => String(plan.id) === editPricingId);
    if (!item) return;
    pricingForm.elements.id.value = item.id;
    pricingForm.elements.name.value = item.name;
    pricingForm.elements.description.value = item.description;
    pricingForm.elements.oldPrice.value = item.oldPrice || "";
    pricingForm.elements.currentPrice.value = item.currentPrice;
    pricingForm.elements.currency.value = item.currency;
    pricingForm.elements.badge.value = item.badge || "";
    pricingForm.elements.buttonLabel.value = item.buttonLabel;
    pricingForm.elements.buttonVariant.value = item.buttonVariant;
    pricingForm.elements.features.value = item.features.join("\n");
    pricingForm.elements.sortOrder.value = item.sortOrder;
    pricingForm.elements.isFeatured.checked = item.isFeatured;
    pricingForm.elements.isActive.value = String(item.isActive);
  }

  if (deletePricingId && confirm("Xóa gói giá này?")) {
    try {
      await api(`/api/admin/pricing-plans/${deletePricingId}`, { method: "DELETE" });
      await loadPricing();
      showNotice("Đã xóa gói giá.");
    } catch (error) {
      showNotice(error.message, true);
    }
  }
});

if (adminKeyInput.value) {
  loadAll().catch((error) => showNotice(error.message, true));
}
