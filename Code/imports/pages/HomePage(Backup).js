import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Activities } from '../api/collection';
import Gallery from '../components/Gallery';
import ActivitiesContainer from '../components/ActivitiesContainer';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'hot',
      displayMode: 'card',
      addDialogStatus: false,
      titleError: '',
      locationError: '',
      capacityError: '',
      attendanceError: '',
      title: '',
      location: '', 
      capacity: '',
      attendance: null,
      start: null,
      end: null,
      submitResult: '',
      resultStatus: false,
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

  handleSubmit(e) {
    e.preventDefault();
    this.checkAllValidation();
    if (!(this.state.validationMsg == '' || this.state.validationMsg == undefined)) {
      return;
    }
    var title = this.state.title,
        location = this.state.location,
        capacity = this.state.capacity,
        attendance = this.state.attendance,
        startDate = this.state.start,
        endDate = this.state.end;
    var that = this;
    var addCallBack = function(err, res) {
      if (err) {
        console.log(err)
        that.setState({submitResult: err});
      } else {
        that.setState({submitResult: '活动添加成功'});
      }
      that.setState({addDialogStatus: false, resultStatus: true});
    };
    Meteor.call('activity.add', title, location, capacity, attendance, startDate, endDate, addCallBack)
  }

  handleAttendanceChange(event, index, attendance) {
    this.setState({attendance});
  }

  handleAddClose() {
    this.setState({addDialogStatus: false, title: '', location: '', capacity: '', attendance: null, start: null, end: null});
  }

  handleAddOpen() {
    this.setState({addDialogStatus: true});
  }

  checkTitleValidation() {
    if (ReactDOM.findDOMNode(this.refs.title).children[1].value.length < 2) {
      this.setState({titleError: '活动名称不得少于两个或以上字符'});
    } else {
      this.setState({titleError: ''});
    }
  }

  checkLocationValidation() {
    if (ReactDOM.findDOMNode(this.refs.location).children[1].value.length < 4) {
      this.setState({locationError: '活动地点不得少于四个或以上字符'});
    } else {
      this.setState({locationError: ''});
    }
  }

  checkCapacityValidation() {
    if (!ReactDOM.findDOMNode(this.refs.memberCapacity).children[1].value) {
      this.setState({capacityError: '请输入活动人数'});
    } else {
      this.setState({capacityError: ''});
    }
  }

  checkAllValidation() {
    this.checkTitleValidation();
    this.checkLocationValidation();
    this.checkCapacityValidation();
    if (this.state.title == '' || this.state.location == '' || this.state.capacity == '' || this.state.attendance == null) {
      this.setState({validationMsg: '信息填写有误'})
    } else if (this.state.start == null) {
      this.setState({validationMsg: '请选择开始时间'})
    } else if (this.state.end == null) {
      this.setState({validationMsg: '请选择结束时间'})
    } else {
      this.setState({validationMsg: ''})
    }
  }

  renderForm() {
    return (
      <form className="col-sm-12 col-xs-12" onSubmit={this.handleSubmit.bind(this)} 
        style={{padding: 0, height: "100%"}}>
        <div className="col-sm-12 col-xs-12" style={{maxHeight: 350, overflow: "auto"}}>
          <TextField fullWidth={true} floatingLabelText="活动名称" type="text" ref="title" 
            value={this.state.title}
            onChange={(e, title) => {this.setState({title})}}
            onBlur={this.checkTitleValidation.bind(this)}
            errorText={this.state.titleError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="地点" type="text" ref="location" 
            value={this.state.location}
            onChange={(e, location) => {this.setState({location})}}
            onBlur={this.checkLocationValidation.bind(this)}
            errorText={this.state.locationError} 
          /><br />
          <TextField fullWidth={true} floatingLabelText="人数" type="number" ref="memberCapacity" 
            value={this.state.capacity}
            onChange={(e, capacity) => {this.setState({capacity})}}
            onBlur={this.checkCapacityValidation.bind(this)}
            errorText={this.state.capacityError} 
          /><br />
          <SelectField
            floatingLabelText="是否签到"
            value={this.state.attendance}
            onChange={(e, index, attendance) => {this.setState({attendance})}}
            selectedMenuItemStyle={{color: "#1fbcd3"}}
            fullWidth={true}
            ref="attendance"
            errorText={this.state.attendanceError}
          >
            <MenuItem value={true} primaryText="是"/>
            <MenuItem value={false} primaryText="否"/>
          </SelectField>
          <DatePicker hintText="开始日期" fullWidth={true} ref="startDate" value={this.state.start} onChange={(e, start) => {this.setState({start})}}
            style={{marginTop: 16}}  
          />
          <DatePicker hintText="结束日期" fullWidth={true} ref="endDate" value={this.state.end} onChange={(e, end) => {this.setState({end})}}
            style={{marginTop: 16}}  
          />
        </div>
        <div className="col-sm-12 col-xs-12" style={{display: "flex", justifyContent: "center", marginTop: 30, marginBottom: 10}}>
          <RaisedButton label="新增" primary={true} type="submit" style={{marginRight: 30, backgroundColor: "#1fbcd3"}}/>
          <RaisedButton label="取消" default={true} onClick={this.handleAddClose.bind(this)}/>
        </div>
        <div className="col-xs-12 col-sm-12" style={{color: "red", hight: 12, fontSize: 12}}>{this.state.validationMsg}</div>
      </form>
    )
  }

  render() {
    return (
      <div style={{paddingBottom: 48, overflow: "auto"}}>
        <Gallery items={["federer.png", "federer1.png"]} />
        <div className="col-sm-12 col-xs-12" style={{padding: 15, display: "flex", justifyContent: "space-between"}}>
          <Paper className="mdui-btn-group" style={{borderRadius: 4}}>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({sortOrder: 'hot'})}}><i className="mdui-icon material-icons">whatshot</i></button>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({sortOrder: 'time_up'})}}><i className="mdui-icon material-icons">keyboard_arrow_up</i></button>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({sortOrder: 'time_down'})}}><i className="mdui-icon material-icons">keyboard_arrow_down</i></button>
          </Paper>
          {Meteor.user() && (Meteor.user().profile.permission == '0' || Meteor.user().profile.permission == '1') && 
            <Paper className="mdui-btn-group" style={{borderRadius: 4}}>
              <button type="button" className="mdui-btn" onClick={this.handleAddOpen.bind(this)}><i className="mdui-icon material-icons">add</i></button>
            </Paper>
          }
          <Dialog 
            open={this.state.addDialogStatus}
            modal={true}
          >
            {this.renderForm()}
          </Dialog>
          <Dialog 
            // title={"添加结果"}
            open={this.state.resultStatus}
            modal={true}
            actions={<FlatButton primary={true} onClick={() => {this.setState({resultStatus: false})}} label={"确定"} />}
          >
            {this.state.submitResult}
          </Dialog>
          <Paper className="mdui-btn-group" style={{borderRadius: 4}}>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({displayMode: 'card'})}}><i className="mdui-icon material-icons">grid_on</i></button>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({displayMode: 'list'})}}><i className="mdui-icon material-icons">format_list_bulleted</i></button>
          </Paper>
        </div>
        <ActivitiesContainer sortOrder={this.state.sortOrder} displayMode={this.state.displayMode}/>
      </div>
    )
  }
}

export default withRouter(HomePage);