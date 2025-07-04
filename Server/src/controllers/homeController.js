import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};
let getAboutpage = (req, res) => {
    return res.render("test/about.ejs");
};
// object : {
//     key:
//     value: ''
// }
let getCRUD = (req, res) => {
    return res.render("./crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.creatNewUser(req.body);
    console.log(message);
    return res.send("post crud from server");
};
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);

        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("User not Found!");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserById(userId);
        return res.send("Delete User Success");
    } else {
        return res.send("User not Found!");
    }
};
module.exports = {
    getHomePage: getHomepage,
    getAboutPage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
