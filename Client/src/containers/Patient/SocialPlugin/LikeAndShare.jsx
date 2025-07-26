import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class LikeAndShare extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        let { language } = this.props;
        let locale = language === "vi" ? "vi_VN" : "en_US";
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: "v12.0",
                locale: locale,
                cookie: true,
            });
        };

        // Load the Facebook SDK asynchronously
        (function (d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `https://connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };
    componentDidMount = () => {
        this.initFacebookSDK();
    };
    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.language !== this.props.language) {
            this.initFacebookSDK();
        }
    };
    render() {
        let { dataHref, width, numPost } = this.props;
        return (
            <>
                <div
                    className="fb-like"
                    data-href={dataHref}
                    data-width={width ? width : ""}
                    data-layout="standard"
                    data-action="like"
                    data-size="small"
                    data-share="true"
                    data-show-faces="true"
                    data-numposts={numPost ? numPost : 5}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
