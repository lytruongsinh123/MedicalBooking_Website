import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    getAllUsers,
    createNewUserService,
    deteleUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModel: false,
            isOpenEditUserModal: false,
            userEdit: {},
        };
    }
    /**
     * Life cycle
     * Run Component :
     * 1. Run constuctor -> init state
     * 2. Did mount (set state) Call API get data and set state for component
     * 3. Render
     */

    /**
     * fire event child -> parent (props)
     * parent -> child (ref)
     * emitter (event)
     */
    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers("ALL");
        console.log(response);
        if (response && response.errCode === 0) {
            this.setState({ arrUsers: response.allusers }, () => {
                console.log(this.state.arrUsers);
            });
            emitter.emit("EVENT_CLEAR_MODAL_DATA"); // Muốn fire một event
        }
    };
    handleAddNewUser = () => {
        this.setState({
            isOpenModel: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModel: !this.state.isOpenModel,
        });
    };
    toggleUserEditModal = () => {
        this.setState({
            isOpenEditUserModal: !this.state.isOpenEditUserModal,
        });
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log("check response", response);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsers();
                this.setState({
                    isOpenModel: false,
                });
            }
        } catch (e) {
            console.log("Error when create new user", e);
            return;
        }
        console.log("check data", data);
    };

    handleDeletaUser = async (user) => {
        console.log("click delete", user);
        try {
            let response = await deteleUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUsers();
            } else {
                alert(response.message);
            }
        } catch (e) {
            console.log("Error when delete user", e);
        }
    };

    handleEditUser = (user) => {
        console.log("check edit user", user);
        this.setState({
            isOpenEditUserModal: true,
            userEdit: user,
        });
    };

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                await this.getAllUsers();
                this.setState({
                    isOpenEditUserModal: false,
                });
            } else {
                alert(response.message);
            }
        } catch (e) {
            console.log("Error when edit user", e);
            return;
        }
    };
    render() {
        console.log("check render", this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModel}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditUserModal && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUserModal}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title text-center">MANAGE USER</div>
                <div className="mx-5">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-5">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => {
                                                        this.handleEditUser(item);
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        this.handleDeletaUser(item);
                                                    }}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
