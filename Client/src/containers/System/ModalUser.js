import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
        this.listenToEmitter();
    }

    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            // hứng event
            console.log("listent emitter from parent : ");
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            });
        });
    };
    componentDidMount() {
        console.log("mounting modal");
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        //bad code .modify state
        /**
         * this.state = {
         * email: "",
         * password: "",
         * firstName: "",
         * lastName: "",
         * address: "",
         * }
         * this.state.email == this.state['email];
         * this.state.password == this.state['password];
         * this.state.firstName == this.state['firstName];
         */
        // this.state[id] = event.target.value;
        // this.setState(
        //   {
        //     ...this.state, //... dấu copy
        //   },
        //   () => {
        //     console.log("check bad state", this.state);
        //   }
        // );
        //good code
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState(
            {
                ...stateCopy,
            },
            () => {
                console.log("check good state", this.state);
            }
        );
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter :" + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            // call API create Model
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.toggle();
                }}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggle();
                    }}
                >
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "email");
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password");
                                }}
                                value={this.state.password}
                            />
                        </div>
                        <div className="input-container">
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "firstName");
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last name</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName");
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "address");
                                }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.handleAddNewUser();
                        }}
                        className="px-3"
                    >
                        Create user
                    </Button>{" "}
                    <Button
                        color="secondary"
                        onClick={() => {
                            this.toggle();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
