import React, { Component } from "react";

import Card from "../../../../components/Card";
import Link from "../../../../components/Link";

import "./styles.css";

export default class LessonMenu extends Component {
  // TODO: This needs to take an array of titles as props
  render() {
    return (
      <>
        <h1 id="lesson-menu-heading">Lessons</h1>
        <Card className="lesson-menu" hasShadow>
          <ul className="lesson-menu__list">
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
            <li>
              <Link className="lesson-menu__link" to="/lessons/1">
                <Card className="lesson-menu__item" hoverable>
                  Lesson 1
                </Card>
              </Link>
            </li>
          </ul>
        </Card>
      </>
    );
  }
}
