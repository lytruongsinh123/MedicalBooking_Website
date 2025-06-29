import { raw } from "body-parser";
import db from "../models/index";
import _ from "lodash";
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
                message: "Get top doctor succeed",
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
                message: "Get all doctors succeed",
                data: doctors, // trả về danh sách bác sĩ
            });
        } catch (e) {
            reject(e); // ngay khi chạy reject thì ở Controller sẽ bắt error qua hàm catch
        }
    });
};
let saveDetailInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.doctorId ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.action ||
                !data.selectedPrice ||
                !data.selectedPayment ||
                !data.selectedProvince ||
                !data.nameClinic ||
                !data.addressClinic ||
                !data.note
            ) {
                // Nếu không có trường ID, contentHTML, contentMarkdown
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
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
                    doctorInfor.provinceId = data.selectedPrice;
                    doctorInfor.paymentId = data.selectedPayment;
                    doctorInfor.note = data.note;
                    doctorInfor.addressClinic = data.addressClinic;
                    doctorInfor.nameClinic = data.nameClinic;
                    await doctorInfor.save();
                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedPrice,
                        paymentId: data.selectedPayment,
                        note: data.note,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
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
                    ],
                    raw: false, // trả về dữ liệu thô
                    nest: true, // trả về dữ liệu dạng json
                });

                if (data && data.image) {
                    data.image = new Buffer.from(data.image, "base64").toString(
                        "binary",
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
                        date: data.date,
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
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
};
