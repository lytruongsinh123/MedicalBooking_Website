import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
let router = express.Router();
let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    // API USER
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.get("/api/allcode", userController.getAllCode);

    // API DOCTOR
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
    router.get("/api/get-detail-doctor-by-id",doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule",doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date",doctorController.getScheduleByDate);
    router.get("/api/get-extra-infor-doctor-by-id",doctorController.getExtraInforDoctorById);
    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);
    router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
    router.post("/api/send-remedy",doctorController.sendRemedy);


    // API PATIENT
    router.post("/api/patien-book-appointment", patientController.postBookAppointment);
    router.post("/api/verify-book-appointment", patientController.postVerifyBookAppointment);
    
    // API SPECIALTY
    router.post("/api/create-new-specialty",specialtyController.createSpecialty);
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpecialtyById);

    // API CLINIC
    router.post("/api/create-new-clinic", clinicController.createClinic);
    router.get("/api/get-all-clinic", clinicController.getAllClinic);
    router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicById);


    return app.use("/", router);
};
module.exports = initWebRouters;
