import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import RecordBlock from '../components/RecordBlock';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1, backgroundColor: "#E2E2E2"}}/>
)

class ProfilePage extends Component {
  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    }
  }

  renderRecords() {
    return Meteor.user().activities.map((activity) => {
      return (
        <div key={activity}>
          <RecordBlock activityId={activity} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid" style={{padding: 15}}>
        {Meteor.user() &&
          <div className="container-fluid" style={{padding: 0}}>
            <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center", zIndex: 5}}><Avatar src={Meteor.user().profile.avatar} style={{width: 80, height: 80}}/></div>
            <Paper className="col-sm-12 col-xs-12" zDepth={2} style={{borderRadius: 4, paddingTop: 24, paddingBottom: 0, position: "relative", top: -40}}>
              <div className="col-sm-12 col-xs-12" style={{textAlign: "center", fontSize: 30, marginTop: 12}}>{Meteor.user().username}</div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{padding: 0, marginTop: 10, marginBottom: 10}}>
                <div className="col-xs-4 col-sm-4" style={{padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的活动</div>
                </div>
                <div className="col-xs-4 col-sm-4" style={{borderLeft: "1px solid #E2E2E2", borderRight: "1px solid #E2E2E2", padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的活动</div>
                </div>
                <div className="col-xs-4 col-sm-4" style={{padding: 0}}>
                  <div className="col-xs-12 col-sm-12" style={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>0</div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>我的收藏</div>
                </div>
              </div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{padding: 0, display: "flex", justifyContent: "center", fontSize: 16}}>
                <FlatButton  primary={true} label="个人设置" onClick={()=>{this.props.history.push('/profiledetail')}}/>
              </div>
            </Paper>

            <div className="col-sm-12 col-xs-12" style={{marginTop: -30, padding: 0}}>
              <div style={{fontSize: 24}}>签到情况</div>
            </div>

            <div className="col-sm-12 col-xs-12" style={{padding: 0, paddingBottom: 48}}>
              {Meteor.user().activities ? 
                this.renderRecords()
                :
                <Paper zDepth={2} style={{borderRadius: 4, display: "flex", justifyContent: "center", padding: 10}}>
                  <div style={{fontSize: 20}}>无签到记录</div>
                </Paper>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(withTracker(() => {
  Meteor.subscribe('Users.one');
  return {}
})(ProfilePage));