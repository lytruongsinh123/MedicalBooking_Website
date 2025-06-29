import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import "./HeaderHome.scss";
import { languages } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
class HeaderHome extends Component {
    changeLanguage = (language) => {
        // fire redux event : action
        this.props.changeLanguageAppRedux(language);
    };
    returnToHome = () =>
    {
        if (this.props.history) {
            this.props.history.push("/home");
        }
    }
    render() {
        let language = this.props.language; // lấy trong redux ko phải props
        return (
            <React.Fragment>
                <div className="home_header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo" onClick={()=>this.returnToHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div className="hhhhhh">
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                </div>
                                <div className="sub-titles">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="hhhhhh">
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                </div>
                                <div className="sub-titles">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="hhhhhh">
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="sub-titles">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="hhhhhh">
                                    <b>
                                        <FormattedMessage id="home-header.package-medical" />
                                    </b>
                                </div>
                                <div className="sub-titles">
                                    <FormattedMessage id="home-header.general-check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.medical-support" />
                            </div>
                            <div
                                className={
                                    language === languages.VI
                                        ? "language-vn active"
                                        : "language-vn"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(languages.VI)
                                    }
                                >
                                    <b>VN</b>
                                </span>
                            </div>
                            <div
                                className={
                                    language === languages.EN
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changeLanguage(languages.EN)
                                    }
                                >
                                    <b>EN</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="home-banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="home-banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.specialty-check-up" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.remote-check-up" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.general-check-up" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-flask"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.medical-test" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.emotion-health" />
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child">
                                        <i className="fas fa-briefcase-medical"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="home-banner.dental-check-up" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter (connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
