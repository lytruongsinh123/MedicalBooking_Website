import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

class HomeFooter extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__container">
                    {/* Giới thiệu */}
                    <div className="footer__section">
                        <h3>Colorlib</h3>
                        <div className="footer__line"></div>
                        <p>
                            A small river named Duden flows by their place and supplies it with the
                            necessary regelialia. It is a paradisematic country...
                        </p>
                        <div className="footer__socials">
                            <div className="icon">
                                <i className="fab fa-twitter"></i>
                            </div>
                            <div className="icon">
                                <i className="fab fa-facebook-square"></i>
                            </div>
                            <div className="icon">
                                <i className="fab fa-instagram"></i>
                            </div>
                        </div>
                    </div>

                    {/* Tin tức */}
                    <div className="footer__section">
                        <h3>Latest News</h3>
                        <div className="footer__line"></div>
                        <div className="footer__news-item">
                            <div className="image1"></div>
                            <div>
                                <p>Even the all-powerful Pointing has no control about</p>
                                <small>Oct. 16, 2019 · Admin · 19</small>
                            </div>
                        </div>
                        <div className="footer__news-item">
                            <div className="image2"></div>
                            <div>
                                <p>Even the all-powerful Pointing has no control about</p>
                                <small>Oct. 16, 2019 · Admin · 19</small>
                            </div>
                        </div>
                    </div>

                    {/* Liên kết nhanh */}
                    <div className="footer__section">
                        <h3>Quick Links</h3>
                        <div className="footer__line"></div>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Works</a>
                            </li>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Thông tin liên hệ */}
                    <div className="footer__section">
                        <h3>Have a Questions?</h3>
                        <div className="footer__line"></div>
                        <div className="contact_email">
                            <form>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="custom-input"
                                />
                            </form>
                            <div className="single-btn">
                                <a href="#">
                                    <span>
                                        Contact Us <i className="far fa-paper-plane"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <ul className="footer__contact">
                            <li>
                                <i className="fas fa-map-marker-alt"></i> 203 Fake St. Mountain
                                View, San Francisco, California, USA
                            </li>
                            <li>
                                <i className="fas fa-phone"></i> +2 392 3929 210
                            </li>
                            <li>
                                <i className="fas fa-paper-plane"></i> info@yourdomain.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <small>
                        ©2025 All rights reserved | This template is made with{" "}
                        <i className="fas fa-heart"></i> by{" "}
                        <a href="https://colorlib.com">Colorlib</a>
                    </small>
                </div>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
