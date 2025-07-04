import { where } from "sequelize";
import db from "../models/index.js";
import bcrypt from "bcryptjs";
let salt = bcrypt.genSaltSync(10);

let creatNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phonenumber,
            });
            resolve("Creat new User succeed");
        } catch (e) {
            reject(e);
        }
    });
};
// hasing password
let hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

// khi sử dụng Promise để tránh việc xử lý bất đồng bộ ( nhiều tiền trình một lúc )
// Sử dụng để yêu cầu server xử lý Promise xong thì mới chạy tiếp

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    where: {
                        id: userId,
                    },
                },
                {
                    raw: true,
                }
            );
            if (!user) {
                resolve({});
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};
let updateUserData = (data) => {
    console.log("Data from servicee: ", data);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                    raw: false,
                },
            });
            if (!user) {
                resolve("User not found");
                return;
            }
            User.firstName = data.firstName;
            User.lastName = data.lastName;
            User.address = data.address;
            await User.save();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUserById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userid,
                },
            });
            if (user) {
                user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    creatNewUser: creatNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById,
    getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};
