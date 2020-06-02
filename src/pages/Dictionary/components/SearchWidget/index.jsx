import React, { Component } from "react";

import "./styles.css";

export default class SearchWidget extends Component {
  render() {
    return (
      <div className="search-widget">
        <i className="material-icons search-widget__icon">search</i>
        <input
          className="search-widget__input"
          placeholder="Search for a word..."
        />
      </div>
    );
  }
}
