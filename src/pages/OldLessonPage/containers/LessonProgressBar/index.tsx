import React, { Component } from "react";
import firebase from "firebase";
import debounce from "lodash/debounce";

import LessonProgressBox from "../../components/LessonProgressBox";

import "./styles.css";

interface LessonProgressBarProps {
  currentLessonId: number;
}

interface LessonProgressBarState {
  progressBoxCount: number;
}

export default class LessonProgressBar extends Component<
  LessonProgressBarProps,
  LessonProgressBarState
> {
  state = { progressBoxCount: 8 };

  componentDidMount() {
    // this.generateBoxCount();
    // window.addEventListener("resize", this.generateBoxCount);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.generateBoxCount);
  }

  generateStatus(index: number) {
    if (index < this.props.currentLessonId) {
      return "complete";
    }
    if (index === this.props.currentLessonId) {
      return "current";
    }
    return "incomplete";
  }

  // Class property arrow function to bind scope when used in resize event listener
  generateBoxCount = () => {
    // TODO: Maybe don't store in state, just have component return count.
    // const thisComponent = document.getElementsByClassName(
    //   "lesson-progress-bar"
    // )[0];
    // const progressBoxCount = Math.floor(thisComponent.clientWidth / 70);
    // if (progressBoxCount !== this.state.progressBoxCount)
    //   // Anti-pattern since called in componentDidMount, but needed to get and use width of self
    //   this.setState({ progressBoxCount });
  };

  renderLessonProgressBoxes() {
    // console.log(this.state.progressBoxCount);

    // if (!this.state.progressBoxCount) return;

    const { currentLessonId } = this.props;

    // this.generateBoxCount();

    const range = Math.floor(this.state.progressBoxCount / 2);
    let index = Math.max(currentLessonId - range, 1);
    const max = Math.max(currentLessonId + range, this.state.progressBoxCount);

    const boxes = [];
    for (index; index <= max; index++) {
      boxes.push(
        <LessonProgressBox
          key={`lesson-progress-box-${index}`}
          number={index}
          status={this.generateStatus(index)}
        />
      );
    }

    return boxes;
  }

  render() {
    return (
      <div className="lesson-progress-bar">
        <>{this.renderLessonProgressBoxes()}</>
      </div>
    );
  }
}
