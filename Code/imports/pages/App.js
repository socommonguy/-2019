import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SigninPage from './SigninPage';
import Container from './Container';
import ActivityDetail from './ActivityDetail';
import ActivityEdit from './ActivityEdit';
import TakeAttendance from './TakeAttendance';
import ProfilDetail from './ProfileDetail';
import VConsole from 'vconsole';

export default class App extends Component {
  initVConsole() {
    vConsole = new VConsole();
  }
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <Switch>
            <Route path="/signin" component={SigninPage}/>
            <Route path="/activityedit/:id" component={ActivityEdit}/>
            <Route path="/activity/:id" component={ActivityDetail}/>
            <Route path="/takeattendance/:activityId/:recordId" component={TakeAttendance} />
            <Route path="/profiledetail" component={ProfilDetail} />
            <Route path="/" component={Container} />
          </Switch>
          {/* {this.initVConsole()} */}
        </MuiThemeProvider>
      </Router>
    );
  }
}