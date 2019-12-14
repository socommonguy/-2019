import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Tabs, Tab } from 'material-ui/Tabs';
import HomePage from './HomePage';
import ActivityPage from './ActivityPage';
import ProfilePage from './ProfilePage';

export default class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    }
  }

  componentWillMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.updateSize.bind(this));
  }

  updateSize() {
      try {
          this.setState({ width: window.innerWidth, height: window.innerHeight});
      } catch (ignore) {
      }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleChildChanged = (slideIndex) => {
    this.setState({slideIndex});
  }

  render() {
    return (
      <div className="container-fluid" style={{padding: 0}}>
        <div style={{height: this.state.height - 48}}>
          {this.state.slideIndex == 0 && <HomePage />}
          {this.state.slideIndex == 1 && <ActivityPage />}
          {this.state.slideIndex == 2 && <ProfilePage callbackParent={this.handleChildChanged}/>}
        </div>

        <Tabs style={{width: "100%", position: "fixed", bottom: 0}} value={this.state.slideIndex} onChange={this.handleChange}>
          <Tab
            icon={<i className="fas fa-home" style={{fontSize: 20}} />}
            // label="主页"
            value={0}
          />
          <Tab
            icon={<i className="fas fa-trophy" style={{fontSize: 20}} />}
            // label="活动"
            value={1}
          />
          <Tab
            icon={<i className="fas fa-user" style={{fontSize: 20}} />}
            // label="个人"
            value={2}
          />
        </Tabs>
      </div>
    );
  }
}