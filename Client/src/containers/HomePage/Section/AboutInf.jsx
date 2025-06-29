import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

class AboutInf extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Truyền thông nói về BookingCare</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/wxzc_2c6GMg"
                            title="How do carbohydrates impact your health? - Richard J. Wood"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <div className="logo"></div>
                        <p>
                            BookingCare là nền tảng chăm sóc sức khỏe trực tuyến hàng đầu tại Việt
                            Nam, giúp kết nối người bệnh với đội ngũ bác sĩ giỏi và các cơ sở y tế
                            uy tín. Thông qua hệ thống đặt lịch khám trực tuyến tiện lợi, người dùng
                            có thể dễ dàng tìm kiếm bác sĩ, đặt lịch khám, tư vấn từ xa qua video và
                            theo dõi quá trình điều trị một cách hiệu quả. BookingCare cam kết mang
                            đến trải nghiệm chăm sóc sức khỏe nhanh chóng, an toàn và chất lượng cao
                            cho mọi người dân...
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutInf);
