import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import QRCode from 'qrcode.react'
import { Records } from '../api/collection';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MemberList from './MemberList';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addOpen: false,
      QROpen: false,
      infoOpen: false
    }
  }

  handleAddOpen = () => {
    this.setState({addOpen: true});
  };

  handleAddClose = () => {
    this.setState({titleError: '', addOpen: false});
  };

  handleQRClose = () => {
    this.setState({QROpen: false});
  };

  handleInfoClose = () => {
    this.setState({infoOpen: false});
  }

  handleRecordClick(record) {
    this.setState({QROpen: true, currentRecord: record});
  }
  
  handleInfoClick(record, e) {
    e.stopPropagation();
    this.setState({infoOpen: true, currentRecord: record})
  }

  handleSubmit(e) {
    e.preventDefault();
    var title = ReactDOM.findDOMNode(this.refs.title).children[1].value;
    if (title != '') {
      try {
        Meteor.call('record.add', title, this.props.activity._id);
      } catch(e) {
        console.log(e)
      }
      this.handleAddClose();
    } else {
      this.setState({titleError: '标题不能为空'});
    }
  }

  renderRecordsList() {
    if (this.props.records.length == 0) {
      return <div>无签到记录</div>
    }
    return this.props.records.map((record) => {
      return (
        <ListItem key={record._id}
          onClick={this.handleRecordClick.bind(this, record)}
          record={record}
          rightIcon={<ActionInfo onClick={this.handleInfoClick.bind(this, record)}/>}
        >
          <div>
            {record.title}
          </div>
          <div>
            {moment(record.date).format("YYYY-MM-DD")}
          </div>
        </ListItem>
      )
    })
  }

  renderParticipators() {
    if (this.state.currentRecord.participators) {
      return this.state.currentRecord.participators.map((participator) => {
        return (<div key={participator}>{participator}</div>)
      });
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{minHeight: 400, maxHeight: 600}}>
        {this.props.records &&
          <div>
            <List>
              {this.renderRecordsList()}
            </List>
            <FloatingActionButton secondary={true} style={{position: "fixed", bottom: 16, right: 16}} onClick={this.handleAddOpen.bind(this)}>
              <ContentAdd />
            </FloatingActionButton>

            <Dialog
              title="新建签到"
              modal={true}
              open={this.state.addOpen}
              onRequestClose={this.handleAddClose}
            >
              <form onSubmit={this.handleSubmit.bind(this)} 
                style={{height: "100%", display: "flex", alignItems: "center"}}>
                <div className="col-sm-12 col-xs-12" style={{padding: 0, overflowX: "hidden"}}>
                  <TextField fullWidth={true} floatingLabelText="标题" type="text" ref="title"
                    errorText={this.state.titleError}
                  /><br />
                  <div className="col-xs-12 col-sm-12" style={{padding: 0, display: "flex", justifyContent: "flex-end", marginTop: 30}}>
                    <FlatButton
                      label="取消"
                      primary={true}
                      onClick={this.handleAddClose.bind(this)}
                    />
                    <FlatButton
                      label="确定"
                      primary={true}
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </Dialog>

            {this.state.currentRecord &&
              <Dialog
                modal={true}
                open={this.state.QROpen}
                onRequestClose={this.handleQRClose}
              >
                  <div className="col-xs-12 col-sm-12" style={{padding: 0}}>
                    <div className="col-xs-12 col-sm-12" style={{textAlign: "center", fontSize: 20, overflow: "wrap", marginBottom: 16}}>{this.state.currentRecord.title + ' - 扫码签到'}</div>
                    <div className="col-xs-12 col-sm-12" style={{displey: "flex", justifyContent: "center"}}>
                      <QRCode size={200} value={"http://192.168.199.202:3000/takeattendance/" + this.props.activity._id + '/' + this.state.currentRecord._id}/>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12" style={{display: "flex", justifyContent: "center"}}>
                    <FlatButton
                      label="关闭"
                      primary={true}
                      onClick={this.handleQRClose.bind(this)}
                    />
                  </div>
              </Dialog>
            }

            {this.state.currentRecord &&
              <Dialog
                modal={false}
                open={this.state.infoOpen}
                onRequestClose={this.handleInfoClose}
              >
                <div className="container-fluid">
                  <div>已签到名单</div>
                  <MemberList memberIds={this.state.currentRecord.participators} />
                </div>
              </Dialog>
            }
          </div>
        }
      </div>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('Record.some', props.activity._id);
  return {
    records: Records.find({}).fetch(),
  }
})(Record);