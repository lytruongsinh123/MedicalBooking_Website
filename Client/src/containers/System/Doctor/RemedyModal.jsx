import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import moment from "moment";
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fileBase64: "",
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {
        let { dataModal } = this.props;
        if (dataModal && dataModal.email) {
            this.setState({
                email: dataModal.email,
            });
        }
    };
    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if(prevProps.dataModal !== this.props.dataModal) {
            let { dataModal } = this.props;
            if(dataModal && dataModal.email) {
                this.setState({
                    email: dataModal.email,
                });
            }
        }
    };
    handleOnChangeInput = (event, id) => { 
        let value = event.target.value;
        this.setState({
            [id]: value,
        });
    }
    handleOnChangeFile = async (event) => {
        let data = event.target.files; // lấy ra file ảnh
        let file = data[0]; // lấy ra file đầu tiên
        if (file) {
            let base64 = await CommonUtils.toBase64(file); // chuyển đổi file sang base64
            this.setState({
                fileBase64: base64, 
            });
        }
    };
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }
    render() {
        let { isOpenModal, CloseRemedyModal, dataModal, sendRemedy } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={"booking-modal-container"}
                size="md"
                centered>
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa đơn</h5>
                    <button type="button" className="close" aria-label="Close" onClick={CloseRemedyModal}>
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label htmlFor="">Email bệnh nhân</label>
                            <input
                                type="email"
                                value={this.state.email}
                                className="form-control"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "email")
                                }
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label htmlFor="">Chọn hóa đơn</label>
                            <input type="file" className="form-control"
                                onChange={(event) => this.handleOnChangeFile(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSendRemedy}>
                        Send
                    </Button>
                    <Button color="secondary" onClick={CloseRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
