import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { createNewClinicService } from "../../../services/userService";
import "./ManageClinic.scss"; // Assuming you have a CSS file for styling
import { Map, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
// Fix icon marker mặc định cho leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameEn: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
            address: "",
            lat: 12.9715987,
            lng: 117.5946651,
        };
    }
    // thực hiện một lần
    componentDidMount = async () => {};

    // thực hiện mỗi khi props hoặc state thay đổi
    componentDidUpdate = async (prevProps, prevState, snapshot) => {};
    handleOnchangeImg = async (event) => {
        let data = event.target.files; // lấy ra file ảnh
        let file = data[0]; // lấy ra file đầu tiên
        let objectUrl = URL.createObjectURL(file); // tạo ra đường dẫn tạm thời
        if (file) {
            let base64 = await CommonUtils.toBase64(file); // chuyển đổi file sang base64
            this.setState({
                imageBase64: base64, // cập nhật state với base64 của ảnh
            });
        }
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnChangeInput = (event, id) => {
        let value = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = value;
        this.setState({
            ...stateCopy,
        });
    };
    handleSaveNewClinic = async () => {
        let res = await createNewClinicService({
            name: this.state.name,
            nameEn: this.state.nameEn,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            address: this.state.address,
        });
        console.log("check res: ", res);
        if(res && res.errCode === 0) {
            toast.success("Create new clinic succeed!");
            this.setState({
                name: "",
                nameEn: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                address: "",
                lat: res.clinic.lat,
                lng: res.clinic.lng,
            });
        } else {
            toast.error("Create new clinic failed!")
        }
    };
    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Cở sở y tế nổi bật</div>
                <div className="add-new-specialty row">
                    <div className="col-4 form-group">
                        <label>Tên cơ sở y tế</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }></input>
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên cơ sở y tế bằng tiếng anh</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.nameEn}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "nameEn")
                            }></input>
                    </div>
                    <div className="col-4 form-group">
                        <label>Ảnh cơ sở y tế</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(event) =>
                                this.handleOnchangeImg(event)
                            }></input>
                    </div>

                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.address}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "address")
                            }
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    <div className="col-12 mt-4">
                        <MdEditor
                            style={{ height: "350px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn-save-specialty"
                            onClick={() => this.handleSaveNewClinic()}>
                            Save
                        </button>
                    </div>

                    <div className="col-12 mb-3">
                        <Map
                            center={[this.state.lat, this.state.lng]}
                            zoom={15}
                            style={{ height: "350px", width: "80%" }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[this.state.lat, this.state.lng]}
                            />
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewSpecialty: (data) =>
            dispatch(actions.createNewSpecialty(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
