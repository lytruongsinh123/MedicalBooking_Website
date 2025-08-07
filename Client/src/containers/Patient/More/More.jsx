import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import EachDoctor from "../Clinic/each_doctor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import "./More.scss";
import HeaderHome from "../../HomePage/HeaderHome";
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // thực hiện một lần
    componentDidMount = async () => {};

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    render() {
        const dataList = this.props.location.state?.dataList;
        const type = this.props.location.state?.type;
        const { language } = this.props;
        return (
            <div className="more-list-container">
                <HeaderHome isShowBanner={false} />
                <h2 className="mr-more-title">
                    {type === "clinic" && (
                        <FormattedMessage id="homepage.health-facility" />
                    )}
                    {type === "doctor" && (
                        <FormattedMessage id="homepage.outstanding-doctor" />
                    )}
                    {type === "specialty" && (
                        <FormattedMessage id="homepage.speciality" />
                    )}
                </h2>
                <div className="list-body">
                    {dataList.length > 0 ? (
                        dataList.map((item, idx) => {
                            return (
                                <div className="list-card" key={item.id || idx}>
                                    {type === "clinic" && (
                                        <>
                                            <div
                                                className="cl-list-img"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}></div>
                                            <div className="cl-list-name">
                                                {language === "en" ? item.nameEn : item.name}
                                            </div>
                                            <div className="cl-list-address">
                                                {item.address}
                                            </div>
                                        </>
                                    )}
                                    {type === "doctor" && (
                                        <EachDoctor doctorId={item.id}>
                                            <div className="mr-doctor-card">
                                                <div className="mr-doctor-card-left">
                                                    <div className="mr-doctor-profile">
                                                        <ProfileDoctor
                                                            doctorId={item.id}
                                                            isShowDescriptionDoctor={
                                                                true
                                                            }
                                                            isShowLinkDetail={
                                                                true
                                                            }
                                                            isShowPrice={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mr-doctor-card-right">
                                                    <div className="mr-doctor-schedule">
                                                        <DoctorSchedule
                                                            doctorId={item.id}
                                                        />
                                                    </div>
                                                    <div className="mr-doctor-extra-info">
                                                        <DoctorExtraInfor
                                                            doctorId={item.id}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </EachDoctor>
                                    )}
                                    {type === "specialty" && (
                                        <>
                                            <div
                                                className="sp-list-img"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}></div>
                                            <div className="sp-list-name">
                                                {language === "en" ? item.nameEn : item.name}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-data">
                            <FormattedMessage id="homepage.no-data" />
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
