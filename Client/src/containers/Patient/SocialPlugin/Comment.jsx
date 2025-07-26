import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class Comment extends Component {
    componentDidMount() {
        // Nếu SDK chưa có thì khởi tạo
        if (!window.FB) {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: "v12.0",
                    cookie: true,
                });
                window.FB.XFBML.parse();
            };
            // Load SDK
            (function (d, s, id) {
                let js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/vi_VN/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            })(document, "script", "facebook-jssdk");
        } else {
            window.FB.XFBML.parse();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataHref !== this.props.dataHref) {
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        }
    }

    render() {
        return (
            <div
                className="fb-comments"
                data-href={this.props.dataHref}
                data-width={this.props.width}
                data-numposts="5"
            ></div>
        );
    }
}

export default Comment;
