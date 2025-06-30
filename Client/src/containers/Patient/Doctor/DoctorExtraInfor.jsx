import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { languages } from "../../../utils/constant";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false, // trạng thái hiển thị chi tiết
        };
    }
    // thực hiện một lần
    async componentDidMount() {}

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
        }
    };

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };
    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">
                        Phòng khám Chuyên khoa Da liễu
                    </div>
                    <div className="detail-address">
                        207 Phố Huế - Hai Bà Trưng - Hà Nội
                    </div>
                </div>
                <div className="content-down">
                    <div
                        className={`short-infor ${
                            isShowDetailInfor ? "hide" : "show"
                        }`}
                    >
                        GIÁ KHÁM: 250.000đ.{"  "}
                        <span onClick={() => this.showHideDetailInfor(true)}>
                            Xem chi tiết
                        </span>
                    </div>

                    <div
                        className={`detail-content ${
                            isShowDetailInfor ? "show" : "hide"
                        }`}
                    >
                        <div className="title-price">GIÁ KHÁM: </div>
                        <div className="detail-infor">
                            <div className="price">
                                <span className="left">Gía khám</span>
                                <span className="right">250000đ</span>
                            </div>
                            <div className="note">
                                Được ưu tiên khám trước khi đặt khám qua
                                BookingCare. Gía Khám cho người nước ngoài là 30
                                USD
                            </div>
                        </div>
                        <div className="payment">
                            Người bệnh có thể thanh toán chi phí bằng hình thức
                            tiền mặt và quẹt thẻ
                        </div>
                        <div className="hide-price">
                            <span
                                onClick={() => this.showHideDetailInfor(false)}
                            >
                                Ẩn chi tiết
                            </span>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
