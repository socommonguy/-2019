import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Image } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    var userName = ReactDOM.findDOMNode(this.refs.userName).children[1].value,
        password = ReactDOM.findDOMNode(this.refs.password).children[1].value;

    var handleSignin = (err) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log('登录成功');
        this.props.history.goBack();
      }
    }

    try {
      Meteor.loginWithPassword(userName, password, handleSignin.bind(this));
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <form className="col-sm-12 col-xs-12" onSubmit={this.handleSubmit.bind(this)} 
        style={{paddingLeft: 15, paddingRight: 15, height: "100%", display: "flex", alignItems: "center"}}>
        <div className="col-sm-12 col-xs-12">
          <Image src="images/logo.png" responsive style={{marginBottom: 15, padding: 15}}/>
          <TextField fullWidth={true} floatingLabelText="用户名" type="text" ref="userName"
            errorText={this.state.userNameError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="密码" type="password" ref="password"
            errorText={this.state.passwordError} 
          /><br />
          <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center", marginTop: 30}}>
            <RaisedButton label="登录" primary={true} type="submit" style={{backgroundColor: "#1fbcd3"}}/>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Signin);