import React, {Component} from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "underscore";
import Loader from "../../components/ProcessingLoader";
import {environment as env} from "../../config/environment";
import { updateRecord } from "../../actions/records";
import "../_styles/docs.css";

class Docs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: {
                markers: []
            },
            playing:false,
            percent:"0",
            sec:0,
            isPaused: 1,
            duration: 0,
            titleEdit: false,
            title:"",
            tagEdit: null,
            tagValue: '',
            audioLoaded: false,
            loaderStatus: false
        };
        
    }


    componentWillMount() {
       const { records, match } = this.props, 
       record = _.findWhere(records, {_id: match.params._id}); 
       let last = 0;

            this.state.record = record;
            this.state.duration = record ? record.media_length : 0;
            this.state.title = record ? record.title : '';

            this.state.listItems = record ? record.markers.map((number,index) => {

                    let timeArr = number.timeConstraint.split(':');
                    let secs = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
                    let prog = (secs/record.media_length)*100;

                    if(index > 0){
                        let lastTimeArr = record.markers[index-1].timeConstraint.split(":");
                        let lastSecs=(lastTimeArr[0]*60)+lastTimeArr[1];
                        let lastProg=(lastSecs/record.media_length)*100;
                        prog=prog-lastProg;
                    }

                    return <span className='bubble' style={{marginLeft: prog+"%"}} onClick={this.skipPlay(secs)}> </span>;
                }
            ) : [];
            this.setState(...this.state);
    }


    handleError = (error) => {
        throw (error.message)
    };

    playPauseSong = () => {
        if(this.state.playing){
            document.getElementById("audio").pause();
            clearInterval(this.state.interval);
            this.state.interval=0;
            this.state.isPaused=1;
            this.setState({...this.state});
        }else{
            this.state.isPaused=0;
            if(this.state.percent>=100){
                this.state.percent=0;
                this.state.sec=0;
                this.state.isPaused=0;
                this.setState({...this.state});
            }
            document.getElementById("audio").play();
            this.progressUpdate();
        }
        this.state.playing=!this.state.playing;
        this.setState({...this.state});

    }

    endProgress = () => { 
        clearInterval(this.state.interval);
        this.state.sec=0;
        this.state.interval=0;
        this.state.percent=100;
        this.state.playing=0;
        this.state.isPaused=1;
        this.setState({...this.state});
    }

    progressUpdate = () => {
        let length = this.state.record.media_length;
        this.state.interval = setInterval(this.updateProgress,1000);
        this.setState({...this.state});
    }

    updateProgress = () => {
        if(!this.state.isPaused){
            this.state.sec+=1;
            this.state.percent=((this.state.sec/this.state.record.media_length)*100);
            this.setState({...this.state});
            if(this.state.percent === 100){
                this.endProgress();
            }
        }
    };

    skipPlay = data => () => {


        this.state.sec = data-1;
        this.state.percent=((this.state.sec/this.state.record.media_length)*100);
        document.getElementById("audio").currentTime = data;
        document.getElementById("audio").play();
        this.setState({...this.state});

        if(this.state.isPaused) {
            this.state.sec=data;
            this.state.isPaused = 0;
            this.setState({...this.state});
            this.progressUpdate();
        }
    }

    /************ Edit records title ***********/
    editTitle() {
       this.setState({loaderStatus: true}); 
       const title = document.getElementById("title").innerHTML,
       {records, match, updateRecord} = this.props,
       recordObj = _.findWhere(records, {_id: match.params._id}),
       record = {
            _id: match.params._id,
            title,
            timeStamps : recordObj.markers
        }; 
       updateRecord(record, res =>  {
        if(res){
            this.setState({loaderStatus: false}); 
            this.setState({titleEdit: false})
        }
       });
    }
    /********** Edit tag values *********/
    editTag(index){
        this.setState({loaderStatus: true}); 
        const tagValue = document.getElementById(index).innerHTML,
        {records, match, updateRecord} = this.props,
        recordObj = _.findWhere(records, {_id: match.params._id});
        recordObj.markers[index].label = tagValue; 
        const record = {
            _id: match.params._id,
            title: recordObj.title,
            timeStamps : recordObj.markers
        } 
        updateRecord(record, res =>  {
            if(res){
            this.setState({loaderStatus: false}); 
            this.setState({tagEdit: null})
        }
     });
    }

    tagEdit(index, value){
        this.setState({tagEdit: index, tagValue: value})
    }

    audioLoaded = () => {
        this.setState({audioLoaded: true})
    }

    createMarkup(value){
        return { __html: value.replace(/\n/g, '<br />')};
    }

    render() {

        const {record, percent, sec, listItems, duration, isPaused, titleEdit, title, tagEdit, tagValue, audioLoaded} = this.state;

        const totalDurationMin = (Math.trunc(duration / 60));
        const totalDurationSec = (duration % 60);
        const compDurationMin = (Math.trunc(sec / 60));
        const compDurationSec = (sec % 60);

        const totalAudioDuration = `${(totalDurationMin < 9) ? '0' + totalDurationMin : totalDurationMin}:${(totalDurationSec < 9) ? '0' + totalDurationSec : totalDurationSec}`;
        const completedAudioDuration = `${(compDurationMin < 9) ? '0' + compDurationMin : compDurationMin}:${(compDurationSec < 9) ? '0' + compDurationSec : compDurationSec}`;
        
        let TITLE_ICONS = titleEdit ? 
            [<i className="material-icons" onClick={() => this.editTitle() }>save</i>,
            <i className="material-icons" onClick={()=> this.setState({titleEdit: false, title}) }>cancel</i>] : "";
          
        return (

            <div className="main-content">

                <div className="row">
                    <Loader isShowingLoader={this.state.loaderStatus} />
                    <div className="col-sm-7 sidearea player-div">

                        <div className="back">

                            <Link to="/docs"><i className="fa fa-angle-left"> </i></Link>

                        </div>

                        <div className="player">

                            <div style={{float: "left"}} className="play-icons">
                                <i className="fa fa-step-backward" aria-hidden="true"> </i>
                                <i onClick={this.playPauseSong} className={`fa fa-${isPaused ? 'play' : 'pause'} active`} aria-hidden="true"> </i>
                                <i className="fa fa-step-forward" aria-hidden="true"> </i>
                            </div>

                            <audio onLoadedData={this.audioLoaded} id="audio" onEnded={this.endProgress} src={record ? `${ env.API_ROOT + record.blob_str}` : ''} style={{display: "none"}}>

                                <source type="audio/webm"/>

                                Your Browser does not support this HTML Tag

                            </audio>

                            <div style={{width: "calc(100% - 160px)", marginLeft: "103px", lineHeight: 0, marginTop: "13px"}}>{listItems}</div>

                            <div className="progressBar">

                                <div className="progress" style={{width: `${percent}%`}}> </div>

                                <small> {completedAudioDuration}/{totalAudioDuration} </small>


                            </div>

                            <a href={record ? `${ env.API_ROOT + record.blob_str}` : ''} download className="download-icon">

                                <i className="fa fa-download" aria-hidden="true"> </i>

                            </a>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-sm-7 sidearea">

                        <div className="docs-wrapper">
                            {
                                
                                record ? 
                                [
                                    <h1 
                                        contentEditable={`${titleEdit}`} 
                                        id="title" 
                                        onClick={()=> this.setState({titleEdit: true}) } 
                                        dangerouslySetInnerHTML={this.createMarkup(title)}
                                    >                                                                
                                    </h1>, <span style={{marginLeft:15}}>
                                    {TITLE_ICONS}                                    
                                    </span>
                                ]
                                : 
                                <h1>Record not found!</h1>
                            }
                            

                            <a href="" className="dropToggle"><i className="fa fa-ellipsis-h"> </i></a>

                            <div className="timers">

                                {
                                    record &&
                                    record.markers.map((value, index) => {
                                        return (
                                            <div className="timeline" key={index}>
                                                <span>{value.timeConstraint}</span>
                                                <span style={{marginLeft:50}}>
                                                <p 
                                                    id={index} 
                                                    contentEditable={tagEdit === index ? "true" : "false"} 
                                                    onClick={()=> this.tagEdit(index, value.label) }                                                    
                                                > <span dangerouslySetInnerHTML={this.createMarkup(value.label)}></span> </p>
                                                </span>
                                                <span>
                                                {
                                                tagEdit === index ? [<i className="material-icons" onClick={() => this.editTag(index) }>save</i>,
                                                <i className="material-icons" onClick={()=> this.setState({tagEdit: false}) }>cancel</i>] :''
                                                }                                               

                                                </span>
                                                
                                                
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>

                    <div className="col-sm-3">

                        <div className="quicktip greenbg">

                            <a href="" className="close">x</a>

                            <h4>Quick tips:</h4>

                            <ul>

                                <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>

                                <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp</li>

                            </ul>

                        </div>

                        <div className="quicktip">

                            <a href="" className="close">x</a>

                            <h4>Quick tips:</h4>

                            <ul>

                                <li>-Ctrl+I adds italic formatting and Ctrl+B adds bold formatting</li>

                                <li>-Press ESC to play/pause, and Ctrl+j to insert the current timestamp</li>

                            </ul>

                        </div>

                    </div>

                    <div className="col-sm-2 sharebox">

                        <ul>

                            <li>History <span> <i className=""> </i> </span></li>

                            <li> Save to Google Drive

                                <span>
                                </span>

                            </li>

                            <li>Quick tips <span> <i className=""> </i> </span></li>

                        </ul>

                    </div>

                </div>

            </div>

        );
    }   
}

Docs.propTypes = {
    records: PropTypes.array.isRequired,
    updateRecord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  records: state.records    
});

const mapDispatchToProps = dispatch => ({
  updateRecord: bindActionCreators(updateRecord, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Docs);