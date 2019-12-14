import { Meteor } from 'meteor/meteor';
import '../imports/api/collection';
import '../imports/startup/accounts-config';
import { Activities, Images, Records } from '../imports/api/collection';

Meteor.publish('Activity.all', function() {
  return Activities.find({});
});

Meteor.publish('Activity.one', function(id) {
  return Activities.find({_id: id});
});

Meteor.publish('Avatar.some', function(ids) {
  return Meteor.users.find({_id: {$in: ids}}, {profile: 1});
});

Meteor.publish('file.all', function() {
  return Images.find().cursor;
});

Meteor.publish('Record.some', function(activityId) {
  return Records.find({activity: activityId});
});

Meteor.publish('Users.some', function(ids) {
  return Meteor.users.find({_id: {$in: ids}});
});

Meteor.publish('Users.one', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { activities: 1}
    });
  } else {
    this.ready();
  }
});
