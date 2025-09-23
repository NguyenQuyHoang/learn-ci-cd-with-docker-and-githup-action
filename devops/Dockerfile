# -------------------------------
# Stage 1: Builder (dùng để build ứng dụng)
# -------------------------------
    FROM node:20-alpine AS builder

    # (Dự án) Next.js 15 yêu cầu Node >= 18.18 -> Node 20 hoàn toàn tương thích.
    # (Docker) Lấy image nhẹ (Alpine) với Node 20 để build code.
    
    WORKDIR /app
    # (Dự án) Tất cả code sẽ được copy vào thư mục /app trong container.
    # (Docker) WORKDIR tạo thư mục làm việc mặc định, các lệnh sau chạy trong đó.
    
    ENV NEXT_TELEMETRY_DISABLED=1
    # (Dự án) Vô hiệu hóa việc gửi dữ liệu telemetry cho Next.js (không ảnh hưởng build).
    # (Docker) Đặt biến môi trường trong container.
    
    COPY package.json package-lock.json ./
    # (Dự án) Copy file quản lý dependency trước tiên để cài đặt dependencies.
    # (Docker) Giúp Docker cache layer -> không cần cài lại npm nếu package.json không đổi.
    
    RUN npm ci
    # (Dự án) Cài đặt dependencies (bao gồm devDependencies vì cần build).
    # (Docker) npm ci nhanh và reproducible hơn npm install.
    
    COPY . .
    # (Dự án) Copy toàn bộ code (pages, app, public, tsconfig, …).
    # (Docker) Đưa code vào container để có thể build.
    
    RUN npm run build
    # (Dự án) Build Next.js với Turbopack -> tạo thư mục `.next`.
    # (Docker) Sinh ra artifact để dùng trong stage runtime.
    
    # -------------------------------
    # Stage 2: Runtime (chạy ứng dụng production)
    # -------------------------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    # (Dự án) Ứng dụng chạy tại /app.
    # (Docker) Các lệnh start sẽ chạy trong /app.
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    # (Dự án) Chạy ở chế độ production giúp tối ưu performance.
    # (Docker) Biến môi trường này áp dụng cho tiến trình Node trong container.
    
    # Copy chỉ những file cần thiết từ builder
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    # (Dự án) Ứng dụng production chỉ cần node_modules, build output và assets.
    # (Docker) Giảm kích thước image -> không mang theo devDependencies hay code không cần thiết.
    
    # Tạo user không phải root để chạy app (bảo mật hơn)
    RUN addgroup --system --gid 1001 appgroup && \
        adduser --system --uid 1001 appuser
    USER appuser
    # (Dự án) Không ảnh hưởng logic code.
    # (Docker) Tăng bảo mật khi container chạy không dùng root.
    
    EXPOSE 3000
    # (Dự án) Next.js mặc định chạy ở port 3000.
    # (Docker) Chỉ định port mà container sẽ lắng nghe.
    
    CMD ["npm", "start"]
    # (Dự án) Chạy ứng dụng production: "next start".
    # (Docker) Đây là entrypoint khi container khởi động.
    