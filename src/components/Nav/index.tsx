import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import firebase from "firebase";

import Button from "../Button";
import Card from "../Card";

import logo from "../../images/tokipona.png";
import "./styles.css";

export class Nav extends Component<RouteComponentProps> {
  state = { isLoggedIn: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user });
    });
  }

  handleAuthClick = () => {
    const {
      history: { push }
    } = this.props;

    !!firebase.auth().currentUser ? firebase.auth().signOut() : push("/login");
  };

  render() {
    const authText = !!firebase.auth().currentUser ? "Log Out" : "Log In";

    // TODO: eased drop shadow on hover, underline for current page

    return (
      <nav>
        <Card id="nav" hasShadow>
          <Link to="/">
            <img id="logo" src={logo} />
          </Link>
          <ul>
            <li>
              <Link to="/lessons">Lessons</Link>
            </li>
            <li>
              <Link to="/dictionary">Dictionary</Link>
            </li>
            <li>
              <Link to="/glyphs">Glyphs</Link>
            </li>
          </ul>
          <Button className="nav__auth-button" onClick={this.handleAuthClick}>
            {authText}
          </Button>
        </Card>
      </nav>
    );
  }
}

export default withRouter(Nav);
