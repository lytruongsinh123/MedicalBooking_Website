import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { languages } from "../../../utils/constant";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        };
    }
    // thực hiện một lần
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorId) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorId,
                allDays[0].value
            );
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
        }

        this.setState({
            allDays: allDays,
        });
    }
    getArrDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let dateMoment = moment(new Date()).add(i, "days");
            if (language === languages.VI) {
                if (i === 0) {
                    object.label = `Hôm nay - ${dateMoment.format("DD/MM")}`;
                } else {
                    object.label = dateMoment
                        .format("dddd - DD/MM")
                        .replace(/^./, (str) => str.toUpperCase());
                }
            } else {
                if (i === 0) {
                    object.label = `Today - ${dateMoment
                        .locale("en")
                        .format("DD/MM")}`;
                } else {
                    object.label = dateMoment
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }
            object.value = dateMoment.startOf("day").valueOf();
            arrDate.push(object);
        }
        return arrDate;
    };
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(
                this.props.doctorId,
                allDays[0].value
            );
            this.setState({
                allAvailableTime: res.data ? res.data : [],
            });
        }
    };
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                });
            }
        }
    };
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };
    CloseBookingModal = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
        });
    };
    render() {
        let {
            allDays,
            allAvailableTime,
            isOpenModalBooking,
            dataScheduleTimeModal,
        } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select
                            onChange={(event) =>
                                this.handleOnchangeSelect(event)
                            }>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-alt">
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />
                                </span>
                            </i>
                            <div className="time-content">
                                {allAvailableTime &&
                                allAvailableTime.length > 0 ? (
                                    <>
                                        <div className="time-content-btns">
                                            {allAvailableTime.map(
                                                (item, index) => {
                                                    let timeDisplay =
                                                        language ===
                                                        languages.VI
                                                            ? item.timeTypeData
                                                                  .valueVi
                                                            : item.timeTypeData
                                                                  .valueEn;
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={
                                                                language ===
                                                                languages.VI
                                                                    ? "btn-vi"
                                                                    : "btn-en"
                                                            }
                                                            onClick={() => {
                                                                this.handleClickScheduleTime(
                                                                    item
                                                                );
                                                            }}>
                                                            {timeDisplay}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className="book-free">
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.choose" />
                                                <i className="far fa-hand-point-up"></i>{" "}
                                                <FormattedMessage id="patient.detail-doctor.book-free" />
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-schedule">
                                        <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    CloseBookingModal={this.CloseBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
