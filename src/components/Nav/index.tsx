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
    const user = firebase.auth().currentUser;
    const userName = user && user.displayName;
    const authButtonText = !!user ? "Log Out" : "Log In";
    const authGreeting = userName ? <span>Hello, {userName}!</span> : null;

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
          <div className="nav__auth">
            {authGreeting}
            <Button className="nav__auth-button" onClick={this.handleAuthClick}>
              {authButtonText}
            </Button>
          </div>
        </Card>
      </nav>
    );
  }
}

export default withRouter(Nav);
