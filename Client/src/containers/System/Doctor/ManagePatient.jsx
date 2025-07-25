import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
    getAllPatientForDoctor,
    postSendRemedy,
    getDetailInforDoctor,
} from "../../../services/userService";
import moment from "moment";
import { languages } from "../../../utils/constant";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatients: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        this.getDataPatients();
    };
    getDataPatients = async () => {
        let user = this.props.user;
        let currentDate = this.state.currentDate;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatients: res.data ? res.data : [],
            });
        }
    };

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatients();
            }
        );
    };
    CloseRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    handleConfirmAndSendInvoice = async (item) => {
        let { language } = this.props;
        let doctor = await getDetailInforDoctor(item.doctorId);
        let doctorName =
            language === languages.EN
                ? doctor.data.firstName + " " + doctor.data.lastName
                : doctor.data.lastName + " " + doctor.data.firstName;
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            date: this.state.currentDate,
            patientName:
                item.patientData.firstName + " " + item.patientData.lastName,
            timeString:
                language === languages.VI
                    ? item.timeTypeDataPatient.valueVi
                    : item.timeTypeDataPatient.valueEn,
            doctorName: doctorName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    sendRemedy = async (dataChildFromModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChildFromModal.email,
            fileBase64: dataChildFromModal.fileBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            date: dataModal.date,
            language: this.props.language,
            patientName: dataModal.patientName,
            doctorName: dataModal.doctorName,
            timeString: dataModal.timeString,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Gửi hóa đơn thành công");
            this.CloseRemedyModal();
            await this.getDataPatients();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error("Gửi hóa đơn thất bại");
        }
    };
    render() {
        let { dataPatients, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text="Loading...">
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label htmlFor="">Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className="col-12 mt-4 table-manage-patient">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>Địa chỉ</th>
                                            <th>Thời gian</th>
                                            <th>Số điện thoại</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatients &&
                                        dataPatients.length > 0 ? (
                                            dataPatients.map((item, index) => {
                                                let time =
                                                    language === languages.VI
                                                        ? item
                                                              .timeTypeDataPatient
                                                              .valueVi
                                                        : item
                                                              .timeTypeDataPatient
                                                              .valueEn;
                                                let gender =
                                                    language === languages.VI
                                                        ? item.patientData
                                                              .genderData
                                                              .valueVi
                                                        : item.patientData
                                                              .genderData
                                                              .valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .firstName
                                                            }{" "}
                                                            {
                                                                item.patientData
                                                                    .lastName
                                                            }
                                                        </td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .address
                                                            }
                                                        </td>
                                                        <td>{time}</td>
                                                        <td>
                                                            {
                                                                item.patientData
                                                                    .phoneNumber
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="action-buttons">
                                                                <button
                                                                    className="btn btn-confirm"
                                                                    onClick={() =>
                                                                        this.handleConfirmAndSendInvoice(
                                                                            item
                                                                        )
                                                                    }>
                                                                    <i className="fas fa-check"></i>
                                                                    Xác nhận
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="text-center">
                                                    Không có dữ liệu bệnh nhân
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        CloseRemedyModal={this.CloseRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
