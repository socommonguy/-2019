import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities, Images } from '../api/collection';
import AvatarList from '../components/AvatarList';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';

const ThickDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 10, backgroundColor: "#F3F3F3", borderTop: "1px solid #E2E2E2", borderBottom: "1px solid #E2E2E2", marginTop: 10, marginBottom: 10}}/>
)

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1, backgroundColor: "#E2E2E2", marginTop: 10, marginBottom: 10}}/>
)

class ActivityEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionStatus: false,
      errorStatus: false,
      confirmStatus: false,
      resultStatus: false,
      attendanceStatus: false,
      errorMsg: '',
      coverImage: '/images/add.png',
      uploading: false,
    }
  }

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    } else if (Meteor.user().profile.permission == 0 || Meteor.user().profile.permission == 1) {
      this.setState({permissionStatus: true});
    } else {
      this.setState({errorStatus: true});
    }
  }

  hanldeSubmit(e) {
    e.preventDefault();
    var that = this;
    var submitCallBack = function(err, res) {
      if (err) {
        console.log(err)
        that.setState({errorMsg: err, errorStatus: true, confirmStatus: false})
      } else {
        that.props.history.push("/activity/" + res);
      }
    }
    if (this.props.editStatus) {
      var title = ReactDOM.findDOMNode(this.refs.title).value == '' ? this.props.activity.title : ReactDOM.findDOMNode(this.refs.title).value,
          description = ReactDOM.findDOMNode(this.refs.description).value == '' ? this.props.activity.description : ReactDOM.findDOMNode(this.refs.description).value,
          startDate = ReactDOM.findDOMNode(this.refs.start).children[0].children[1].value == '' ? this.props.activity.start : ReactDOM.findDOMNode(this.refs.start).children[0].children[1].value,
          endDate = ReactDOM.findDOMNode(this.refs.end).children[0].children[1].value == '' ? this.props.activity.end : ReactDOM.findDOMNode(this.refs.end).children[0].children[1].value,
          location = ReactDOM.findDOMNode(this.refs.location).value == '' ? this.props.activity.location : ReactDOM.findDOMNode(this.refs.location).value,
          capacity = ReactDOM.findDOMNode(this.refs.capacity).value == '' ? this.props.activity.memberCapacity : ReactDOM.findDOMNode(this.refs.capacity).value;
      Meteor.call('activity.update', this.props.activity._id, title, description, location, capacity, this.state.attendanceStatus, startDate, endDate, submitCallBack)
    } else {
      if (!this.checkValidation()) {
        this.setState({errorStatus: true, confirmStatus: false});
        return;
      }
      var title = ReactDOM.findDOMNode(this.refs.title).value,
          description = ReactDOM.findDOMNode(this.refs.description).value,
          startDate = ReactDOM.findDOMNode(this.refs.start).children[0].children[1].value,
          endDate = ReactDOM.findDOMNode(this.refs.end).children[0].children[1].value,
          location = ReactDOM.findDOMNode(this.refs.location).value,
          capacity = ReactDOM.findDOMNode(this.refs.capacity).value
          cover = ReactDOM.findDOMNode(this.refs.imageUpload).files[0];

      Meteor.call('activity.add', title, description, location, capacity, this.state.attendanceStatus, startDate, endDate, submitCallBack);
      //上传图片
      // var imageExt = cover.name.split('.');
      // imageExt = imageExt[imageExt.length - 1];
      // var uploadInstance = Images.insert({
      //   file: cover,
      //   streams: 'dynamic',
      //   chunkSize: 'dynamic',
      //   fileName: title + '.' + imageExt,
      // }, false);
      // uploadInstance.on('start', function () {
      //   that.setState({uploading: true});
      // });
      // uploadInstance.on('end', function (error, fileObj) {
      //   if (error) {
      //     that.setState({errorMsg: error.message, errorStatus: true, confirmStatus: false});
      //   } else {
      //     that.setState({uploading: false});
      //     // Meteor.call('activity.add', title, description, location, capacity, this.state.attendanceStatus, startDate, endDate, submitCallBack);
      //   }
      // });
      // uploadInstance.start();
    }
  }

  checkValidation() {
    var title = ReactDOM.findDOMNode(this.refs.title).value,
        description = ReactDOM.findDOMNode(this.refs.description).value,
        startDate = ReactDOM.findDOMNode(this.refs.start).children[0].children[1].value,
        endDate = ReactDOM.findDOMNode(this.refs.end).children[0].children[1].value,
        location = ReactDOM.findDOMNode(this.refs.location).value,
        capacity = ReactDOM.findDOMNode(this.refs.capacity).value,
        cover = ReactDOM.findDOMNode(this.refs.imageUpload).files;
    if (title == '' || description == '' || startDate == '' || endDate == '' || location == '' || capacity == '') {
      this.setState({errorMsg: '信息填写不完整'});
      return false;
    }
    if (cover.length < 1) {
      this.setState({errorMsg: '未上传封面图片'});
      return false;
    }
    return true;
  }

  handleUploadImageClick() {
    ReactDOM.findDOMNode(this.refs.imageUpload).click();
  }

  handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var that = this;
      reader.onload = function (e) {
        that.setState({coverImage: e.target.result});
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    return (
      <div className="container-fluid" style={{padding: 0, paddingBottom: 46}}>
        {this.state.permissionStatus ?
          <div className="container-fluid" style={{padding: 0}}>
            <form onSubmit={this.hanldeSubmit.bind(this)}>
              <Card style={{marginBottom: 10}}  onClick={this.handleUploadImageClick.bind(this)}>
                <CardMedia overlay={<CardTitle title={this.props.editStatus ? "点击更换图片" : "点击上传图片"} />} overlayContentStyle={{display: "flex", justifyContent: "center"}}>
                  <img src={this.props.editStatus ? this.props.activity&&this.props.activity.cover : this.state.coverImage} alt="" type="submit"/>
                </CardMedia>
              </Card>
              <input type="file" ref="imageUpload" accept="image/*" style={{visibility: "collapse", marginTop: -36}} onChange={this.handleImageChange.bind(this)}/>
              {/* <FlatButton label='Testing' onClick={()=>{
                  console.log(ReactDOM.findDOMNode(this.refs.imageUpload).files)
                }}>
              </FlatButton>
              {this.props.file && 
                <a href={this.props.file._downloadRoute + this.props.file._storagePath.slice(1) + "/" + this.props.file._id + "/original" + this.props.file.path.slice(this.props.file._storagePath.length) + "?download=true"} download={this.props.file.name} target="_parent">
                  {this.props.file.name}
                </a>
              } */}
              <div className="col-xs-12 col-sm-12" style={{position: "fixed", top: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: 0}}>
                <div style={{fontSize: 18, marginLeft: 16, marginTop: 12}}  onClick={() => {this.props.history.goBack()}}>
                  <i className="fas fa-chevron-left" style={{color: "white"}}></i>
                </div>
              </div>

              <div className="col-xs-12 col-sm-12" style={{marginTop: 10}}>
                <i className="fab fa-font-awesome-flag" style={{fontSize: 20}}></i>
                <input placeholder={this.props.editStatus ? this.props.activity&&this.props.activity.title : "活动标题"} style={{marginLeft: 10, fontSize: 20, outline: "none", width: "90%"}} ref="title"></input>
              </div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "flex-start"}}>
                <i className="fas fa-info-circle" style={{fontSize: 20}}></i>
                <textarea placeholder={this.props.editStatus ? this.props.activity&&this.props.activity.description : "活动简介"} style={{marginLeft: 10, height: 80, width: "90%", fontSize: 16, outline: "none", marginTop: -4}} ref="description"/>
              </div>
              <ThickDivider />
              <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center", marginTop: -10, marginBottom: -10}}>
                <i className="far fa-calendar-alt"></i>
                <div style={{marginLeft: 16, display: "flex", alignItems: "center"}}>
                  <DatePicker name="startDate" autoOk={true} hintText={this.props.editStatus ? this.props.activity&&moment(this.props.activity.start).format("YYYY-MM-DD") : "开始日期"} textFieldStyle={{width: 100}} ref="start"/>
                  <div style={{paddingLeft: 10, paddingRight: 10}}>{"————"}</div>
                  <DatePicker name="endDate" autoOk={true} hintText={this.props.editStatus ? this.props.activity&&moment(this.props.activity.end).format("YYYY-MM-DD") : "结束日期"} textFieldStyle={{width: 100}} ref="end"/>
                </div>
              </div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
                <i className="fas fa-map-marker-alt"></i>
                <input placeholder={this.props.editStatus ? this.props.activity&&this.props.activity.location : "活动地点"} style={{marginLeft: 10, fontSize: 14, outline: "none", width: "90%"}} ref="location"/>
              </div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
                <i className="fas fa-sort-numeric-down"></i>
                <input type="number" placeholder={this.props.editStatus ? this.props.activity&&this.props.activity.memberCapacity : "最大人数"} style={{marginLeft: 10, fontSize: 14, outline: "none", width: "90%"}} ref="capacity"/>
              </div>
              <ThinDivider />
              <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
                <i className="far fa-calendar-check"></i>
                <Toggle label={this.state.attendanceStatus ? "需要签到" : "无需签到"} 
                  toggled={this.state.attendanceStatus} 
                  onToggle={(event, isToggled)=>{this.setState({attendanceStatus: isToggled})}}
                  style={{width: 130, marginLeft: 10, marginTop: 6}}  
                />
              </div>
              <div className="col-xs-12 col-sm-12" style={{position: "fixed", bottom: 0, padding: 4}}>
                <RaisedButton className="col-xs-12 col-sm-12" label="添加" primary={true} style={{padding: 0}} onClick={()=>{this.setState({confirmStatus: true})}}/>
                <button type="submit" ref="submitBtn" style={{padding: 0, border: 0}}/>
              </div>
              {/* <CircularProgress style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%)"}}/>    */}
            </form>

            <Dialog
              modal={true}
              open={this.state.errorStatus}
              actions={<FlatButton label="确定" primary={true} onClick={()=>{this.setState({errorStatus: false})}}/>}
            >
              {this.state.errorMsg}
            </Dialog>
            <Dialog
              modal={true}
              open={this.state.confirmStatus}
              actions={[
                <FlatButton label="取消" onClick={()=>{this.setState({confirmStatus: false})}}/>, 
                <FlatButton label="确定" primary={true} onClick={()=>{ReactDOM.findDOMNode(this.refs.submitBtn).click()}}/>]}
            >
              是否确认创建活动？
            </Dialog>
          </div>
          :
          <div>
            <Dialog
              modal={true}
              open={this.state.errorStatus}
              actions={[
                <FlatButton label="确定" primary={true} onClick={()=>{this.setState({errorStatus: false}); this.props.history.push('/')}}/>]}
            >
              无访问权限
            </Dialog>
          </div>
        }
      </div>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('file.all') //test
  var editStatus = props.match.params.id == "new" ? false : true;
  if (editStatus) {
    handleActivity = Meteor.subscribe('Activity.one', props.match.params.id);
  }
  return {
    editStatus: editStatus,
    activity: editStatus ? Activities.find({}).fetch()[0] : null,
    file: Images.find({}).fetch()[0],//test
  }
})(ActivityEdit);