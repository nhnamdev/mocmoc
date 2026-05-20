# Deploy MOCMOC lên Coolify

Project đã có `docker-compose.yml` ở thư mục gốc để deploy dạng Docker Compose trên Coolify.

## Biến môi trường cần đặt trong Coolify

```env
NEXT_PUBLIC_API_URL=https://api.mocmoc.vn
APP_ORIGIN=https://mocmoc.vn
DB_HOST=36.50.27.243
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=mocmoc
DB_CONNECTION_LIMIT=10
TRUST_PROXY=1
RUN_MIGRATIONS=true
```

## Domain trong Coolify

- Service `web` chạy port container `3000`. Khi gán domain cho frontend, dùng `https://mocmoc.vn:3000`.
- Service `api` chạy port container `4000`. Khi gán domain cho API, dùng `https://api.mocmoc.vn:4000`.

Coolify vẫn public domain qua cổng 80/443; phần `:3000` và `:4000` chỉ để proxy biết container port nội bộ.

## Deploy qua API

Coolify cần URL dashboard và resource UUID/tag. Endpoint deploy:

```bash
curl -H "Authorization: Bearer <COOLIFY_API_TOKEN>" \
  "https://coolify.example.com/api/v1/deploy?uuid=<RESOURCE_UUID>&force=true"
```

Token không nên commit vào repo hoặc ghi trong file cấu hình.
