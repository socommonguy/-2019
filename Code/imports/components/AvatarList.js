import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Avatar from 'material-ui/Avatar';

class AvatarList extends Component {
  renderAvatars() {
    if (this.props.avatars.length == this.props.count + 1) {
      this.props.avatars.shift();
    }
    var count = 0;
    return this.props.avatars.map((avatar) => {
      return <Avatar key={"avatar" + count++} src={avatar} size={64} style={{margin: 6}}/>
    });
  }

  render() {
    return (
      <div className="container-fluid" style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {this.props.avatars &&
          this.renderAvatars()
        }
      </div>
    )
  }
}

export default withTracker((props) => {
  Meteor.subscribe('Avatar.some', props.participators);
  return {
    avatars: Meteor.users.find({}).fetch().map((user) => {
      return user = user.profile.avatar;
    }),
  }
})(AvatarList);