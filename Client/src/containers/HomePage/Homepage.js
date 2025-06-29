import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HeaderHome from "./HeaderHome.js";
import HomeFooter from "./HomeFooter.js";
import Specialty from "./Section/Specialty.jsx";
import MedicalFacility from "./Section/MedicalFacility.jsx";
import OutstandingDoctor from "./Section/OutstandingDoctor.jsx";
import AboutInf from "./Section/AboutInf.jsx";
import Handbook from "./Section/Handbook.jsx";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { after } from "lodash";
class HomePage extends Component {
    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div>
                <HeaderHome isShowBanner = {true}/>
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <Handbook settings={settings} />
                <AboutInf />
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
