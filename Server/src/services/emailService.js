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
    if (transporter.verify().catch(console.error)) {
        console.log("Email transporter is ready to send emails.");
    } else {
        console.error("Email transporter is not configured correctly.");
        throw new Error("Email transporter configuration failed.");
    }
    await transporter.sendMail({
        from: '"Hung Koch" <maddison53@ethereal.email>',
        to: dataSend.reciverEmail,
        subject: getSubject(dataSend),
        html: getBodyHTML(dataSend),
    });
};
let getSubject = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = "Thông tin đặt lịch khám bệnh";
    }
    if (dataSend.language === "en") {
        result = "Appointment information";
    }
    return result;
};
let getBodyHTML = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
            <div style="font-family: Arial,sans-serif; background: #f7fafc; padding: 24px; border-radius: 10px; max-width: 480px; margin:auto; border:1.5px solid #49bce2;">
                <div style="text-align:center; margin-bottom: 12px;">
                    <img src="https://img.icons8.com/color/48/000000/doctor-male.png" alt="Doctor" style="vertical-align:middle; margin-right:8px;"/>
                    <span style="font-size: 22px; color: #49bce2; font-weight: bold;">Xác nhận đặt lịch khám bệnh</span>
                </div>
                <p style="font-size: 16px; color: #222; margin: 0 0 8px 0;">Xin chào <b>${
                    dataSend.patientName
                }</b>,</p>
                <p style="font-size: 15px; color: #333; margin: 0 0 12px 0;">Bạn đã đặt lịch khám với bác sĩ <b>${
                    dataSend.doctorName
                }</b>.</p>
                <table style="width:100%; background:#eaf6fb; border-radius:6px; padding:8px 0; margin-bottom: 12px;">
                    <tr><td style="padding:6px 0 0 12px;">🕒 <b>Thời gian:</b></td><td style="padding:6px 12px 0 0; text-align:right;">${
                        dataSend.time
                    }</td></tr>
                    <tr><td style="padding:0 0 0 12px;">📅 <b>Ngày sinh:</b></td><td style="padding:0 12px 0 0; text-align:right;">${
                        dataSend.birthday || "Chưa cập nhật"
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
                <p style="font-size: 14px; color: #555; margin: 0; text-align:center;">Trân trọng !,<br>Đội ngũ hỗ trợ khách hàng</p>
            </div>
        `;
    }
    if (dataSend.language === "en") {
        result = `
            <div style="font-family: Arial,sans-serif; background: #f7fafc; padding: 24px; border-radius: 10px; max-width: 480px; margin:auto; border:1.5px solid #49bce2;">
                <div style="text-align:center; margin-bottom: 12px;">
                    <img src="https://img.icons8.com/color/48/000000/doctor-male.png" alt="Doctor" style="vertical-align:middle; margin-right:8px;"/>
                    <span style="font-size: 22px; color: #49bce2; font-weight: bold;">Confirm appointment</span>
                </div>
                <p style="font-size: 16px; color: #222; margin: 0 0 8px 0;">Xin chào <b>${
                    dataSend.patientName
                }</b>,</p>
                <p style="font-size: 15px; color: #333; margin: 0 0 12px 0;">You have made an appointment with your doctor <b>${
                    dataSend.doctorName
                }</b>.</p>
                <table style="width:100%; background:#eaf6fb; border-radius:6px; padding:8px 0; margin-bottom: 12px;">
                    <tr><td style="padding:6px 0 0 12px;">🕒 <b>Time:</b></td><td style="padding:6px 12px 0 0; text-align:right;">${
                        dataSend.time
                    }</td></tr>
                    <tr><td style="padding:0 0 0 12px;">📅 <b>Birthday:</b></td><td style="padding:0 12px 0 0; text-align:right;">${
                        dataSend.birthday || "Not updated"
                    }</td></tr>
                    <tr><td style="padding:0 0 6px 12px;">📍 <b>Address:</b></td><td style="padding:0 12px 6px 0; text-align:right;">${
                        dataSend.clinicName || "Phòng khám ABC"
                    }</td></tr>
                </table>
                <div style="text-align:center; margin: 18px 0;">
                    <a href="${
                        dataSend.redirectLink
                    }" target="_blank" style="display:inline-block; background:#49bce2; color:#fff; padding:10px 24px; border-radius:6px; text-decoration:none; font-weight:600; font-size:16px;">Confirm appointment</a>
                </div>
                <p style="font-size: 14px; color: #555; margin: 0 0 4px 0; text-align:center;">Please double check your information and arrive on time.</p>
                <p style="font-size: 14px; color: #555; margin: 0; text-align:center;">Best regards !,<br>Customer support team</p>
            </div>
        `;
    }
    return result;
};
let getBodyHtmlRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
            <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #f8fbff 0%, #e8f4fd 100%); padding: 32px; border-radius: 12px; max-width: 600px; margin: auto; border: 2px solid #49bce2; box-shadow: 0 8px 24px rgba(73, 188, 226, 0.15);">
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px solid #e0f2fe;">
                    <div style="background: linear-gradient(135deg, #49bce2 0%, #3aa8d1 100%); color: white; padding: 16px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                        <i class="fas fa-capsules" style="font-size: 20px; margin-right: 8px; vertical-align: middle;"></i>
                        <span style="font-size: 24px; font-weight: bold; vertical-align: middle;">Đơn thuốc & Hóa đơn</span>
                    </div>
                    <p style="font-size: 16px; color: #555; margin: 8px 0 0 0;">Thông tin chi tiết về đơn thuốc và hóa đơn khám bệnh</p>
                </div>

                <!-- Patient Info Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #49bce2;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #e3f2fd; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-user" style="color: #1976d2; font-size: 14px;"></i>
                        </span>
                        Thông tin bệnh nhân
                    </h3>
                    <div style="background: #f8fbff; padding: 16px; border-radius: 6px; border: 1px solid #e1f5fe;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Họ và tên:</strong> 
                            <span style="color: #2e7d32; font-weight: 600;">${dataSend.patientName}</span>
                        </p>
                    </div>
                </div>

                <!-- Doctor Info Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #2e7d32;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #e8f5e8; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-user-md" style="color: #2e7d32; font-size: 14px;"></i>
                        </span>
                        Bác sĩ điều trị
                    </h3>
                    <div style="background: #f1f8e9; padding: 16px; border-radius: 6px; border: 1px solid #c8e6c9;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Bác sĩ:</strong> 
                            <span style="color: #2e7d32; font-weight: 600;">BS. ${dataSend.doctorName}</span>
                        </p>
                    </div>
                </div>

                <!-- Appointment Time Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #ff9800;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #fff3e0; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-clock" style="color: #ff9800; font-size: 14px;"></i>
                        </span>
                        Thời gian khám
                    </h3>
                    <div style="background: #fff8e1; padding: 16px; border-radius: 6px; border: 1px solid #ffcc02;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Ngày giờ:</strong> 
                            <span style="color: #e65100; font-weight: 600;">${dataSend.timeString}</span>
                        </p>
                    </div>
                </div>

                <!-- Attachment Notice -->
                <div style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: white; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 16px; font-weight: 600;">
                        <i class="fas fa-paperclip" style="margin-right: 8px;"></i>
                        Đơn thuốc và hóa đơn chi tiết được đính kèm trong email này
                    </p>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e0f2fe;">
                    <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">
                        Vui lòng lưu trữ đơn thuốc và hóa đơn để tiện theo dõi điều trị
                    </p>
                    <p style="font-size: 14px; color: #49bce2; margin: 0; font-weight: 600;">
                        Trân trọng,<br>
                        <span style="color: #2c5aa0;">Đội ngũ y tế - Phòng khám ABC</span>
                    </p>
                </div>

                <!-- FontAwesome CDN -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            </div>
        `;
    }
    if (dataSend.language === "en") {
        result = `
            <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #f8fbff 0%, #e8f4fd 100%); padding: 32px; border-radius: 12px; max-width: 600px; margin: auto; border: 2px solid #49bce2; box-shadow: 0 8px 24px rgba(73, 188, 226, 0.15);">
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 2px solid #e0f2fe;">
                    <div style="background: linear-gradient(135deg, #49bce2 0%, #3aa8d1 100%); color: white; padding: 16px; border-radius: 8px; display: inline-block; margin-bottom: 12px;">
                        <i class="fas fa-prescription-bottle-alt" style="font-size: 20px; margin-right: 8px; vertical-align: middle;"></i>
                        <span style="font-size: 24px; font-weight: bold; vertical-align: middle;">Prescription & Invoice</span>
                    </div>
                    <p style="font-size: 16px; color: #555; margin: 8px 0 0 0;">Detailed information about prescription and medical invoice</p>
                </div>

                <!-- Patient Info Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #49bce2;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #e3f2fd; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-user" style="color: #1976d2; font-size: 14px;"></i>
                        </span>
                        Patient Information
                    </h3>
                    <div style="background: #f8fbff; padding: 16px; border-radius: 6px; border: 1px solid #e1f5fe;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Full Name:</strong> 
                            <span style="color: #2e7d32; font-weight: 600;">${dataSend.patientName}</span>
                        </p>
                    </div>
                </div>

                <!-- Doctor Info Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #2e7d32;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #e8f5e8; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-user-md" style="color: #2e7d32; font-size: 14px;"></i>
                        </span>
                        Attending Physician
                    </h3>
                    <div style="background: #f1f8e9; padding: 16px; border-radius: 6px; border: 1px solid #c8e6c9;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Doctor:</strong> 
                            <span style="color: #2e7d32; font-weight: 600;">Dr. ${dataSend.doctorName}</span>
                        </p>
                    </div>
                </div>

                <!-- Appointment Time Card -->
                <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 4px solid #ff9800;">
                    <h3 style="color: #2c5aa0; margin: 0 0 16px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="background: #fff3e0; padding: 8px; border-radius: 50%; margin-right: 12px; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
                            <i class="fas fa-clock" style="color: #ff9800; font-size: 14px;"></i>
                        </span>
                        Appointment Time
                    </h3>
                    <div style="background: #fff8e1; padding: 16px; border-radius: 6px; border: 1px solid #ffcc02;">
                        <p style="margin: 0; font-size: 16px; color: #333;">
                            <strong style="color: #1976d2;">Date & Time:</strong> 
                            <span style="color: #e65100; font-weight: 600;">${dataSend.timeString}</span>
                        </p>
                    </div>
                </div>

                <!-- Attachment Notice -->
                <div style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); color: white; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 16px; font-weight: 600;">
                        <i class="fas fa-paperclip" style="margin-right: 8px;"></i>
                        Prescription and detailed invoice are attached to this email
                    </p>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e0f2fe;">
                    <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">
                        Please keep the prescription and invoice for treatment tracking
                    </p>
                    <p style="font-size: 14px; color: #49bce2; margin: 0; font-weight: 600;">
                        Best regards,<br>
                        <span style="color: #2c5aa0;">Medical Team - ABC Clinic</span>
                    </p>
                </div>

                <!-- FontAwesome CDN -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            </div>
        `;
    }
    return result;
};
let sendAttachmentEmail = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });
            let info = await transporter.sendMail({
                from: `"Hung Koch" <${process.env.EMAIL_APP}>`,
                to: dataSend.email,
                subject: "Kết quả đặt lịch khám bệnh",
                html: getBodyHtmlRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${
                            dataSend.patientName
                        }-${Date.now()}.png`,
                        content: dataSend.fileBase64.split("base64")[1],
                        encoding: "base64",
                    },
                ],
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    sendSimpleEmail,
    sendAttachmentEmail,
};
