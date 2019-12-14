import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities, Records } from '../api/collection';
import Paper from 'material-ui/Paper';

class RecordBlock extends Component {

  renderRecordRow() {
    return this.props.records.map((record) => {
      return (
        <div className="col-xs-12 col-sm-12" style={{padding: 4}}>
          <div className="col-xs-6 col-sm-6" style={{textAlign: "center", fontSize: 16, borderRight: "1px solid #E2E2E2"}}>{record.title}</div>
          <div className="col-xs-6 col-sm-6" style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20}}>
            {
              record.participators.indexOf(Meteor.user()._id) != -1 ? 
              <i className="far fa-check-circle" style={{color: "#1FBCD3"}}></i> 
              : 
              <i className="far fa-times-circle" style={{color: "red"}}></i>
            }
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <Paper className="container-fluid" zDepth={2} style={{padding: 0, marginTop: 10, borderRadius: 4}}>
        <div className="col-xs-12 col-sm-12" style={{padding: 10, display: "flex", justifyContent: "center"}}><div style={{fontSize: 20, borderBottom: "2px solid #1FBCD3", padding: "0 4px"}}>{this.props.activity && this.props.activity.title}</div></div>
        <div className="col-xs-12 col-sm-12">
          <div className="col-xs-6 col-sm-6" style={{textAlign: "center", fontSize: 20, borderBottom: "1px solid #E2E2E2", color: "#757575"}}>签到</div>
          <div className="col-xs-6 col-sm-6" style={{textAlign: "center", fontSize: 20, borderBottom: "1px solid #E2E2E2", color: "#757575"}}>状态</div>
        </div>
        {this.renderRecordRow()}
      </Paper>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('Activity.one', props.activityId);
  Meteor.subscribe('Record.some', props.activityId);
  return {
    records: Records.find({activity: props.activityId}).fetch(),
    activity: Activities.find({_id: props.activityId}).fetch()[0],
  }
})(RecordBlock);