CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(180) NULL,
  service VARCHAR(120) NULL,
  message TEXT NULL,
  source VARCHAR(120) NULL,
  ip_address VARCHAR(45) NULL,
  user_agent VARCHAR(255) NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_contacts_phone (phone),
  INDEX idx_contacts_status (status),
  INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS featured_projects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  link VARCHAR(500) NOT NULL DEFAULT '#',
  image VARCHAR(500) NOT NULL,
  image_width INT UNSIGNED NOT NULL DEFAULT 1200,
  image_height INT UNSIGNED NOT NULL DEFAULT 800,
  open_in_new_tab TINYINT(1) NOT NULL DEFAULT 1,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_featured_projects_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pricing_plans (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(500) NOT NULL,
  old_price VARCHAR(60) NULL,
  current_price VARCHAR(60) NOT NULL,
  currency VARCHAR(20) NOT NULL DEFAULT 'VNĐ',
  badge VARCHAR(80) NULL,
  button_label VARCHAR(120) NOT NULL,
  button_variant ENUM('outline', 'primary') NOT NULL DEFAULT 'outline',
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_pricing_plans_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pricing_plan_features (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  plan_id BIGINT UNSIGNED NOT NULL,
  feature VARCHAR(300) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_pricing_plan_features_plan_sort (plan_id, sort_order),
  CONSTRAINT fk_pricing_plan_features_plan
    FOREIGN KEY (plan_id) REFERENCES pricing_plans(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO featured_projects
  (id, title, link, image, image_width, image_height, open_in_new_tab, is_active, sort_order)
VALUES
  (1, 'WEB DỊCH VỤ VẬN CHUYỂN', 'https://dichvuchuyennha24h.vercel.app/', '/images/dichvuvanchuyen.png', 1863, 8954, 1, 1, 1),
  (2, 'WEB GYM & FITNESS', 'https://ignitefitness-five.vercel.app', '/images/gym.png', 1863, 6410, 1, 1, 2),
  (3, 'WEB MỸ PHẨM', 'https://beauty-blendz.vercel.app/', '/images/mypham.png', 1863, 12259, 1, 1, 3),
  (4, 'WEB BÁN GIÀY', 'https://zest-foot.vercel.app/', '/images/bangiay.png', 1863, 8766, 1, 1, 4),
  (5, 'WEB BẤT ĐỘNG SẢN', 'https://kingdombds.vercel.app/', '/images/bds.png', 1863, 11840, 1, 1, 5),
  (6, 'WEB ĐẶT ĐỒ ĂN', 'https://food-pizzan.vercel.app/', '/images/food.png', 1875, 7056, 1, 1, 6),
  (7, 'WEB NỘI THẤT BẾP ĂN', 'https://pan-pot-a5ns.vercel.app/', '/images/dodungvanphong.png', 1875, 4377, 1, 1, 7),
  (8, 'WEB SẮC ĐẸP 24H', '#', '/images/sacdep24h.png', 1875, 9194, 1, 1, 8),
  (9, 'WEB ĐẶT BÀN NHÀ HÀNG', 'https://restaurant-brown-one.vercel.app/', '/images/monarestaurant.png', 1875, 6241, 1, 1, 9),
  (10, 'WEB BÁN COFFEE', '#', '/images/cafengon.png', 1875, 6034, 1, 1, 10),
  (11, 'WEB BẤT ĐỘNG SẢN', '#', '/images/monahill.png', 1863, 6909, 1, 1, 11),
  (12, 'WEB XÂY DỰNG', '#', '/images/sigma.png', 1863, 6323, 1, 1, 12),
  (13, 'WEB BÁN CARD POKEMON', '#', '/images/card_pokemon.png', 1864, 4233, 1, 1, 13);

INSERT IGNORE INTO pricing_plans
  (id, name, description, old_price, current_price, currency, badge, button_label, button_variant, is_featured, is_active, sort_order)
VALUES
  (1, 'BASIC', 'Hoàn hảo cho khởi đầu, giao diện chuẩn SEO với chi phí tối ưu.', '1.990.000', '1.499.000', 'VNĐ', NULL, 'Chọn Gói Basic', 'outline', 0, 1, 1),
  (2, 'BUSINESS', 'Tối ưu SEO, thiết kế đẹp nâng tầm doanh nghiệp.', '4.990.000', '2.999.000', 'VNĐ', NULL, 'Chọn Gói Business', 'outline', 0, 1, 2),
  (3, 'PRO', 'Hệ thống website chuyên nghiệp, tối ưu trải nghiệm người dùng.', NULL, '4.999.000', 'VNĐ', 'PHỔ BIẾN NHẤT', 'Chọn Gói PRO', 'primary', 1, 1, 3),
  (4, 'PRO+', 'Website thương mại điện tử với cổng thanh toán trực tuyến.', NULL, '6.999.000', 'VNĐ', NULL, 'Chọn Gói PRO+', 'outline', 0, 1, 4),
  (5, 'VIP', 'Hệ thống website đa kênh đồ sộ, tích hợp AI mạnh mẽ.', NULL, '10.999.000', 'VNĐ', NULL, 'Chọn Gói VIP', 'outline', 0, 1, 5);

INSERT IGNORE INTO pricing_plan_features (id, plan_id, feature, sort_order)
VALUES
  (1, 1, '1-3 ngày hoàn thành', 1),
  (2, 1, 'Tặng Domain & Hosting .app', 2),
  (3, 1, 'Template tối ưu chuyển đổi', 3),
  (4, 1, 'Cấu trúc chuẩn SEO', 4),
  (5, 1, 'Bảo mật SSL', 5),
  (6, 1, 'Nhúng Google Search Console, Google Analytics', 6),
  (7, 2, '6-10 ngày hoàn thành', 1),
  (8, 2, 'Giao diện theo mẫu tự chọn', 2),
  (9, 2, 'Tặng Domain & Hosting .app', 3),
  (10, 2, 'Tặng 1000 Follows Fanpage', 4),
  (11, 2, 'Trang web chuẩn SEO 3 Trang', 5),
  (12, 2, 'Mọi tính năng Gói Basic', 6),
  (13, 3, '> 9 ngày hoàn thành', 1),
  (14, 3, 'Chỉnh sửa thiết kế đến khi hài lòng', 2),
  (15, 3, 'Giao diện tương thích mọi thiết bị', 3),
  (16, 3, 'Admin quản lí dễ dàng', 4),
  (17, 3, 'Đa ngôn ngữ', 5),
  (18, 3, 'Mọi tính năng Gói Business', 6),
  (19, 4, '> 10 ngày hoàn thành', 1),
  (20, 4, 'Tích hợp cổng thanh toán (VNPay, Momo, ZaloPay,...)', 2),
  (21, 4, 'Quản lý đơn hàng tự động', 3),
  (22, 4, 'Giỏ hàng & Thanh toán trực tuyến', 4),
  (23, 4, 'Quản lý kho & sản phẩm', 5),
  (24, 4, 'Báo cáo doanh thu rõ ràng', 6),
  (25, 4, 'Mọi tính năng Gói PRO', 7),
  (26, 5, '> 9 ngày hoàn thành', 1),
  (27, 5, 'Chỉnh sửa thiết kế đến khi hài lòng', 2),
  (28, 5, 'Đồng bộ hệ thống CRM', 3),
  (29, 5, 'Tích hợp ChatGPT / AI', 4),
  (30, 5, 'Quản lý bán hàng nội bộ', 5),
  (31, 5, 'Đa ngôn ngữ', 6),
  (32, 5, 'Mọi tính năng Gói PRO+', 7);
