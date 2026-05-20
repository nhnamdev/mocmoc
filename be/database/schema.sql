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
