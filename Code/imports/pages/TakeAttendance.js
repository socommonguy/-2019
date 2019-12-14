import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Records, Activities } from '../api/collection';
import Dialog from 'material-ui/Dialog';
import { FlatButton } from 'material-ui';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TakeAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successDialog: false,
      repeatDialog: false,
      errorDialog: false,
      dialogMsg: '',
      dialogStatus: false,
      historyStatus: false,
      historyButtonStatus: false,
    }
  }

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push("/signin")
    } else {
      this.takeAttendance();
    }
  }

  takeAttendance() {
      Meteor.call('record.takeAttendance', Meteor.user()._id, this.props.match.params.activityId, this.props.match.params.recordId, (err, result) => {
        console.log(err, result)
        if (err) {
          this.setState({dialogMsg: err.message, dialogStatus: true, historyButtonStatus: false});
        } else {
          this.setState({dialogMsg: '签到成功', dialogStatus: true, historyButtonStatus: true});
        }
      });
  }

  toggleHistoryStatus() {
    this.setState({historyStatus: !this.state.historyStatus});
  }

  renderTableRowColumn() {
    return this.props.records.map((record) => {
      return (
        <TableRow key={record._id} selectable={false}>
          <TableRowColumn style={{textAlign: "center", fontSize: 16}}>{record.title}{this.props.match.params.recordid == record._id && "(本次)"}</TableRowColumn>
          <TableRowColumn style={{textAlign: "center", fontSize: 16}}>
            {
              record.participators.indexOf(Meteor.user()._id) != -1 ? 
              <i className="far fa-check-circle" style={{color: "#1FBCD3"}}></i> 
              : 
              <i className="far fa-times-circle" style={{color: "red"}}></i>
            }
          </TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div>
        {this.state.dialogStatus && 
          <Dialog
            modal={true}
            open={this.state.dialogStatus}
          >
            <div className="col-xs-12 col-sm-12" style={{padding: 0}}>
              <div className="col-xs-12 col-sm-12" style={{padding: 0, textAlign: "center"}}>
                {this.state.dialogMsg}
              </div>
              {this.state.historyButtonStatus && 
                <div className="col-xs-12 col-sm-12" style={{padding: 0, display: "flex", justifyContent: "center"}}>
                  <FlatButton label="签到记录" primary={true} onClick={this.toggleHistoryStatus.bind(this)}/>
                </div>
              }
            </div>
          </Dialog>
        }
        {this.state.historyStatus && 
          <Dialog
            modal={true}
            open={this.state.historyStatus}
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{textAlign: "center", fontSize: 20}}>活动</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: "center", fontSize: 20}}>签到情况</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderTableRowColumn()}
            </TableBody>
          </Dialog>
        }
      </div>
    )
  }
}

export default withRouter(withTracker((props) => {
  Meteor.subscribe('Activity.one', props.match.params.activityId);
  Meteor.subscribe('Record.some', props.match.params.activityId);
  return {
    records: Records.find({}).fetch(),
    activity: Activities.find({}).fetch()[0],
  }
})(TakeAttendance));