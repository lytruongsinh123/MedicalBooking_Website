import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import { languages } from "../../../utils/constant";
import RemedyModal from "./RemedyModal";
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf("day").valueOf(),
            dataPatients: [],
            isOpenRemedyModal: false,
            dataModal: {},
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        let user = this.props.user;
        let currentDate = this.state.currentDate;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatients(user, formattedDate);
    };
    getDataPatients = async (user, formattedDate) => {
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
            () => {
                let user = this.props.user;
                let formattedDate = new Date(this.state.currentDate).getTime();
                this.getDataPatients(user, formattedDate);
            }
        );
    };
    CloseRemedyModal = () => { 
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    }
    handleConfirmAndSendInvoice = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    sendRemedy = (dataFromModal) => {
        console.log("parent check modal", dataFromModal);
    }
    render() {
        let { dataPatients, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
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
                                    {dataPatients && dataPatients.length > 0 ? (
                                        dataPatients.map((item, index) => {
                                            let time =
                                                language === languages.VI
                                                    ? item.timeTypeDataPatient
                                                          .valueVi
                                                    : item.timeTypeDataPatient
                                                          .valueEn;
                                            let gender =
                                                language === languages.VI
                                                    ? item.patientData
                                                          .genderData.valueVi
                                                    : item.patientData
                                                          .genderData.valueEn;
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
                                                colSpan="6"
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
