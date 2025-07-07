import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages, crud_actions } from "../../../utils/constant";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: "",
            isOpen: false,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            gender: "",
            position: "",
            role: "",
            image: "",
            action: "",
            userEditId: "",
        };
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //render => didupdate
        //hiện tại và quá khứ khác nhau thì chạy hàm này
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                image: "",
                previewImgUrl: "",
                action: crud_actions.CREATE,
            });
        }
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files; // lấy ra file ảnh
        let file = data[0]; // lấy ra file đầu tiên
        let objectUrl = URL.createObjectURL(file); // tạo ra đường dẫn tạm thời
        if (file) {
            let base64 = await CommonUtils.toBase64(file); // chuyển đổi file sang base64
            this.setState({
                previewImgUrl: objectUrl,
                image: base64, // gán giá trị base64 vào state
            });
        }
    };
    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true,
        });
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }; // sao chép state hiện tại
        copyState[id] = event.target.value; // gán giá trị của id trong state bằng giá trị của input
        this.setState({
            ...copyState, // cập nhật lại state
        });
    };
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (!isValid) return; // nếu không hợp lệ thì không làm gì cả
        let { action } = this.state; // lấy ra action từ state
        if (action === crud_actions.CREATE) {
            // fire redux action create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                image: this.state.image,
            }); // gọi hàm createNewUser trong props và truyền vào state
        }
        if (action === crud_actions.EDIT) {
            console.log("check state: ", this.state);
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                image: this.state.image,
            });
        }
    };
    checkValidateInput = () => {
        let isValid = true; // biến kiểm tra tính hợp lệ
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
        ]; // mảng các input cần kiểm tra
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                // nếu giá trị của input là rỗng
                isValid = false; // gán biến isValid là false
                alert("Missing parameter: " + arrInput[i]); // thông báo lỗi
                break;
            }
        }
        return isValid; // trả về giá trị của biến isValid
    };
    handleEditUserFromParent = (user) => {
        let imageBase64 = ""; // biến lưu trữ giá trị base64 của ảnh
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary"); // chuyển đổi giá trị base64 sang binary
        }
        if (this.props.userInfo.email === user.email) {
            alert("Can not fix this account because islogin account"); // thông báo lỗi nếu tài khoản đang đăng nhập
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                gender:
                    arrGenders && arrGenders.length > 0
                        ? arrGenders[0].keyMap
                        : "",
                position:
                    arrPositions && arrPositions.length > 0
                        ? arrPositions[0].keyMap
                        : "",
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                image: "",
                previewImgUrl: "",
                action: crud_actions.CREATE,
            });
        } else {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: user.email,
                password: "hardcode",
                firstName: user.firstName ? user.firstName : "",
                lastName: user.lastName ? user.lastName : "",
                address: user.address ? user.address : "",
                phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                gender: user.gender
                    ? user.gender
                    : arrGenders && arrGenders.length > 0
                    ? arrGenders[0].keyMap
                    : "",
                position: user.positionId
                    ? user.positionId
                    : arrPositions && arrPositions.length > 0
                    ? arrPositions[0].keyMap
                    : "",
                role: user.roleId,
                image: "",
                previewImgUrl: imageBase64, // gán giá trị base64 vào previewImgUrl
                action: crud_actions.EDIT,
                userEditId: user.id,
            });
        }
    };
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let {
            email,
            password,
            firstName,
            lastName,
            address,
            phoneNumber,
            gender,
            position,
            role,
            image,
        } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">User Redux Hung</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add-new" />
                            </div>
                            <div className="col-12">
                                {isLoadingGender === true
                                    ? "Loading gender"
                                    : ""}
                            </div>

                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "email")
                                    }
                                    disabled={
                                        this.state.action === crud_actions.EDIT
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "password")
                                    }
                                    disabled={
                                        this.state.action === crud_actions.EDIT
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "firstName")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "lastName")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "phoneNumber")
                                    }
                                />
                            </div>
                            <div className="col-9">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={address}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "address")
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "gender")
                                    }>
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}>
                                                    {language === languages.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    className="form-control"
                                    value={position}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "position")
                                    }>
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}>
                                                    {language === languages.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    className="form-control"
                                    value={role}
                                    onChange={(event) =>
                                        this.onChangeInput(event, "role")
                                    }>
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.keyMap}>
                                                    {language === languages.VI
                                                        ? item.valueVi
                                                        : item.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(event) =>
                                            this.handleOnchangeImg(event)
                                        }
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="previewImg">
                                        Tải ảnh{" "}
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="preview-img"
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgUrl})`,
                                        }}
                                        onClick={() =>
                                            this.openPreviewImg()
                                        }></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button
                                    className={
                                        this.state.action === crud_actions.EDIT
                                            ? "btn btn-warning mt3"
                                            : "btn btn-primary mt-3"
                                    }
                                    onClick={() => this.handleSaveUser()}>
                                    {this.state.action === crud_actions.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={
                                        this.handleEditUserFromParent
                                    }
                                    actionkey={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
