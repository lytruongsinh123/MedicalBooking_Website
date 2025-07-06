import db from "../models/index";
import emailService from "../services/emailService";
import _ from "lodash";
require("dotenv").config();
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
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    time: data.timeString,
                    birthday: dateString,
                    language: data.language,
                    redirectLink: `https://www.facebook.com/hung.do.105802`,
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
module.exports = {
    postBookAppointment: postBookAppointment,
};
