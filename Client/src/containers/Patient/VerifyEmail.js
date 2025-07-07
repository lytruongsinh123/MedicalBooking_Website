import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HeaderHome from "../HomePage/HeaderHome";
import "./VerifyEmail.scss";
import { postVerifyBookAppointment } from "../../services/userService";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false, // trạng thái xác thực
            errCode: 0, // mã lỗi
        };
    }
    // thực hiện một lần
    // query string :
    // Khi vào một đường link url nếu muốn lấy token và doctorId thì dùng thư viện Query String
    componentDidMount = async () => {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true, // xác thực thành công
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true, // xác thực thất bại
                    errCode: res && res.errCode ? res.errCode : -1, // mã lỗi nếu có
                });
            }
        }
    };

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HeaderHome isShowBanner={false} />
                {statusVerify === false ? (
                    <div className="verify-email-container">
                        <div className="verify-email-content">
                            <div className="logo"></div>
                            <div className="status-verification loading">
                                <span className="verify-loading-spinner"></span>
                                <h2>Đang chờ đợi ... </h2>
                                <p className="verify-message">
                                    Vui lòng đợi trong giây lát, chúng tôi đang
                                    xác thực thông tin của bạn.
                                </p>
                                <a href="#" className="btn-go-home">
                                    Xin lỗi quý khách
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {errCode === 0 ? (
                            <div className="verify-email-container">
                                <div className="verify-email-content">
                                    <div className="logo"></div>
                                    <div className="status-verification success">
                                        <i className="verify-icon fa-solid fa-circle-check"></i>
                                        <h2>Đặt lịch khám thành công!</h2>
                                        <p className="verify-message">
                                            Cảm ơn bạn đã xác nhận lịch hẹn.
                                            Chúc bạn một ngày tốt lành!
                                        </p>
                                        <a href="/home" className="btn-go-home">
                                            Về trang chủ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="verify-email-container">
                                <div className="verify-email-content">
                                    <div className="logo"></div>
                                    <div className="status-verification error">
                                        <i className="verify-icon fa-solid fa-circle-xmark"></i>
                                        <h2>Xác thực thất bại!</h2>
                                        <p className="verify-message">
                                            Rất tiếc, đã xảy ra lỗi trong quá
                                            trình xác thực, không tìm thấy lịch khám.
                                        </p>
                                        <a href="/home" className="btn-go-home">
                                            Về trang chủ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
