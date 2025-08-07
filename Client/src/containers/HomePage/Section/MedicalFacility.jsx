import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import { withRouter } from "react-router";
import { getAllClinicService } from "../../../services/userService";
import { emitter } from "../../../utils/emitter";
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }
    async componentDidMount() {
        // Fetch data for medical facilities here if needed
        // For now, we will use static data
        let res = await getAllClinicService();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data,
            });
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);
        }
    };
    handleLinkToMore = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: "/more",
                state: { dataList: this.state.dataClinics, type: "clinic" },
            });
        }
    };
    render() {
        let { dataClinics } = this.state;
        emitter.emit("SEND_CLINIC_DATA", this.state.dataClinics);

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.health-facility" />
                        </span>
                        <button
                            className="btn-section"
                            onClick={() => this.handleLinkToMore()}>
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinics &&
                                dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailClinic(
                                                    item
                                                )
                                            }>
                                            <div
                                                className="bg-image section-medical-facility"
                                                style={{
                                                    backgroundImage: `url(${item.image})`,
                                                }}
                                            />
                                            <div className="name-spacialty">
                                                {this.props.language ===
                                                languages.VI
                                                    ? item.name
                                                    : item.nameEn}
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
