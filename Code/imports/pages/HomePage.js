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
import FloatingActionButton from 'material-ui/FloatingActionButton';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortOrder: 'hot',
      displayMode: 'card',
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
              <button type="button" className="mdui-btn" onClick={()=>{this.props.history.push('/activityedit/new')}}><i className="mdui-icon material-icons">add</i></button>
            </Paper>
          }
          <Paper className="mdui-btn-group" style={{borderRadius: 4}}>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({displayMode: 'card'})}}><i className="mdui-icon material-icons">grid_on</i></button>
            <button type="button" className="mdui-btn" onClick={()=>{this.setState({displayMode: 'list'})}}><i className="mdui-icon material-icons">format_list_bulleted</i></button>
          </Paper>
        </div>
        <ActivitiesContainer sortOrder={this.state.sortOrder} displayMode={this.state.displayMode}/>
        {!Meteor.user() && 
          <FloatingActionButton style={{position: "fixed", bottom: 58, right: 10}} onClick={()=>{this.props.history.push("/signin")}}>
            <i className="fas fa-sign-in-alt" style={{fontSize: 20}}></i>
          </FloatingActionButton>
        }
      </div>
    )
  }
}

export default withRouter(HomePage);