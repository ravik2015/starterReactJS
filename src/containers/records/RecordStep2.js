import React, { Component } from "react";
import { Link } from "react-router-dom";

// ui dependencies
import Checkbox from "@material-ui/core/Checkbox";

export default class Step2 extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      permissions: { checkOne: true, checkTwo: false }
    };
  }

  render() {
    return (
      <div className="row record-step2">
        <div className="offset-sm-3 col-sm-6">
          <div className="card text-center single">
            <div className="beta-tag">Beta</div>

            <div className="card-header">
              <label className="step-count">STEP 2 of 4</label>

              <h2>Remember to ask for permission</h2>
            </div>

            <div className="card-block">
              <p>
                You are required to ask your interviewee for permission to
                record in order to use Beacon. Here are some examples of how to
                ask for consent:
              </p>

              <ol>
                <li>"We would like to record this interview. is that okay?"</li>

                <li>
                  "We are taking in a lot of new information today. Would it be
                  okay to record the interview for notemaking purposes?"
                </li>
              </ol>

              <div className="form-check text-left d-flex">
                <Checkbox
                  onChange={this.changePermission("checkOne")}
                  id="check1"
                  checked={this.state.permissions.checkOne}
                  color="primary"
                />

                <label className="form-check-label" for="check1">
                  {" "}
                  Check here to indicate that you will ask participants for
                  permission to record the conversation. US federal law
                  prohibits recording a conversation without consent.{" "}
                </label>
              </div>

              <div className="form-check text-left">
                <Checkbox
                  onChange={this.changePermission("checkTwo")}
                  id="check2"
                  checked={this.state.permissions.checkTwo}
                  color="primary"
                />

                <label className="form-check-label" for="check2">
                  {" "}
                  Do not show this message again{" "}
                </label>
              </div>

              <button
                onClick={() => this.props.history.push("/records/step_three")}
                disabled={
                  !this.state.permissions.checkOne ||
                  !this.state.permissions.checkTwo
                }
                className="btn btn-primary"
              >
                I will ask for permission to record
              </button>
            </div>

            <div className="card-footer">
              <Link to="/records/step_four"> Skip this step </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  changePermission = name => event => {
    this.state.permissions[name] = event.target.checked;
    this.setState({...this.state});
  };
}
