import { raw } from "body-parser";
import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limits) => {
    return new Promise(async (resolve, reject) => {
        try {
            // lấy danh sách bác sĩ có giới hạn số lượng và sắp xếp theo ngày tạo mới nhất
            let users = await db.User.findAll({
                limit: limits,
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password"], // không lấy trường password
                },
                raw: true, // trả về dữ liệu thô
                nest: true, // trả về dữ liệu dạng json
                where: {
                    // chỉ lấy những người có vai trò là bác sĩ
                    roleId: "R2",
                },
                include: [
                    // lấy thêm thông tin về vị trí và giới tính
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueVi", "valueEn"],
                    },
                ],
            });
            resolve({
                errCode: 0,
                errMessage: "Get top doctor succeed",
                data: users, // trả về danh sách bác sĩ
            });
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
};
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" }, // chỉ lấy những người có vai trò là bác sĩ
                attributes: {
                    exclude: ["password", "image"], // không lấy trường password
                },
                raw: true, // trả về dữ liệu thô
            });
            resolve({
                errCode: 0,
                errMessage: "Get all doctors succeed",
                data: doctors, // trả về danh sách bác sĩ
            });
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
};
let checkRequiredFields = (data) => {
    let arrFields = [
        "doctorId",
        "contentHTML",
        "contentMarkdown",
        "action",
        "selectedPrice",
        "selectedPayment",
        "selectedProvince",
        "nameClinic",
        "addressClinic",
        "note",
        "specialtyId",
    ];
    let isValid = true;
    let element = "";
    for (let i = 0; i < arrFields.length; i++) {
        if (!data[arrFields[i]]) {
            isValid = false;
            element = arrFields[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element,
    };
};
let saveDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (checkRequiredFields(data).isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter ${
                        checkRequiredFields(data).element
                    }`,
                });
            } else {
                // upsert to Markdown table
                if (data.action === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    });
                }
                if (data.action === "EDIT") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {
                            doctorId: data.doctorId,
                        },
                        raw: false,
                    });
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.description = data.description;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save();
                    }
                }

                // upsert to Doctor_infor table
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: data.doctorId,
                    },
                    raw: false, // trả về dữ liệu thô
                });
                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = data.doctorId;
                    doctorInfor.priceId = data.selectedPrice;
                    doctorInfor.provinceId = data.selectedProvince;
                    doctorInfor.paymentId = data.selectedPayment;
                    doctorInfor.note = data.note;
                    doctorInfor.addressClinic = data.addressClinic;
                    doctorInfor.nameClinic = data.nameClinic;
                    doctorInfor.specialtyId = data.specialtyId;
                    doctorInfor.clinicId = data.clinicId;
                    await doctorInfor.save();
                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedProvince,
                        paymentId: data.selectedPayment,
                        note: data.note,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                        specialtyId: data.specialtyId,
                        clinicId: data.clinicId,
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save information succeed!",
                });
            }
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
};
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ["password"], // không lấy trường password
                    },
                    // Join với bảng Markdown để lấy thông tin chi tiết của bác sĩ
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdown",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Allcode,
                            as: "genderData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes: { exclude: ["id", "doctorId"] },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "priceTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "provinceTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "paymentTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                            ],
                        },
                    ],
                    raw: false, // trả về dữ liệu thô
                    nest: true, // trả về dữ liệu dạng json
                });

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, "base64").toString(
                        "binary"
                    );
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    errMessage: "Get doctor information succeed",
                    data: data, // trả về thông tin bác sĩ
                });
            }
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
};
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required param !",
                });
            } else {
                // data vào
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }

                // data đâ tồn tại trong db
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: String(data.date),
                    },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                });

                // lấy sự khác nhau giữa data vào và data đã tồn tại trả về data sai khác đó
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date; // thêm dấu + để so sánh 5 = '5'
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save schedule success !",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let dataschedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: "timeTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },

                        {
                            model: db.User,
                            as: "doctorData",
                            attributes: ["firstName", "lastName"],
                        },
                    ],
                    raw: false, // trả về dữ liệu thô
                    nest: true, // trả về dữ liệu dạng json
                });
                if (!dataschedule) dataschedule = [];
                resolve({
                    errCode: 0,
                    data: dataschedule,
                    errMessage: "Get schedule by doctor success !",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getExtraInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: doctorId,
                    },
                    attributes: { exclude: ["id", "doctorId"] },
                    include: [
                        {
                            model: db.Allcode,
                            as: "priceTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Allcode,
                            as: "provinceTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Allcode,
                            as: "paymentTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    errMessage: "Get doctor information succeed",
                    data: data, // trả về thông tin bác sĩ
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId,
                    },
                    attributes: {
                        exclude: ["password"], // không lấy trường password
                    },
                    // Join với bảng Markdown để lấy thông tin chi tiết của bác sĩ
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdown",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes: { exclude: ["id", "doctorId"] },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "priceTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "provinceTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "paymentTypeData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                            ],
                        },
                    ],
                    raw: false, // trả về dữ liệu thô
                    nest: true, // trả về dữ liệu dạng json
                });

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, "base64").toString(
                        "binary"
                    );
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    errMessage: "Get doctor information succeed",
                    data: data, // trả về thông tin bác sĩ
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: "S2",
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.User,
                            as: "patientData",
                            attributes: [
                                "firstName",
                                "lastName",
                                "email",
                                "address",
                                "gender",
                                "phoneNumber",
                            ],
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "genderData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "timeTypeDataPatient",
                            attributes: ["valueVi", "valueEn"],
                        },
                    ],
                    raw: false, // trả về dữ liệu thô
                    nest: true, // trả về dữ liệu dạng json
                });
                resolve({
                    errCode: 0,
                    errMessage: "Get list patient for doctor succeed",
                    data: data, // trả về thông tin bác sĩ
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let sendRemedy = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.patientId ||
                !data.timeType ||
                !data.date ||
                !data.language ||
                !data.patientName ||
                !data.doctorName ||
                !data.timeString
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                // update patient status
                let appointment = await db.Booking.findOne({
                    where: {
                        patientId: data.patientId,
                        doctorId: data.doctorId,
                        timeType: data.timeType,
                        date: String(data.date),
                        statusId: "S2", // trạng thái đã xác nhận
                    },
                    raw: false, // trả về đối tượng của sequelize
                });
                if (appointment) {
                    appointment.statusId = "S3";
                    await appointment.save();
                }
                // send email remedy
                await emailService.sendAttachmentEmail(data);
                resolve({
                    errCode: 0,
                    errMessage: "Send remedy successfully",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
};
