import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { languages } from "../../../utils/constant";
import { getProfileInforDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    };

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileInforDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data ? res.data : {};
            }
        }
        return result;
    };
    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevProps.doctorId !== this.props.doctorId) {
        }
    };
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVi = "",
            nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${
                                dataProfile && dataProfile.image
                                    ? dataProfile.image
                                    : ""
                            })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === languages.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile.Markdown &&
                                dataProfile.Markdown.description && (
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                    {dataProfile &&
                        dataProfile.Doctor_Infor &&
                        language === languages.VI && (
                            <NumberFormat
                                value={
                                    dataProfile.Doctor_Infor.priceTypeData
                                        .valueVi
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"VND"}
                                className="currency"
                            />
                        )}
                    {dataProfile &&
                        dataProfile.Doctor_Infor &&
                        language === languages.EN && (
                            <NumberFormat
                                value={
                                    dataProfile.Doctor_Infor.priceTypeData
                                        .valueEn
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"$"}
                                className="currency"
                            />
                        )}
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
