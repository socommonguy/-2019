import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { RaisedButton, Avatar } from 'material-ui';

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1}}/>
)

const ThickDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 10}}/>
)

class ProfileDetail extends Component {

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    }
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

  render() {
    return (
      <div className="container-fluid" style={{padding: 0, height: this.state.height, backgroundColor: "#E2E2E2"}}>
        <div className="col-xs-12 col-sm-12" style={{padding: 0}}>
          <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", paddingTop: 8, paddingBottom: 8}}>
            <div style={{fontSize: 16}}>头像</div>
            <Avatar src="images/federer.png" size={70}/>
            <i className="fas fa-chevron-right"></i>
          </div>
          <ThinDivider />
          <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", paddingTop: 8, paddingBottom: 8}}>
            <div style={{fontSize: 16}}>用户名</div>
            <div style={{fontSize: 20}}>{Meteor.user().username}</div>
            <i className="fas fa-chevron-right"></i>
          </div>
          <ThinDivider />
          <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", paddingTop: 8, paddingBottom: 8}}>
            <div style={{fontSize: 16}}>学号</div>
            <div style={{fontSize: 20}}>{Meteor.user().profile.studentId}</div>
            <i className="fas fa-chevron-right"></i>
          </div>
          <ThickDivider />
          <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", paddingTop: 8, paddingBottom: 8}}>
            <div style={{fontSize: 16}}>邮箱</div>
            <div style={{fontSize: 20}}>{Meteor.user().emails[0].address}</div>
            <i className="fas fa-chevron-right"></i>
          </div>
          <ThinDivider />
          <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", paddingTop: 8, paddingBottom: 8}}>
            <div style={{fontSize: 16}}>电话</div>
            <div style={{fontSize: 20}}>{Meteor.user().profile.phone}</div>
            <i className="fas fa-chevron-right"></i>
          </div>
          <ThinDivider />
        </div>
        <div className="col-xs-12 col-sm-12" style={{position: "fixed", padding: 4, bottom: 0}}>
          <RaisedButton label="退出账号" 
            labelColor="white" 
            buttonStyle={{backgroundColor: "red"}} 
            style={{width: "100%"}} 
            onClick={()=>{Meteor.logout(); this.props.history.push("/")}}/>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileDetail);