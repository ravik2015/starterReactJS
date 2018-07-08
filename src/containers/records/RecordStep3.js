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
      <div className="row record-step3">
        <div className="offset-sm-3 col-sm-6">
          <div className="card text-center single">
            <div className="beta-tag">Beta</div>

            <div className="card-header">
              <label className="step-count">STEP 3 of 4</label>

              <h2>Almost there!</h2>
            </div>

            <div className="card-block">
              <p>
                In the next step you'll begin recording your interview. Here is
                a quick overview of everything your need to know.
              </p>

              <ol>
                <li>Click Record to begin recording.</li>

                <li>
                  Click the markers to tag important moments when they happen
                  throughout your interview.
                </li>
                <li>
                  Remove markers you don't need or add new ones as you go.
                </li>
                <li>Don't forget to click once you're finished.</li>
                <li>If you are recording a call, keep it on your speaker.</li>
              </ol>

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
                onClick={() => this.props.history.push("/records/step_four")}
                className="btn btn-primary"
              >
                Got it! I'm ready to begin
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
    this.setState(this.state);
  };
}
