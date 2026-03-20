"use client";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { LuRocket, LuTarget, LuShieldCheck, LuSparkles, LuSettings, LuBlocks, LuCheck, LuCircleCheck } from "react-icons/lu";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef(null);

  useEffect(() => {
    // Scroll handling
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer
    let countersStarted = false;
    const startCounters = () => {
      if (countersStarted) return;
      countersStarted = true;

      const counters = document.querySelectorAll(".counter");
      const speed = 200;

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 10);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          if (entry.target.classList.contains("hero-stats")) {
            startCounters();
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in-up");
    fadeElements.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`header ${scrolled ? "scrolled" : "header-transparent"}`}
        id="header"
        ref={headerRef}
      >
        <div className="container header-container">
          <Link href="#" className="logo">
            <img
              src="/images/logoxoaphong.png"
              alt="MOCMOC Logo"
              style={{ objectFit: 'contain', maxHeight: '50px', width: 'auto', height: '50px' }}
            />
          </Link>
          <nav className={`nav ${navOpen ? "nav-open" : ""}`}>
            <ul className="nav-list">
              <li>
                <Link
                  href="#home"
                  className={`nav-link ${activeSection === "home" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className={`nav-link ${activeSection === "services" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className={`nav-link ${activeSection === "benefits" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Lợi ích
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className={`nav-link ${activeSection === "process" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Quy trình
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className={`nav-link ${activeSection === "pricing" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className={`nav-link ${activeSection === "projects" ? "active" : ""
                    }`}
                  onClick={() => setNavOpen(false)}
                >
                  Dự án
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <a href="tel:0336617900" className="btn-outline">
              033 6617 900
            </a>
            <a href="http://zalo.me/0858200725" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Liên Hệ Ngay
            </a>
          </div>
          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span
              style={{
                transform: navOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            ></span>
            <span style={{ opacity: navOpen ? "0" : "1" }}></span>
            <span
              style={{
                transform: navOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            ></span>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          {/* Video nền - sẽ bổ sung sau */}
          <div className="hero-video-wrap">
            <video
              className="hero-video"
              autoPlay muted loop playsInline
              preload="metadata"
              poster="/images/dichvuvanchuyen.png"
            >
              <source src="/videos/video-index-home.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Gradient overlay trái sang phải */}
          <div className="hero-overlay"></div>

          <div className="container hero-container">
            <div className="hero-left fade-in-up">
              <p className="hero-pre">Thiết kế website chuyên nghiệp</p>
              <h1 className="hero-title">
                Nâng tầm thương hiệu<br />
                <span className="text-gradient-white">vượt trội cùng MOCMOC</span>
              </h1>
              <p className="hero-subtitle">
                Giao diện chuẩn UI/UX, tối ưu SEO hoàn hảo,<br />
                bàn giao nhanh — bảo hành trọn đời.
              </p>
              <div className="hero-cta">
                <a href="#consult" className="btn-hero-primary">
                  Liên Hệ Ngay
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
              <div className="hero-stats fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="hero-stat">
                  <span className="hero-stat-num"><span className="counter" data-target="5000">0</span>+</span>
                  <span className="hero-stat-label">Dự Án</span>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <span className="hero-stat-num"><span className="counter" data-target="3686">0</span>+</span>
                  <span className="hero-stat-label">Khách Hàng</span>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <span className="hero-stat-num"><span className="counter" data-target="7">0</span>+</span>
                  <span className="hero-stat-label">Năm KN</span>
                </div>
                <div className="hero-stat-divider"></div>
                <div className="hero-stat">
                  <span className="hero-stat-num"><span className="counter" data-target="98">0</span>%</span>
                  <span className="hero-stat-label">Hài Lòng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="benefits section-padding">
          <div className="container">
            <div className="section-header text-center fade-in-up">
              <h2 className="section-title">
                Lợi ích của <span className="text-gradient">website chuyên nghiệp</span>
              </h2>
              <p className="section-desc">
                Đầu tư vào một website chất lượng là bạn đang đầu tư vào tương lai của
                doanh nghiệp.
              </p>
            </div>

            <div className="bento-grid">
              <div className="bento-item glass-panel fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="bento-icon"><LuRocket size={32} color="#E15021" /></div>
                <h3 className="bento-title">Tốc độ & Hiệu suất</h3>
                <p className="bento-desc">
                  Tối ưu hình ảnh, giảm thiểu JS/CSS và sử dụng CDN giúp web load nhanh
                  như chớp, giữ chân khách hàng.
                </p>
              </div>

              <div className="bento-item bento-large glass-panel fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="bento-icon"><LuTarget size={32} color="#E15021" /></div>
                <h3 className="bento-title">Chuẩn SEO Tuyệt Đối</h3>
                <p className="bento-desc">
                  Tối ưu on-page, URL thân thiện, schema markup và cấu trúc mã nguồn theo
                  tiêu chuẩn cao nhất của Google. Tăng trưởng organic traffic bền vững.
                </p>
              </div>

              <div className="bento-item glass-panel fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="bento-icon"><LuShieldCheck size={32} color="#E15021" /></div>
                <h3 className="bento-title">Bảo Mật Tối Đa</h3>
                <p className="bento-desc">
                  Bảo vệ SSL/HTTPS, chống DDoS, tường lửa và mã hóa dữ liệu an toàn chặn
                  đứng mọi cuộc tấn công.
                </p>
              </div>

              <div className="bento-item glass-panel fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="bento-icon"><LuSparkles size={32} color="#E15021" /></div>
                <h3 className="bento-title">Chuẩn UI/UX</h3>
                <p className="bento-desc">
                  Thiết kế sáng tạo, đẹp mắt, responsive đa thiết bị, mang lại trải
                  nghiệm tương tác liền mạch.
                </p>
              </div>

              <div className="bento-item glass-panel fade-in-up" style={{ animationDelay: "0.5s" }}>
                <div className="bento-icon"><LuSettings size={32} color="#E15021" /></div>
                <h3 className="bento-title">Dễ Dàng Quản Trị</h3>
                <p className="bento-desc">
                  Hệ thống CMS hiện đại, trực quan, cho phép thao tác cập nhật nội dung
                  chỉ trong nháy mắt.
                </p>
              </div>

              <div className="bento-item glass-panel fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="bento-icon"><LuBlocks size={32} color="#E15021" /></div>
                <h3 className="bento-title">Tính Năng Đa Dạng</h3>
                <p className="bento-desc">
                  Tích hợp TMĐT, thanh toán, CRM, Chatbot, dễ dàng mở rộng khi doanh
                  nghiệp phát triển.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="process section-padding dark-bg">
          <div className="container">
            <div className="section-header text-center fade-in-up">
              <h2 className="section-title">
                <span className="text-gradient">Quy Trình</span> Làm Việc
              </h2>
              <p className="section-desc">
                8 bước chuyên nghiệp đảm bảo dự án thành công mỹ mãn.
              </p>
            </div>

            <div className="timeline">

              <div className="timeline-item">
                <div className="timeline-dot">1</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Tìm hiểu yêu cầu</h3>
                  <p>
                    Phân tích chuyên sâu nhu cầu, mục tiêu, khách hàng mục tiêu của doanh
                    nghiệp để đưa ra hướng giải pháp.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">2</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Lập kế hoạch & báo giá</h3>
                  <p>
                    Chi tiết hóa timeline, phân bổ nguồn lực, thống nhất tính năng và chi
                    phí rõ ràng.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">3</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Ký kết hợp đồng</h3>
                  <p>
                    Đảm bảo quyền lợi hai bên với những điều khoản rõ ràng, cam kết KPIs.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">4</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Thiết kế & Phát triển</h3>
                  <p>
                    Lên wireframe, thiết kế UI/UX theo Brand Guideline và code hoàn thiện
                    bằng các công nghệ tân tiến nhất.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">5</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Kiểm thử & Tối ưu</h3>
                  <p>
                    Đội ngũ QA/QC audit toàn bộ tính năng, bugs, tốc độ và chuẩn SEO
                    Onpage.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">6</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Feedback & Chỉnh sửa</h3>
                  <p>
                    Gửi bản Demo, nhận luồng phản hồi và mài giũa sản phẩm đến khi đạt
                    mức độ hoàn hảo.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot">7</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Hướng dẫn & Bàn giao</h3>
                  <p>
                    Training thao tác quản trị, bàn giao Source Code và các tài liệu
                    hướng dẫn.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">8</div>
                <div className="timeline-content glass-panel fade-in-up">
                  <h3 className="timeline-title">Hỗ trợ & Bảo trì</h3>
                  <p>
                    Đồng hành trọn đời, support kỹ thuật 24/7 để website luôn hoạt động
                    ổn định nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects / Slider Section */}
        <section id="projects" className="projects section-padding" style={{ overflow: 'hidden' }}>
          <div className="container">
            <div className="section-header text-center fade-in-up">
              <h2 className="section-title">
                Dự án <span className="text-gradient">Nổi Bật</span>
              </h2>
              <p className="section-desc">
                Cùng khám phá những sản phẩm công nghệ tuyệt vời mà chúng tôi đã thiết kế và triển khai thành công.
              </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                loop={true}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="project-swiper"
                style={{ paddingBottom: '3rem' }}
              >
                {[
                  { id: 1, title: 'WEB DỊCH VỤ VẬN CHUYỂN', link: '/dichvuvanchuyen/index.html', image: '/images/dichvuvanchuyen.png', blank: true },
                  { id: 2, title: 'WEB GYM & FITNESS', link: 'https://ignitefitness-five.vercel.app', image: '/images/gym.png', blank: true },
                  { id: 3, title: 'WEB MỸ PHẨM', link: 'https://beauty-blendz.vercel.app/', image: '/images/mypham.png', blank: true },
                  { id: 4, title: 'WEB BÁN GIÀY', link: 'https://zest-foot.vercel.app/', image: '/images/bangiay.png', blank: true },
                  { id: 5, title: 'WEB BẤT ĐỘNG SẢN', link: 'https://kingdombds.vercel.app/', image: '/images/bds.png', blank: true },

                  { id: 6, title: 'WEB ĐẶT ĐỒ ĂN', link: 'https://food-pizzan.vercel.app/', image: '/images/food.png', blank: true },
                  { id: 7, title: 'WEB GYM & FITNESS', link: 'https://ignitefitness-five.vercel.app', image: '/images/gym.png', blank: true },
                  { id: 8, title: 'WEB MỸ PHẨM', link: 'https://beauty-blendz.vercel.app/', image: '/images/mypham.png', blank: true },
                  { id: 9, title: 'WEB BÁN GIÀY', link: 'https://zest-foot.vercel.app/', image: '/images/bangiay.png', blank: true },
                  { id: 10, title: 'WEB BẤT ĐỘNG SẢN', link: 'https://kingdombds.vercel.app/', image: '/images/bds.png', blank: true },
            
          
                ].map((item) => (
                  <SwiperSlide key={item.id} className="project-slide">
                    <a href={item.link} target={item.blank ? "_blank" : "_self"} rel={item.blank ? "noopener noreferrer" : ""} className="project-link">
                      <div className="project-img-wrap">
                        <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                      </div>
                      <p className="project-slide-title">{item.title}</p>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing section-padding" style={{ overflow: 'hidden' }}>
          <div className="container">
            <div className="section-header text-center fade-in-up">
              <h2 className="section-title">
                Bảng Giá <span className="text-gradient">Thiết Kế Trọn Gói</span>
              </h2>
              <p className="section-desc">
                Chất lượng cao nhất - Chi phí phù hợp nhất.
              </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[EffectCoverflow, Pagination]}
                className="pricing-swiper"
                style={{ paddingBottom: '3rem' }}
              >
                {/* Basic */}
                <SwiperSlide className="pricing-swiper-slide">
                  <div className="pricing-card glass-panel">
                    <div className="pricing-header">
                      <h3 className="plan-name">BASIC</h3>
                      <p className="plan-desc">Hoàn hảo cho khởi đầu, giao diện chuẩn SEO với chi phí tối ưu.</p>
                      <div className="plan-price">
                        <span className="old-price">1.990.000 VNĐ</span>
                        <span className="current-price">799.000 <span className="currency">VNĐ</span></span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> 1-3 ngày hoàn thành</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Tặng Domain & Hosting ưu đãi</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Template tối ưu chuyển đổi</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Cấu trúc chuẩn SEO</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Bảo mật SSL</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Nhúng Live Chat, Google Analytics</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Bảo hành trọn đời</li>
                    </ul>
                    <div className="pricing-footer">
                      <a href="#consult" className="btn-outline btn-full">Chọn Gói Basic</a>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Business */}
                <SwiperSlide className="pricing-swiper-slide">
                  <div className="pricing-card glass-panel highlight">
                    <div className="popular-badge">PHỔ BIẾN NHẤT</div>
                    <div className="pricing-header">
                      <h3 className="plan-name text-gradient">BUSINESS</h3>
                      <p className="plan-desc">Tối ưu công nghệ, thiết kế độc quyền nâng tầm doanh nghiệp.</p>
                      <div className="plan-price">
                        <span className="old-price">4.990.000 VNĐ</span>
                        <span className="current-price text-gradient">1.999.000 <span className="currency">VNĐ</span></span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li><LuCircleCheck size={20} color="#E15021" style={{ flexShrink: 0, marginTop: '2px' }} /> 6-10 ngày hoàn thành</li>
                      <li><LuCircleCheck size={20} color="#E15021" style={{ flexShrink: 0, marginTop: '2px' }} /> Giao diện độc quyền sáng tạo</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Tặng Domain & Hosting 1 năm</li>
                      <li><LuCircleCheck size={20} color="#E15021" style={{ flexShrink: 0, marginTop: '2px' }} /> Tặng Fanpage 2000 Follows</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Upload 10 Bài/Sản phẩm + 5 Trang</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Tích hợp VNPAY, MOMO, GHN...</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Mọi tính năng Gói Basic</li>
                    </ul>
                    <div className="pricing-footer">
                      <a href="#consult" className="btn-primary btn-full pulse">Chọn Gói Business</a>
                    </div>
                  </div>
                </SwiperSlide>

                {/* VIP */}
                <SwiperSlide className="pricing-swiper-slide">
                  <div className="pricing-card glass-panel">
                    <div className="pricing-header">
                      <h3 className="plan-name">VIP</h3>
                      <p className="plan-desc">Hệ thống website đa kênh đồ sộ, tích hợp AI mạnh mẽ.</p>
                      <div className="plan-price">
                        <span className="current-price">20.999.000 <span className="currency">VNĐ</span></span>
                      </div>
                    </div>
                    <ul className="plan-features">
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> &gt; 9 ngày hoàn thành</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Chỉnh sửa thiết kế đến khi hài lòng</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Thiết kế chuẩn Brand Guideline</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Đồng bộ hệ thống CRM đa kênh</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Tích hợp ChatGPT / AI</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Quản lý bán hàng nội bộ</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Đa ngôn ngữ</li>
                      <li><LuCheck size={20} color="#3A7BD5" style={{ flexShrink: 0, marginTop: '2px' }} /> Mọi tính năng Gói Business</li>
                    </ul>
                    <div className="pricing-footer">
                      <a href="#consult" className="btn-outline btn-full">Chọn Gói VIP</a>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* CTA Section / Consult */}
        <section id="consult" className="cta-section section-padding">
          <div className="container">
            <div className="cta-box glass-panel text-center fade-in-up">
              <h2 className="cta-title">Sẵn sàng để bắt đầu dự án của bạn?</h2>
              <p className="cta-desc">
                Liên hệ với MOCMOC ngay hôm nay. Chúng tôi sẽ phân tích và đưa ra lộ trình
                tư vấn hoàn toàn miễn phí, kiến tạo giá trị thực cho tương lai số của bạn.
              </p>
              <div className="cta-form">
                <a href="http://zalo.me/0858200725" target="_blank" rel="noopener noreferrer" className="btn-primary btn-cta-large">
                  Liên Hệ Ngay
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer border-t">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="#" className="logo">
                <img
                  src="/images/logoxoaphong.png"
                  alt="MOCMOC Logo"
                  style={{ objectFit: 'contain', maxHeight: '50px', width: 'auto', height: '50px' }}
                />
              </Link>
              <p className="footer-slogan">ĐỔI MỚI CÔNG NGHỆ - TỐI ĐA HIỆU QUẢ</p>
              <p className="footer-contact">
                Hotline: <strong className="text-gradient">033 6617 900</strong>
              </p>
            </div>
            <div className="footer-links">
              <h3>Khám Phá</h3>
              <ul>
                <li><Link href="#home">Trang chủ</Link></li>
                <li><Link href="#services">Dịch vụ</Link></li>
                <li><Link href="#projects">Dự án MVP</Link></li>
                <li><Link href="#">Blog Kiến Thức</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Dịch Vụ</h3>
              <ul>
                <li><Link href="#">Thiết Kế Website</Link></li>
                <li><Link href="#">Thiết Kế Web App</Link></li>
                <li><Link href="#">SEO Tổng Thể</Link></li>
                <li><Link href="#">Digital Ads</Link></li>
              </ul>
            </div>
            <div className="footer-social">
              <h3>Kết Nối</h3>
              <div className="social-icons">
                <Link href="#" className="social-icon"><FaFacebookF size={18} /></Link>
                <Link href="#" className="social-icon"><FaTiktok size={18} /></Link>
                <Link href="#" className="social-icon"><FaYoutube size={18} /></Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2026 MOCMOC. All rights reserved. Designed with ❤️ for excellence.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
