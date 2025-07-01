import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { languages } from "../../../utils/constant";
import { getSExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false, // trạng thái hiển thị chi tiết
            exTraInfor: {},
        };
    }
    // thực hiện một lần
    async componentDidMount() {}

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getSExtraInforDoctorById(this.props.doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    exTraInfor: res.data,
                });
            }
        }
    };

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };
    render() {
        let { isShowDetailInfor, exTraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {exTraInfor && exTraInfor.nameClinic
                            ? exTraInfor.nameClinic
                            : ""}
                    </div>
                    <div className="detail-address">
                        {exTraInfor && exTraInfor.addressClinic
                            ? exTraInfor.addressClinic
                            : ""}
                    </div>
                </div>
                <div className="content-down">
                    <div
                        className={`short-infor ${
                            isShowDetailInfor ? "hide" : "show"
                        }`}
                    >
                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                        {exTraInfor &&
                            exTraInfor.priceTypeData &&
                            language === languages.VI && (
                                <NumberFormat
                                    value={exTraInfor.priceTypeData.valueVi}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={"VND"}
                                    className="currency"
                                />
                            )}
                        {exTraInfor &&
                            exTraInfor.priceTypeData &&
                            language === languages.EN && (
                                <NumberFormat
                                    value={exTraInfor.priceTypeData.valueEn}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={"$"}
                                    className="currency"
                                />
                            )}
                        <span
                            className="detail"
                            onClick={() => this.showHideDetailInfor(true)}
                        >
                            <FormattedMessage id="patient.extra-infor-doctor.show-detail" />
                        </span>
                    </div>

                    <div
                        className={`detail-content ${
                            isShowDetailInfor ? "show" : "hide"
                        }`}
                    >
                        <div className="title-price">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                        </div>
                        <div className="detail-infor">
                            <div className="price">
                                <span className="left">
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                </span>
                                <span className="right">
                                    {exTraInfor &&
                                        exTraInfor.priceTypeData &&
                                        language === languages.VI && (
                                            <NumberFormat
                                                value={
                                                    exTraInfor.priceTypeData
                                                        .valueVi
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"VND"}
                                                className="currency"
                                            />
                                        )}
                                    {exTraInfor &&
                                        exTraInfor.priceTypeData &&
                                        language === languages.EN && (
                                            <NumberFormat
                                                value={
                                                    exTraInfor.priceTypeData
                                                        .valueEn
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                suffix={"$"}
                                                className="currency"
                                            />
                                        )}
                                </span>
                            </div>
                            <div className="note">
                                {exTraInfor && exTraInfor.note
                                    ? exTraInfor.note
                                    : ""}
                            </div>
                        </div>
                        <div className="payment">
                            <FormattedMessage id="patient.extra-infor-doctor.payment" />
                            {exTraInfor &&
                                exTraInfor.paymentTypeData &&
                                language === languages.VI &&
                                exTraInfor.paymentTypeData.valueVi}
                            {exTraInfor &&
                                exTraInfor.paymentTypeData &&
                                language === languages.EN &&
                                exTraInfor.paymentTypeData.valueEn}
                        </div>
                        <div className="hide-price">
                            <span
                                onClick={() => this.showHideDetailInfor(false)}
                            >
                                <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
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
