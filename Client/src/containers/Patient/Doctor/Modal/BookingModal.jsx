import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import { languages } from "../../../../utils/constant";
import DatePicker from "../../../../components/Input/DatePicker";
import _, { add } from "lodash";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import { postPatientBookingAppointment } from "../../../../services/userService";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            date: "",
            genders: "",
            doctorId: "",
            selectedGender: "",
            timeType: "",
            isShowLoading: false,
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        this.props.fetchGenderStart();
    };
    buildGenderData = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label =
                    language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };
    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildGenderData(this.props.genders),
            });
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildGenderData(this.props.genders),
            });
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    };

    // Hàm xử lý thay đổi input
    handleOnChangeInput = (event, id) => {
        let value = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = value;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnChangeDatePicker = (date) => {
        // Nếu date là mảng và có phần tử hợp lệ
        if (
            Array.isArray(date) &&
            date[0] &&
            !isNaN(new Date(date[0]).getTime())
        ) {
            this.setState({
                date: date[0],
            });
        } else {
            this.setState({
                date: "",
            });
        }
    };
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                language == languages.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                          .replace(/^./, (str) => str.toUpperCase())
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY");
            let time =
                language === languages.VI
                    ? dataTime.timeTypeData.valueVi
                    : dataTime.timeTypeData.valueEn;
            return `${time} - ${date}`;
        }
        return ``;
    };
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name =
                language === languages.VI
                    ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                    : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return `${name}`;
        }
        return ``;
    };
    handleConfirmBooking = async () => {
        // Validate input
        let isValid = true;
        let arrInput = [
            "fullName",
            "phoneNumber",
            "email",
            "address",
            "reason",
            "date",
            "selectedGender",
            "doctorId",
            "timeType",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                toast.error("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        if (!isValid) return;
        this.setState({ isShowLoading: true });
        // Call API to post booking appointment
        let date = new Date(this.state.date).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthDate: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        this.setState({ isShowLoading: false });
        if (res && res.errCode === 0) {
            toast.success(
                "Please check your email to confirm the appointment!"
            );
            this.props.CloseBookingModal();
        } else {
            toast.error("Booking a new appointment error!");
        }
    };
    render() {
        let { isOpenModal, CloseBookingModal, dataTime } = this.props;
        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text="Loading..."
                centered>
                <Modal
                    isOpen={isOpenModal}
                    toggle={this.props.toggleFromParent}
                    className={"booking-modal-container"}
                    size="lg"
                    centered>
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right" onClick={CloseBookingModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.full-name" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-user text-primary"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nhập họ tên"
                                            value={this.state.fullName}
                                            onChange={(event) =>
                                                this.handleOnChangeInput(
                                                    event,
                                                    "fullName"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.phone-number" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-phone text-primary"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            type="phone"
                                            placeholder="Nhập số điện thoại"
                                            value={this.state.phoneNumber}
                                            onChange={(event) =>
                                                this.handleOnChangeInput(
                                                    event,
                                                    "phoneNumber"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope text-primary"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            type="email"
                                            placeholder="Nhập địa chỉ email"
                                            value={this.state.email}
                                            onChange={(event) =>
                                                this.handleOnChangeInput(
                                                    event,
                                                    "email"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-map-marker-alt text-primary"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            type="address"
                                            placeholder="Nhập địa chỉ liên hệ"
                                            value={this.state.address}
                                            onChange={(event) =>
                                                this.handleOnChangeInput(
                                                    event,
                                                    "address"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-12 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.reason-booking" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-stethoscope text-primary"></i>
                                        </span>
                                        <input
                                            className="form-control"
                                            type="reason"
                                            placeholder="Nhập lý do khám"
                                            value={this.state.reason}
                                            onChange={(event) =>
                                                this.handleOnChangeInput(
                                                    event,
                                                    "reason"
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.choose-date" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-user-friends text-primary"></i>
                                        </span>
                                        <DatePicker
                                            onChange={
                                                this.handleOnChangeDatePicker
                                            }
                                            className="form-control"
                                            value={this.state.date}
                                            placeholder="Chọn ngày sinh"
                                        />
                                    </div>
                                </div>

                                <div className="col-6 form-group mt-3">
                                    <label className="text-dark fw-bold">
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="fas fa-venus-mars text-primary"></i>
                                        </span>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                            styles={{
                                                container: (provided) => ({
                                                    ...provided,
                                                    width: "90%",
                                                }),
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderRadius: "0 4px 4px 0",
                                                    borderColor: "#49bce2",
                                                    boxShadow: "none",
                                                    fontSize: "16px",
                                                }),
                                            }}
                                            placeholder="Chọn giới tính"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hình thức thanh toán */}
                            <div className="payment-section">
                                <h5>Hình thức thanh toán</h5>
                                <div className="payment-option">
                                    <input
                                        type="radio"
                                        id="payment-after"
                                        name="payment"
                                        value="after"
                                        defaultChecked
                                    />
                                    <label htmlFor="payment-after">
                                        Thanh toán sau tại cơ sở y tế
                                    </label>
                                </div>

                                <div className="payment-option">
                                    <input
                                        type="radio"
                                        id="payment-after"
                                        name="payment"
                                        value="after"
                                        defaultChecked
                                    />
                                    <label htmlFor="payment-after">
                                        Thanh toán bằng thẻ tín dụng
                                    </label>
                                </div>

                                <div className="payment-option">
                                    <input
                                        type="radio"
                                        id="payment-after"
                                        name="payment"
                                        value="after"
                                        defaultChecked
                                    />
                                    <label htmlFor="payment-after">
                                        Thanh toán bằng chuyển khoản
                                    </label>
                                </div>
                            </div>

                            {/* Bảng giá */}
                            <div className="price-table">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Giá khám</td>
                                            <td className="text-right">
                                                300.000đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phí đặt lịch</td>
                                            <td className="text-right">
                                                Miễn phí
                                            </td>
                                        </tr>
                                        <tr className="total-row">
                                            <td>
                                                <strong>Tổng cộng</strong>
                                            </td>
                                            <td className="text-right text-danger">
                                                <strong>300.000đ</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="note-text text-center">
                                    Quý khách vui lòng điền đầy đủ thông tin để
                                    tiết kiệm thời gian làm thủ tục khám
                                </p>
                            </div>

                            {/* Lưu ý */}
                            <div className="notice-section">
                                <h6>LƯU Ý</h6>
                                <p>
                                    Thông tin anh/chị cung cấp sẽ được sử dụng
                                    làm hồ sơ khám bệnh, khi điền thông tin
                                    anh/chị vui lòng:
                                </p>
                                <ul>
                                    <li>
                                        Ghi rõ họ và tên, viết hoa những chữ cái
                                        đầu tiên, ví dụ:{" "}
                                        <strong>Trần Văn Phú</strong>
                                    </li>
                                    <li>
                                        Điền đầy đủ, đúng và vui lòng kiểm tra
                                        lại thông tin trước khi ấn "Xác nhận"
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/*Footer*/}
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id="patient.booking-modal.btn-confirm" />
                            </button>
                            <button
                                className="btn-booking-cancel"
                                onClick={CloseBookingModal}>
                                <FormattedMessage id="patient.booking-modal.btn-cancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
