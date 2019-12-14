import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    var userName = ReactDOM.findDOMNode(this.refs.userName).children[1].value,
        password = ReactDOM.findDOMNode(this.refs.password).children[1].value,
        email = ReactDOM.findDOMNode(this.refs.email).children[1].value;
    var profile = {
      studentId: ReactDOM.findDOMNode(this.refs.studentId).children[1].value,
      phone: ReactDOM.findDOMNode(this.refs.phone).children[1].value,
      permission: 3,
    }

    var handleSignup = (err) => {
      if (err) {
        console.log(err.reason);
      } else {
        console.log('注册成功');
        this.setState({redirect: true});
      }
    }

    if (this.noError()) {
      try {
        Accounts.createUser({username: userName, password: password, email: email, profile: profile}, handleSignup.bind(this))
      } catch(e) {
        console.log(e);
      }
    } else {
      console.log('信息有误');
    }
  }

  noError() {
    if (this.state.userNameError == '' &&
        this.state.passwordError == '' &&
        this.state.confirmPwdError == '' &&
        this.state.studentIdError == '' &&
        this.state.phoneError == '' &&
        this.state.emailError == '')
      return true;
    return false;
  }

  clearInput() {
    ReactDOM.findDOMNode(this.refs.userName).children[1].value = '';
    ReactDOM.findDOMNode(this.refs.password).children[1].value = '';
    ReactDOM.findDOMNode(this.refs.confirmPwd).children[1].value = '';
    ReactDOM.findDOMNode(this.refs.email).children[1].value = '';
    ReactDOM.findDOMNode(this.refs.studentId).children[1].value = '';
    ReactDOM.findDOMNode(this.refs.phone).children[1].value = '';
    this.setState({
      userNameError: '',
      passwordError: '',
      confirmPwdError: '',
      studentIdError: '',
      phoneError: '',
      emailError: '',
    })
  }

  checkUserNameValidation() {
    if (!/[a-zA-Z0-9_]{5,20}/.test(ReactDOM.findDOMNode(this.refs.userName).children[1].value)) {
      this.setState({userNameError: '用户名只能包含5-20位字母、数字、下划线'})
    } else {
      this.setState({userNameError: ''})
    }
  }

  checkPasswordValidation() {
    if (ReactDOM.findDOMNode(this.refs.password).children[1].value.length < 6) {
      this.setState({passwordError: '密码长度不可少于6位'})
    } else {
      this.setState({passwordError: ''})
    }
  }

  checkConfirmPwdValidation() {
    if (ReactDOM.findDOMNode(this.refs.password).children[1].value != ReactDOM.findDOMNode(this.refs.confirmPwd).children[1].value) {
      this.setState({confirmPwdError: '两次密码不一致'})
    } else {
      this.setState({confirmPwdError: ''})
    }
  }

  checkStudentIdValidation() {
    if (!/[1-9][0-9]{7}/.test(ReactDOM.findDOMNode(this.refs.studentId).children[1].value)) {
      this.setState({studentIdError: '请输入正确学号'})
    } else {
      this.setState({studentIdError: ''})
    }
  }

  checkPhoneValidation() {
    if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(ReactDOM.findDOMNode(this.refs.phone).children[1].value)) {
      this.setState({phoneError: '请输入正确手机号'})
    } else {
      this.setState({phoneError: ''})
    }
  }

  checkEmailValidation() {
    if (!/([a-zA-Z0-9_])+@([a-zA-Z0-9_-])+(\.[a-zA-Z])+/.test(ReactDOM.findDOMNode(this.refs.email).children[1].value)) {
      this.setState({emailError: '请输入正确邮箱'})
    } else {
      this.setState({emailError: ''})
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />
    }
    return (
      <form className="col-sm-12 col-xs-12" onSubmit={this.handleSubmit.bind(this)} 
        style={{paddingLeft: 15, paddingRight: 15, height: "100%", display: "flex", alignItems: "center"}}>
        <div className="col-sm-12 col-xs-12">
          <TextField fullWidth={true} floatingLabelText="用户名" type="text" ref="userName" 
            onBlur={this.checkUserNameValidation.bind(this)}
            errorText={this.state.userNameError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="密码" type="password" ref="password"
            onBlur={this.checkPasswordValidation.bind(this)}
            errorText={this.state.passwordError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="确认密码" type="password" ref="confirmPwd" 
            onBlur={this.checkConfirmPwdValidation.bind(this)}
            errorText={this.state.confirmPwdError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="学号" type="number" ref="studentId" 
            onBlur={this.checkStudentIdValidation.bind(this)}
            errorText={this.state.studentIdError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="手机" type="number" ref="phone" 
            onBlur={this.checkPhoneValidation.bind(this)}
            errorText={this.state.phoneError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="邮箱" type="text" ref="email" 
            onBlur={this.checkEmailValidation.bind(this)}
            errorText={this.state.emailError} 
          /><br />
          <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center", marginTop: 30, marginBottom: 30}}>
            <RaisedButton label="注册" primary={true} type="submit" style={{marginRight: 30, backgroundColor: "#1fbcd3"}}/>
            <RaisedButton label="清空" default={true} onClick={this.clearInput.bind(this)}/>
          </div>
        </div>
      </form>
    )
  }
}