import React, { Component } from "react";
import CircularProgressBar from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "./styles.css";

// TODO: Pull lesson count from sanity, pull complete count from firebase currentUser if signed in, or cookies if not
// TODO: Store in redux, do pull once on app load
const LESSON_COUNT = 12;
const COMPLETE_COUNT = 8;

export class Dashboard extends Component {
  state = { percentage: +((COMPLETE_COUNT / LESSON_COUNT) * 100).toFixed(2) };

  render() {
    const { percentage } = this.state;
    return (
      <div className="dashboard">
        <div className="progress-bar">
          <span className="progress-bar__label">You've learned:</span>
          <div className="progress-bar__container">
            <CircularProgressBar
              percentage={percentage}
              text={`${percentage}%`}
              styles={{
                path: { stroke: "#52b650" },
                text: { fill: "#031196", fontSize: "16px" }
              }}
              initialAnimation
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
