require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    await transporter.sendMail({
        from: '"Hung Koch" <maddison53@ethereal.email>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: `
            <div style="font-family: Arial,sans-serif; background: #f7fafc; padding: 24px; border-radius: 10px; max-width: 480px; margin:auto; border:1.5px solid #49bce2;">
                <div style="text-align:center; margin-bottom: 12px;">
                    <img src="https://img.icons8.com/color/48/000000/doctor-male.png" alt="Doctor" style="vertical-align:middle; margin-right:8px;"/>
                    <span style="font-size: 22px; color: #49bce2; font-weight: bold;">Xác nhận đặt lịch khám bệnh</span>
                </div>
                <p style="font-size: 16px; color: #222; margin: 0 0 8px 0;">Xin chào <b>${
                    dataSend.patientName || "Hung"
                }</b>,</p>
                <p style="font-size: 15px; color: #333; margin: 0 0 12px 0;">Bạn đã đặt lịch khám với bác sĩ <b>${
                    dataSend.doctorName || "Hung"
                }</b>.</p>
                <table style="width:100%; background:#eaf6fb; border-radius:6px; padding:8px 0; margin-bottom: 12px;">
                    <tr><td style="padding:6px 0 0 12px;">🕒 <b>Thời gian:</b></td><td style="padding:6px 12px 0 0; text-align:right;">${
                        dataSend.time || "10:00 - 11:00"
                    }</td></tr>
                    <tr><td style="padding:0 0 0 12px;">📅 <b>Ngày:</b></td><td style="padding:0 12px 0 0; text-align:right;">${
                        dataSend.date || "7/5/2025"
                    }</td></tr>
                    <tr><td style="padding:0 0 6px 12px;">📍 <b>Địa điểm:</b></td><td style="padding:0 12px 6px 0; text-align:right;">${
                        dataSend.clinicName || "Phòng khám ABC"
                    }</td></tr>
                </table>
                <div style="text-align:center; margin: 18px 0;">
                    <a href="${
                        dataSend.redirectLink
                    }" target="_blank" style="display:inline-block; background:#49bce2; color:#fff; padding:10px 24px; border-radius:6px; text-decoration:none; font-weight:600; font-size:16px;">Xác nhận lịch hẹn</a>
                </div>
                <p style="font-size: 14px; color: #555; margin: 0 0 4px 0; text-align:center;">Vui lòng kiểm tra lại thông tin và đến đúng giờ hẹn.</p>
                <p style="font-size: 14px; color: #555; margin: 0; text-align:center;">Trân trọng,<br>Đội ngũ hỗ trợ khách hàng</p>
            </div>
        `,
    });
};

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
};
