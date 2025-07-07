import db from "../models/index";
import emailService from "../services/emailService";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
};
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.date ||
                !data.timeType ||
                !data.fullName
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing email parameter",
                });
                return;
            } else {
                // Format date sang dd/MM/yyyy
                let dateString = "";
                if (data.date) {
                    const dateObj = new Date(Number(data.date));
                    const day = String(dateObj.getDate()).padStart(2, "0");
                    const month = String(dateObj.getMonth() + 1).padStart(
                        2,
                        "0"
                    );
                    const year = dateObj.getFullYear();
                    dateString = `${day}/${month}/${year}`;
                }
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    time: data.timeString,
                    birthday: dateString,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                });

                // upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3", // Assuming R3 is the role for patients
                    },
                });
                // create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                        },
                        defaults: {
                            statusId: "S1",
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                        },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Booking successful",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postVerifyBookAppointment = (data) => { 
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
                return;
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: "S1", // Assuming S1 is the status for pending bookings
                    },
                    raw: false, // to allow updates => object of sequelize => can use methods like save()
                    // raw = true => object of json
                });
                if (appointment) {
                    appointment.statusId = "S2"; // Assuming S2 is the status for confirmed bookings
                    await appointment.save(); // save changes to the database
                    resolve({
                        errCode: 0,
                        errMessage: "Verify booking appointment successful",
                    });
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment not found or already confirmed",
                    });
                }
            }
            
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
};
