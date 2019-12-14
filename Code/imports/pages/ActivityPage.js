import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Activities } from '../api/collection';
import { ActivityCard } from '../components/ActivitiesContainer';

class ActivityPage extends Component {

  componentWillMount() {
    if (!Meteor.user()) {
      this.props.history.push('/signin')
    }
  }

  renderActivities() {
    return this.props.activities.map((activity) => {
      return (
        <div key={activity._id} onClick={() => {this.props.history.push('/activity/' + activity._id)}}>
          <ActivityCard activity={activity} />
        </div>
      )
    })
  }

  render() {
    return (
      <div style={{paddingTop: 15, paddingBottom: 48, overflow: "auto"}}>
        <div className="col-xs-12 col-sm-12" style={{fontSize: 24, marginBottom: 10}}>已报名活动</div>
        {this.props.activities && this.renderActivities()}
      </div>
    )
  }
}

export default withRouter(withTracker(() => {
  Meteor.subscribe('Users.one');
  handleActivity = Meteor.subscribe('Activity.all');
  activitiesArray = [];
  if (handleActivity.ready() && Meteor.user().activities) {
    Meteor.user().activities.map((activityId) => {
      activitiesArray.push(Activities.find({_id: activityId}).fetch()[0]);
    })
  }
  return {
    activities: activitiesArray,
  }
})(ActivityPage));