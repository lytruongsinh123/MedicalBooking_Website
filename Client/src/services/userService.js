import axios from "../axios";
const handleLoginApi = async (useremail, userpassword) => {
    return axios.post("/api/login", {
        email: useremail,
        password: userpassword,
    });
};
const getAllUsers = async (inputid) => {
    return axios.get(`/api/get-all-users?id=${inputid}`);
};
const createNewUserService = (data) => {
    console.log("check", data);
    return axios.post("/api/create-new-user", data);
};
const deteleUserService = (userid) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userid,
        },
    });
};
const editUserService = (inputdata) => {
    return axios.put("/api/edit-user", inputdata);
};
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode/?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};
const saveDetailInforDoctor = (data) => {
    return axios.post("/api/save-info-doctor", data);
};
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
    );
};
const getSExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patien-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};
const createNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
};
const getDetailSpecialtyById = (data) => { 
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
const createNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deteleUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getSExtraInforDoctorById,
    getProfileInforDoctorById,
    postPatientBookingAppointment,
    postVerifyBookAppointment,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyById,
    createNewClinicService,
};
