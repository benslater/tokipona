import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Nav from "./components/Nav";
import PageContentLayout from "./components/PageContentLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import LessonMenu from "./pages/LessonsMenu/components/Menu";
import LessonPage from "./pages/LessonPage/LessonPage";
import Dictionary from "./pages/Dictionary/Dictionary";

import { initialiseFirebase } from "./utils/firebaseUtils";
import uiConfig from "./utils/firebaseUiConfig";

import { history } from "./index";

import "./App.css";

const authUi = () => (
  <div className="firebase-auth-ui-wrapper">
    {!!firebase.auth().currentUser && <Redirect to="/" />}
    <StyledFirebaseAuth
      className="firebase-auth-ui"
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  </div>
);

class App extends Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {};

    initialiseFirebase();
  }
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <>
            <Nav />
            <PageContentLayout>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/lessons" component={LessonMenu} />
              <Route path="/lessons/:id" component={LessonPage} />
              <Route path="/dictionary/" component={Dictionary} />
              <Route path="/login/" component={authUi} />
            </PageContentLayout>
          </>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
