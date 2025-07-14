import db from "../models/index";
import fetch from "node-fetch"; // Ensure you have installed node-fetch
require("dotenv").config();
let geocodeAddress = async (address) => {
    try {
        const apikey = process.env.API_KEY_MAP;
        const url = `https://us1.locationiq.com/v1/search?key=${apikey}&q=${encodeURIComponent(
            address
        )}&format=json`;

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        if (error.type === "request-timeout") {
            console.error("Geocode request timed out");
            return [];
        }
        console.error("Error fetching geocode data:", error);
        throw error;
    }
};
let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.nameEn ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown ||
                !data.address
            ) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters",
                });
                return;
            } else {
                // Call geocodeAddress to get latitude and longitude
                const geocodeData = await geocodeAddress(data.address);
                const geo = geocodeData[0];
                const lat =
                    (parseFloat(geo.boundingbox[0]) +
                        parseFloat(geo.boundingbox[1])) /
                    2.0;
                const lng =
                    (parseFloat(geo.boundingbox[2]) +
                        parseFloat(geo.boundingbox[3])) /
                    2.0;
                let clinic = await db.Clinic.create({
                    name: data.name,
                    nameEn: data.nameEn,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address,
                    lat: lat,
                    lng: lng,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Create specialty successfully",
                    clinic: clinic,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                // limit: 10,
                // offset: offset // can be used for pagination
            });
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.image = Buffer.from(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: "Get all specialties successfully",
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: [
                        "name",
                        "nameEn",
                        "image",
                        "address",
                        "lat",
                        "lng",
                    ],
                });
                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ["doctorId", "provinceId"],
                    });
                    data.doctorClinic = doctorClinic;
                } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
};
