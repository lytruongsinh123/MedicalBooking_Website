import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errorMessage: "",
        };
    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
        console.log(event.target.value);
    };

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
        console.log(event.target.value);
    };
    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    handleLogin = async () => {
        this.setState({
            errorMessage: "",
        });
        console.log("Username", this.state.username);
        console.log("Password", this.state.password);
        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password,
            );
            if (data && data.errCode != 0) {
                this.setState({ errorMessage: data.message });
            }
            if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user);
                this.setState({ errorMessage: data.message });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>
                                <i className="fas fa-user"></i>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username or email"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnchangeUsername(event)
                                }
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>
                                <i className="fas fa-key"></i>
                            </label>
                            <div className="custom-input-password">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnchangePassword(event)
                                    }
                                    onKeyDown={(event) =>
                                        this.handleKeyDown(event)
                                    }
                                />
                                <span onClick={() => this.handleShowHidePass()}>
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? "far fa-eye"
                                                : "fas fa-eye-slash"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errorMessage}
                        </div>

                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => {
                                    this.handleLogin();
                                }}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-ps">
                                Forget your password?
                            </span>
                        </div>
                        <div className="col-12 text-center mt-5">
                            <span className="text-other-login">
                                Or Login With
                            </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-square facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-instagram instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
