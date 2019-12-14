import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Members } from '../api/collection';

class MemberList extends Component {
  renderMembers() {
    return this.props.members.map((member) => {
      return (
        <div key={member._id}>
          {member.username}
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {this.props.members && this.renderMembers()}
      </div>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('Users.some', props.memberIds);
  return {
    members: Meteor.users.find({_id: {$in: props.memberIds}}).fetch(),
  }
})(MemberList);