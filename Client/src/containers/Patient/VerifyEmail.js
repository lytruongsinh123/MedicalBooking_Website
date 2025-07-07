import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // thực hiện một lần
    componentDidMount = async () => {
        console.log("verify email component did mount", this.props);
        const urlParams = new URLSearchParams(this.props.location.search);
        const token = urlParams.get("token");
        const doctorId = urlParams.get("doctorId");
        console.log(token, doctorId);
        if (
            this.props.match &&
            this.props.match.params 
        ) {
            
        }
    }

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    render() {
        return <div>Hello world</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
