import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";
import { languages, user_role } from "../../utils/constant";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    componentDidMount = () =>
    {
        let userInfo = this.props.userInfo;
        let menuApp = [];
        if (userInfo && !_.isEmpty(userInfo))
        {
            let role = userInfo.roleId;
            if( role === user_role.ADMIN)
            {
                menuApp = adminMenu;
            }
            if (role === user_role.DOCTOR)
            {
                menuApp = doctorMenu;
            }
        }
        this.setState({
            menuApp: menuApp,
        });
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log("check user info", this.props.userInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />,{" "}
                        {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
                    </span>
                    <span
                        className={language === languages.VI ? "language-vi active" : "language-vi"}
                        onClick={() => this.handleChangeLanguage(languages.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={language === languages.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(languages.EN)}
                    >
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
