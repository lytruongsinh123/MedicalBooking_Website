import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HeaderHome from "../../HomePage/HeaderHome";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyById } from "../../../services/userService";
import { getAllCodeService } from "../../../services/userService";
import _, { create } from "lodash";
import { languages } from "../../../utils";
import EachDoctor from "./DetailSpecialty";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            showFullDescription: false,
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: "ALL",
            });
            let resProvince = await getAllCodeService("PROVINCE");
            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc",
                    });
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    };

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    handleOnChangeSelect = async (event) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location,
            });
            if (res && res.errCode === 0) {
                let data = res.data;

                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;

                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };
    handleToggleDescription = () => {
        this.setState((prevState) => ({
            showFullDescription: !prevState.showFullDescription,
        }));
    };
    render() {
        let {
            arrDoctorId,
            dataDetailSpecialty,
            listProvince,
            showFullDescription,
        } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HeaderHome isShowBanner={false} />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty &&
                            !_.isEmpty(dataDetailSpecialty) && (
                                <div>
                                    <div
                                        className={
                                            showFullDescription
                                                ? "desc-content show"
                                                : "desc-content hide"
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: dataDetailSpecialty.descriptionHTML,
                                        }}></div>
                                    <div className="desc-toggle">
                                        <button
                                            onClick={
                                                this.handleToggleDescription
                                            }>
                                            {showFullDescription
                                                ? "Ẩn bớt"
                                                : "Xem thêm"}
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="search-specialty-doctor">
                        <select
                            className="custom-select-province"
                            onChange={(event) =>
                                this.handleOnChangeSelect(event)
                            }>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === languages.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <EachDoctor key={index} index={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorId={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor doctorId={item} />
                                        </div>
                                    </div>
                                </EachDoctor>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
