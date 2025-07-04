import userService from "../services/userService";
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            message: "Email and password are required",
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        message: userData.errMsg,
        errCode: userData.errCode,
        user: userData.user ? userData.user : {},
    });
};
let handleGetAllUsers = async (req, res) => {
    let Id = req.query.id; //ALL ID
    let allusers = await userService.getAllUser(Id);
    console.log(allusers);
    if (!Id) {
        return res.status(200).json({
            message: "Missing requires parameter",
            errCode: 1,
            alluser: {},
        });
    }
    return res.status(200).json({
        message: "OK",
        errCode: 0,
        allusers,
    });
};

let handleCreateNewUser = async (req, res) => {
    let message = await userService.creatNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "ID is required",
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Get all code error :", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
};
