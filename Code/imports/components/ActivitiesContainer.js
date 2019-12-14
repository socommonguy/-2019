import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities } from '../api/collection';
import Paper from 'material-ui/Paper';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

export const ActivityCard = ({activity}) => (
  <div className="col-sm-12 col-xs-12" style={{marginBottom: 15}}>
    <Paper zDepth={2} style={{padding: 0, overflow: "hidden", borderRadius: 4}}>
      <Card style={{marginBottom: 10}}>
        <CardMedia
          overlay={<CardTitle title={activity.title} />}
        >
          <img src={activity.cover || "images/federer.png"} alt="" />
        </CardMedia>
      </Card>
      <div className="col-xs-12 col-sm-12">
        <div style={{fontSize: 18}}>
          <i className="far fa-clock" style={{marginRight: 10}}></i>
          {moment(activity.start).format('YYYY-MM-DD')+' ---- '+moment(activity.end).format('YYYY-MM-DD')}
        </div>
        <div style={{fontSize: 18}}>
          <i className="fas fa-map-marker-alt" style={{marginRight: 12}}></i>
          {activity.location}
        </div>
        <div style={{marginTop: 8, marginBottom: 12, display: "flex"}}>
          <div style={{fontSize: 14, backgroundColor: activity.attendance ? "#EF5350" : "#BDBDBD", color: "white", padding: "4px 8px", borderRadius: 20}}>{activity.attendance ? "需要签到" : "无需签到"}</div>
          <div style={{fontSize: 14, backgroundColor: "#4FC3F7", color: "white", padding: "4px 8px", borderRadius: 20, marginLeft: 10}}>已报名人数 : {activity.participatorCount}/{activity.memberCapacity}</div>
        </div>
      </div>
    </Paper>
  </div>
)

export const ActivityItem = ({activity}) => (
  <div>
    <ListItem
      leftAvatar={<Avatar src="images/federer.png" />}
      primaryText={activity.title}
      secondaryText={
        <div>
          <div>{moment(activity.start).format('YYYY-MM-DD') + " ~ "}{moment(activity.end).format('YYYY-MM-DD')}</div>
          <div>{activity.location}</div>
          <div>{activity.attendance ? "需要签到" : "无需签到"}</div>
          <div>{activity.participatorCount}</div>
        </div>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
  </div>
)

class ActivitiesContainer extends Component {
  renderActivityCards() {
    return this.props.activities.map((activity) => {
      return (
        <div key={activity._id} onClick={() => {this.props.history.push('/activity/' + activity._id)}}>
          <ActivityCard activity={activity}/>
        </div>
      )
    })
  }

  renderActivityItems() {
    return this.props.activities.map((activity) => {
      return <ActivityItem key={activity._id} activity={activity} onClick={() => {this.props.history.push('/activity/' + activity._id)}}/>
    })
  }

  renderActivityList() {
    return (
      <div style={{paddingLeft: 15, paddingRight: 15, marginBottom: 15}}>
        <Paper zDepth={2}>
          <List style={{border: "solid 1px #e0e0e0", borderRadius: 4, padding: 0}}>
            {this.renderActivityItems()}
          </List>
        </Paper>
      </div>
    )
  }

  render() { 
    return (
      <div className="col-sm-12 col-xs-12" style={{padding: 0}}>
        {this.props.activities && 
          this.props.displayMode == 'card' ? 
          this.renderActivityCards() 
          : 
          this.renderActivityList()
        }
      </div>
    )
  }
}

export default withRouter(withTracker(({sortOrder}) => {
  handleActivity = Meteor.subscribe('Activity.all');
  if (sortOrder == 'hot') sortMode = { participatorCount: -1 };
  else if (sortOrder == 'time_up') sortMode = { start: 1 };
  else sortMode = { start: -1 };
  return {
    activities: Activities.find({}, { sort: sortMode }).fetch(),
  }
})(ActivitiesContainer));