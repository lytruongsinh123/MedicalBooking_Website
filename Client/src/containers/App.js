import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import Doctor from "../routes/Doctor";
import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/Homepage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        <div className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(Login)}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />

                                    <Route
                                        path='/doctor/'
                                        component={userIsAuthenticated(Doctor)}
                                    />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path= {path.DETAIL_DOCTOR} component={DetailDoctor}/>
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container"
                            toastClassName="toast-item"
                            bodyClassName="toast-item-body"
                            autoClose={false}
                            hideProgressBar={true}
                            pauseOnHover={false}
                            pauseOnFocusLoss={true}
                            closeOnClick={false}
                            draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
