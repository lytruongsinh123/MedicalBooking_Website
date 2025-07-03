import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import _ from "lodash";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // thực hiện một lần
    componentDidMount = async () => {};

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    render() {
        let { isOpenModal, CloseBookingModal, dataTime } = this.props;
        let doctorId =
            dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
        return (
            <Modal
                isOpen={isOpenModal}
                toggle={this.props.toggleFromParent}
                className={"booking-modal-container"}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">
                            Thông tin đặt lịch khám bệnh
                        </span>
                        <span className="right" onClick={CloseBookingModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor doctorId={doctorId} />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Họ và tên
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-user text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập họ tên"
                                    />
                                </div>
                            </div>

                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Số điện thoại
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-phone text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="phone"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                            </div>


                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Địa chỉ email
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-envelope text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="Nhập địa chỉ email"
                                    />
                                </div>
                            </div>

                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Địa chỉ liên hệ
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-map-marker-alt text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="address"
                                        placeholder="Nhập địa chỉ liên hệ"
                                    />
                                </div>
                            </div>

                            <div className="col-12 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Lý do khám
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-stethoscope text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="reason"
                                        placeholder="Nhập lý do khám"
                                    />
                                </div>
                            </div>

                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Đặt cho ai
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-user-friends text-primary"></i>
                                    </span>
                                    <input
                                        className="form-control"
                                        type="address"
                                        placeholder="Nhập họ tên người đặt"
                                    />
                                </div>
                            </div>

                            <div className="col-6 form-group mt-3">
                                <label className="text-dark fw-bold">
                                    Giới tính
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-venus-mars text-primary"></i>
                                    </span>
                                    <select className="form-control form-select">
                                        <option value="">Chọn giới tính</option>
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
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
                                        <td className="text-right">300.000đ</td>
                                    </tr>
                                    <tr>
                                        <td>Phí đặt lịch</td>
                                        <td className="text-right">Miễn phí</td>
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
                                Quý khách vui lòng điền đầy đủ thông tin để tiết
                                kiệm thời gian làm thủ tục khám
                            </p>
                        </div>

                        {/* Lưu ý */}
                        <div className="notice-section">
                            <h6>LƯU Ý</h6>
                            <p>
                                Thông tin anh/chị cung cấp sẽ được sử dụng làm
                                hồ sơ khám bệnh, khi điền thông tin anh/chị vui
                                lòng:
                            </p>
                            <ul>
                                <li>
                                    Ghi rõ họ và tên, viết hoa những chữ cái đầu
                                    tiên, ví dụ: <strong>Trần Văn Phú</strong>
                                </li>
                                <li>
                                    Điền đầy đủ, đúng và vui lòng kiểm tra lại
                                    thông tin trước khi ấn "Xác nhận"
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*Footer*/}
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm">
                            Xác nhận
                        </button>
                        <button
                            className="btn-booking-cancel"
                            onClick={CloseBookingModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
