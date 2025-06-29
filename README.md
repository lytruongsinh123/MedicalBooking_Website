# Media Booking Care

Media Booking Care là một dự án web đặt lịch khám bệnh trực tuyến, giúp bệnh nhân dễ dàng tìm kiếm, đặt lịch hẹn và theo dõi thông tin khám chữa bệnh tại các cơ sở y tế. Ứng dụng được xây dựng bằng Node.js, Express, React, Redux cùng các công nghệ web hiện đại.

## 🚀 Tính năng chính

- Đăng ký, đăng nhập cho bệnh nhân và bác sĩ
- Đặt lịch khám bệnh trực tuyến và quản lý lịch hẹn
- Tìm kiếm, xem thông tin bác sĩ, chuyên khoa, phòng khám
- Quản lý lịch làm việc cho bác sĩ, xác nhận/huỷ lịch hẹn
- Gửi email xác nhận lịch hẹn cho bệnh nhân
- Hỗ trợ đa ngôn ngữ (Việt/Anh)
- Quản trị hệ thống (thêm/sửa/xoá bác sĩ, chuyên khoa, tài khoản...)

## 🛠️ Công nghệ sử dụng

- **Backend:** Node.js, Express, Sequelize, MySQL
- **Frontend:** React, Redux, HTML, SCSS, EJS
- **Khác:** Nodemailer (gửi email), JWT (xác thực), Cloudinary (lưu trữ ảnh)

## ⚙️ Cài đặt và chạy dự án

### 1. Clone dự án
```bash
git clone https://github.com/LyTruongsinh/MediaBooking_Website.git
cd MediaBooking_Website
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```
- Tạo file `.env` và cấu hình database, email, JWT key theo mẫu `.env.example`

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
```

### 4. Chạy dự án
- Chạy backend:
  ```bash
  npm start
  ```
- Chạy frontend:
  ```bash
  npm start
  ```

## 📁 Cấu trúc thư mục

```
MediaBooking_Website/
├── backend/                # Server Node.js, Express, API, models
├── frontend/               # Ứng dụng React, Redux
├── README.md
└── ...
```

## 👨‍⚕️ Đóng góp

- Fork dự án, tạo nhánh mới và gửi Pull request
- Vui lòng mô tả rõ ràng tính năng/sửa lỗi khi gửi PR

## 📜 Giấy phép

Dự án này sử dụng [MIT License](LICENSE).

---

**Media Booking Care** - Nền tảng đặt lịch khám bệnh thông minh, tiện lợi và an toàn!
