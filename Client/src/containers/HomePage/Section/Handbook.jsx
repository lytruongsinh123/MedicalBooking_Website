import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class Handbook extends Component {
    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
                            <div className="section-customize">
                                <div className="Handbook-body">
                                    <div className="bg-image section-handbook" />
                                    <div className="name-spacialty">Khoa Xương Khớp</div>
                                </div>
                            </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
