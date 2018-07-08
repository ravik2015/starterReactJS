import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Timer from "../../../node_modules/easytimer.js/dist/easytimer";
import { saveRecord } from "../../actions/records";
import { Icon } from "@material-ui/core/";
import Chip from "@material-ui/core/Chip";
import { CircularProgress } from "@material-ui/core/es/index";
import AlertMsg from "../../components/AlertMsg";

class RecordStep4 extends Component {
  timerInstance = null;

  constructor(props) {
    super(props);
    this.state = {
      recordTimer: `00:00`,
      audioStr: null,
      audioDuration: 0,
      timeStamps: [],
      audioUrl: null,
      recording: false,
      open: false,
      markers: localStorage.chipData ? JSON.parse(localStorage.chipData) : [],
      interviewSave: false
    };
  }

  componentDidMount() {
    this.timerInstance = new Timer();
    const $this = this;

    this.timerInstance.addEventListener("secondsUpdated", e => {
      let timeVal = e.detail.timer
        .getTimeValues()
        .toString()
        .substring(3);
      let totalDuration = e.detail.timer.getTotalTimeValues().seconds;

      this.setState({
        ...this.state,
        ...{ recordTimer: timeVal, audioDuration: totalDuration }
      });
    });
  }

  // componentWillReceiveProps(props) {

  //     if (props.record.success) {
  //         localStorage.removeItem('chipData');
  //         props.history.push(`/docs/${props.record.data._id}`)
  //     }
  // }

  onRecordingChange = () => {
    this.timerInstance.start();
    this.setState({
      ...this.state,
      ...{ recording: !this.state.recording }
    });
  };

  recordingBufferEvent = AudioRecorderChangeEvent => {
    console.log(AudioRecorderChangeEvent);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(AudioRecorderChangeEvent.blob);

    fileReader.onload = () => {
      this.setState({
        ...this.state,
        ...{
          audioStr: fileReader.result,
          audioUrl: AudioRecorderChangeEvent.blobURL
        }
      });
      this.timerInstance.stop();
    };
  };

  addMarker = e => {
    if (e.key === "Enter" && this.refs.marker.value !== "") {
      this.state.markers = this.state.markers.filter(
        r => r.label !== this.refs.marker.value
      );
      this.state.markers.push({ label: this.refs.marker.value });
      this.setState({
        ...this.state,
        ...{ markers: this.state.markers }
      });
      this.onChipClick(this.refs.marker.value)();
      this.refs.marker.value = null;
    }
  };

  onChipClick = value => () => {
    //For adding timestamp with the marker
    if (!this.state.recording) return;

    this.state.timeStamps.push({
      timeConstraint: this.state.recordTimer,
      label: value
    });

    this.setState({
      ...this.state,
      ...{
        timeStamps: this.state.timeStamps
      }
    });
  };

  deleteMarker = data => () => {
    this.state.markers.splice(this.state.markers.indexOf(data), 1);
    this.setState(this.state);
  };

  saveRecord = () => {
    const context = this;
    context.setState({ interviewSave: true });
    this.props.saveRecord(
      {
        _id: this.props.user._id,
        timeStamps: this.state.timeStamps,
        audioStr: this.state.audioStr,
        length: this.state.audioDuration
      },
      res => {
        if (res.status) {
          this.props.history.push(`/docs/${res._id}`);
        } else {
          context.setState({
            open: true,
            msg: res.message,
            msgType: res.type,
            msgStatus: res.status,
            interviewSave: false
          });
        }
      }
    );
  };

  render() {
    const context = this;
    const {
      recordTimer,
      audioStr,
      markers,
      recording,
      audioUrl,
      interviewSave
    } = this.state;

    return (
      <div className="main-content">
        <div className="row record-step4">
          <AlertMsg
            onPress={() => context.setState({ open: false })}
            isShowingModal={this.state.open}
            msg={this.state.msg}
            type={this.state.msgType}
            status={this.state.msgStatus}
          />
          <div className="offset-sm-3 col-sm-6">
            <div className="card text-center single">
              <div className="beta-tag">Beta</div>

              <div className="card-header">
                <label className="step-count">STEP 4 of 4</label>

                <h2>Record your interview</h2>
              </div>

              <div className="card-block">
                <div className="form-group d-flex justify-content-center mt-3">
                  <div className="record-sec">
                    <ReactMic
                      record={recording}
                      className="react-mic-addon"
                      onStop={this.recordingBufferEvent}
                    />
                    {!audioUrl && (
                      <button
                        className={recording ? "on-rec" : "off-rec"}
                        onClick={this.onRecordingChange}
                        type="button"
                      >
                        {!recording && (
                          <span>
                            {" "}
                            <Icon style={{ lineHeight: "18px", fontSize: 15 }}>
                              fiber_manual_record
                            </Icon>{" "}
                            Record{" "}
                          </span>
                        )}
                        {recording && (
                          <span>
                            {" "}
                            <Icon style={{ lineHeight: "25px", fontSize: 18 }}>
                              stop
                            </Icon>{" "}
                            Stop{" "}
                          </span>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="timer">{recordTimer}</div>
                </div>

                <div className="input-group mt-4">
                  <label>Add a new marker</label>

                  <input
                    ref="marker"
                    className="form-control"
                    onKeyPress={this.addMarker}
                    placeholder="Enter text to add a new marker"
                  />

                  <span>
                    <i className="material-icons">add</i>
                  </span>
                </div>

                <div className="chip-sec">
                  {markers.map(data => {
                    return (
                      <Chip
                        label={data.label}
                        onDelete={this.deleteMarker(data)}
                        onClick={this.onChipClick(data.label)}
                        className="chip"
                      />
                    );
                  })}
                </div>
              </div>

              <button
                disabled={interviewSave}
                onClick={this.saveRecord}
                className="btn btn-primary"
              >
                {interviewSave ? (
                  <CircularProgress size={15} color={"white"} />
                ) : (
                  `Save my interview`
                )}
              </button>

              <div className="card-footer">
                <a href="">Skip this step</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecordStep4.propTypes = {
  user: PropTypes.object.isRequired,
  saveRecord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  saveRecord: bindActionCreators(saveRecord, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordStep4);
