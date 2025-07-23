import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HeaderHome from "../../HomePage/HeaderHome";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailClinicById } from "../../../services/userService";
import _, { create } from "lodash";
import { languages } from "../../../utils";
import EachDoctor from "./each_doctor";

import { Map, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Fix icon marker mặc định cho leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
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
            let res = await getDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                        });
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};

    handleToggleDescription = () => {
        this.setState((prevState) => ({
            showFullDescription: !prevState.showFullDescription,
        }));
    };

    render() {
        let { arrDoctorId, dataDetailClinic, showFullDescription } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-specialty-container">
                <HeaderHome isShowBanner={false} />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                            <div>
                                <h2>
                                    {language === languages.VI
                                        ? dataDetailClinic.name
                                        : dataDetailClinic.nameEn}
                                </h2>
                                <div
                                    className={
                                        showFullDescription
                                            ? "desc-content show"
                                            : "desc-content hide"
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailClinic.descriptionHTML,
                                    }}></div>
                                <div className="desc-toggle">
                                    <button
                                        onClick={this.handleToggleDescription}>
                                        {showFullDescription
                                            ? "Ẩn bớt"
                                            : "Xem thêm"}
                                    </button>
                                </div>
                            </div>
                        )}
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

                <div className="clinic-map-container">
                    {dataDetailClinic &&
                    dataDetailClinic.lat &&
                    dataDetailClinic.lng &&
                    !isNaN(dataDetailClinic.lat) &&
                    !isNaN(dataDetailClinic.lng) ? (
                        <div className="map-wrapper">
                            <div className="map-header">
                                <span className="map-icon">📍</span>
                                <div>
                                    <div>Vị trí phòng khám</div>
                                    {dataDetailClinic.address && (
                                        <div className="clinic-address">
                                            {dataDetailClinic.address}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Map
                                center={[
                                    parseFloat(dataDetailClinic.lat),
                                    parseFloat(dataDetailClinic.lng),
                                ]}
                                zoom={15}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker
                                    position={[
                                        parseFloat(dataDetailClinic.lat),
                                        parseFloat(dataDetailClinic.lng),
                                    ]}
                                />
                            </Map>
                        </div>
                    ) : (
                        <div className="no-location-message">
                            <div className="no-location-icon">🗺️</div>
                            <p>Không có thông tin vị trí cho phòng khám này</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
