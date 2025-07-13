import db from "../models/index";
import fetch from "node-fetch"; // Ensure you have installed node-fetch
require("dotenv").config();
let geocodeAddress = async (address) => {
    try {
        const apikey = process.env.API_KEY_MAP;
        const url = `https://us1.locationiq.com/v1/search?key=${apikey}&q=${encodeURIComponent(
            address
        )}&format=json`;

        const res = await fetch(url, { timeout: 10000 });
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
                // !data.imageBase64 ||
                // !data.descriptionHTML ||
                // !data.descriptionMarkdown ||
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
module.exports = {
    createClinic: createClinic,
};
