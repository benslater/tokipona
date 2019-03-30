import React, { Component } from "react";

import "./styles.css";

export default class PageContentLayout extends Component {
  render() {
    return (
      <div className="page-content-layout">
        <div className="page-content-layout__children">
          {this.props.children}
        </div>
      </div>
    );
  }
}
