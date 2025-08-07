import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils/constant";
class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    };
    componentDidMount = () => {
        this.props.loadTopDoctor();
    };

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };
    handleLinkToMore = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: "/more",
                state: { dataList: this.state.arrDoctors, type: "doctor" },
            });
        }
    };
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors); // duplicate data for slider
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section" onClick={() => this.handleLinkToMore()}>
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings} dots={false}>
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = new Buffer(
                                            item.image,
                                            "base64"
                                        ).toString("binary");
                                    }
                                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailDoctor(
                                                    item
                                                )
                                            }>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div
                                                        className="bg-image section-outstanding-doctor"
                                                        style={{
                                                            backgroundImage: `url(${imageBase64})`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="position text-center">
                                                    <div>
                                                        {language ===
                                                        languages.VI
                                                            ? nameVi
                                                            : nameEn}
                                                    </div>
                                                    <div>Cơ Xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
