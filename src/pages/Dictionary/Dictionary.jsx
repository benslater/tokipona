import React, { Component } from "react";
// TODO: Use Fuse for fuzzy-searching
// import Fuse from 'fuse.js';

import Card from "../../components/Card";
import Input from "../../components/Input";

import "./styles.css";

export default class Dictionary extends Component {
  render() {
    return (
      <div>
        <div className="search-container">
          <Input placeholder="Search for a word..." icon="search" />
        </div>
        <ul className="dictionary">
          <li>
            {/* TODO: Componentise this. <DictionaryCard title={entry.title} type={entry.type}>{children}</DictionaryCard> */}
            <Card className="dictionary-entry" hasShadow>
              <div className="dictionary-entry__heading">
                <h3>ala</h3>
                <span>ADJECTIVE</span>
              </div>
              <div className="dictionary-entry__body">
                <p>no, not, zero</p>
              </div>
            </Card>
          </li>
          <li>
            <Card className="dictionary-entry" hasShadow>
              <div className="dictionary-entry__heading">
                <h3>li</h3>
                <span>PARTICLE</span>
              </div>
              <div className="dictionary-entry__body">
                <p>
                  (between any subject except mi alone or sina alone and its
                  VERB ; also to introduce a new VERB for the same subject)
                </p>
              </div>
            </Card>
          </li>
          <li>
            <Card className="dictionary-entry" hasShadow>
              <div className="dictionary-entry__heading">
                <h3>jelo</h3>
                <span>ADJECTIVE</span>
              </div>
              <div className="dictionary-entry__body">
                <p>yellow, yellowish</p>
              </div>
            </Card>
          </li>
        </ul>
      </div>
    );
  }
}
