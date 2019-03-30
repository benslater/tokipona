import React, { Component } from "react";

import Menu from "./components/Menu";

export default class LessonsMenu extends Component {
  // TODO: on componentDidMount get list of titles available lessons from sanity
  // (Can sanity do that? Filtered query of all items to just pull title? Saves bandwidth
  // compared to pulling all lessons on mount)
  render() {
    return <Menu />;
  }
}
