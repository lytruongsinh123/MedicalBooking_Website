import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
import { createNewUserService } from "../../services/userService";
import { getAllUsers } from "../../services/userService";
import { deteleUserService } from "../../services/userService";
import { editUserService } from "../../services/userService";
import { getTopDoctorHomeService } from "../../services/userService";
import { getAllDoctors } from "../../services/userService";
import { saveDetailInforDoctor } from "../../services/userService";
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log("fetchGenderStart error", e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log("fetchGenderStart error", e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            fetchGenderFailed();
            console.log("fetchGenderStart error", e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
});
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("check create user redux", res);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log("Create new user error", e);
        }
    };
};
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED,
});
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.allusers.reverse()));
            } else {
                toast.error("Fetch all users error");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error");
            fetchGenderFailed();
            console.log("fetchGenderStart error", e);
        }
    };
};
export const fetchAllUsersSuccess = (allUsers) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: allUsers,
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,
});
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deteleUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete the user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("Delete user error", e);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});







export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update the user failed!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});
export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
});









export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            console.log("fetch Top Doctor error", e);
            dispatch(editUserFailed());
        }
    };
};
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctors: data,
});
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILDED,
});













export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchaAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFailed());
            }
        } catch (e) {
            console.log("fetch Top Doctor error", e);
            dispatch(fetchAllDoctorFailed());
        }
    };
};
export const fetchaAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDoctors: data,
});
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILDED,
});




export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save the doctor information succeed!");
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error("Save the doctor information failed!");
                dispatch(saveDetailDoctorFailed());
            }
        } catch (e) {
            toast.error("Save the doctor information error!");
            console.log("fetch Top Doctor error", e);
            dispatch(saveDetailDoctorFailed());
        }
    };
};
export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
});













export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllScheduleTimeFailed());
            }
        } catch (e) {
            console.log("fetch Time schedule failed", e);
            dispatch(fetchAllScheduleTimeFailed());
        }
    };
};
export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data,
});
export const fetchAllScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
});
















export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
            });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequireDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequireDoctorInfoFailed());
            }
        } catch (e) {
            fetchRequireDoctorInfoFailed();
            console.log("fetchGenderStart error", e);
        }
    };
};
export const fetchRequireDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: allRequiredData,
});
export const fetchRequireDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
});
