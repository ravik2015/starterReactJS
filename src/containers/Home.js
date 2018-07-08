import React, { Component } from "react";
import { Link } from "react-router-dom";

import recordImage from "../assets/images/record_interview.png";
import researchImage from "../assets/images/reserch.png";

export default class Home extends Component {
  render() {
    return (
      <div className="main-content">
        <div className="row">
          <div className="offset-sm-1 col-sm-5">
            <div className="card text-center dashboard">
              <div className="card-header">
                <h2>Record an interview</h2>
              </div>

              <div className="card-block">
                <img src={recordImage} alt="Record Interview" />

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry.
                </p>

                <Link to="/records/step_one" className="btn btn-primary">
                  Get Started
                </Link>
              </div>

              <div className="card-footer">
                <a href="">Learn more</a>
              </div>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="card text-center dashboard">
              <div className="card-header">
                <h2>Synthesize my research</h2>
              </div>

              <div className="card-block">
                <img src={researchImage} alt="Research" />

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry.
                </p>
                 <Link to="/google-drive" className="btn btn-primary">Open your Google Drive</Link>                
              </div>

              <div className="card-footer">
                <Link to="">Learn more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
