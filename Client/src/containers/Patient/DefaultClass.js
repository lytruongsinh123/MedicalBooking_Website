import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // thực hiện một lần
    componentDidMount = async () => {}

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    render() {
        return <div></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
