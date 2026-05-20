# MOCMOC API

Backend Express.js kết nối MySQL cho website MOCMOC.

## API hiện có

- `GET /api/health`: kiểm tra API đang chạy.
- `GET /api/health/db`: kiểm tra kết nối MySQL.
- `POST /api/contacts`: lưu thông tin khách hàng cần tư vấn.

Body mẫu cho `POST /api/contacts`:

```json
{
  "name": "Nguyễn Văn A",
  "phone": "0858200725",
  "email": "email@example.com",
  "service": "Thiết kế website",
  "message": "Tôi cần tư vấn gói website doanh nghiệp",
  "source": "website"
}
```

## Cấu hình

Tạo file `.env` từ `.env.example`, sau đó điền đúng tài khoản MySQL:

```bash
cp .env.example .env
```

Giá trị DB mặc định đã dùng host bạn đưa:

```env
DB_HOST=36.50.27.243
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=default
```

## Chạy local

```bash
npm install
npm run db:migrate
npm run dev
```

API mặc định chạy tại `http://localhost:4000`.

## Deploy với PM2

```bash
npm ci --omit=dev
npm run db:migrate
pm2 start ecosystem.config.cjs
pm2 save
```

Nếu đặt API sau Nginx, trỏ reverse proxy về port `4000` và giữ `TRUST_PROXY=1`.
