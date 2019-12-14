import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
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

  render() {
    return (
      <div className="container-fluid" style={{padding: 0}}>
        <div className="container-fluid" style={{padding: 0, height: this.state.height - 48}}>
          {this.state.slideIndex == 0 && <Signin />}
          {this.state.slideIndex == 1 && <Signup />}
        </div>

        <Tabs
          className="col-sm-12 col-xs-12"
          value={this.state.slideIndex}
          onChange={this.handleChange}
          style={{position: "fixed", bottom: 0, padding: 0}}
        >
          <Tab label="登录" value={0} />
          <Tab label="注册" value={1} />
        </Tabs>
      </div>
    )
  }
}