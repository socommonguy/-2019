import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

export const Activities = new Mongo.Collection('activities');
export const Records = new Mongo.Collection('attendance_records')

export const Images = new FilesCollection({
  collectionName: 'images',
  allowClientCode: true, // Disallow remove files from Client
  storagePath: './activity_cover',
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 5*1024*1024) { // && /png|jpg|jpeg|JPG/i.test(file.extension)
      return true;
    }
    return '请上传小于5M的图片';
  }
});

if (Meteor.isServer) {
  Meteor.methods({
    'activity.add'(title, description, location, memberCapacity, attendance, startDate, endDate) {
      var id = new Mongo.ObjectID().toHexString();
      Activities.insert({_id: id, createdAt: new Date(), title, description, start: new Date(startDate), end: new Date(endDate), location, memberCapacity: parseInt(memberCapacity), attendance, participators: [], participatorCount: 0, attendanceRecords: []});
      return id;
    },
    'activity.update'(id, title, description, location, memberCapacity, attendance, startDate, endDate) {
      Activities.update({_id: id}, {$set: {modifiedAt: new Date(), title, description, start: startDate, end: endDate, location, memberCapacity: parseInt(memberCapacity), attendance}});
      return id;
    },
    'activity.apply'(userId, activityId) {
      Activities.update({_id: activityId}, {$addToSet: {participators: userId}});
      var participatorCount = Activities.find({_id: activityId}).fetch()[0].participators.length;
      Activities.update({_id: activityId}, {$set: {participatorCount: participatorCount}});
      var activities = Meteor.users.find({_id: userId}).fetch()[0].activities ? Meteor.users.find({_id: userId}).fetch()[0].activities : [];
      if (!activities.some((id) => {
        return id == activityId;
      })) {
        activities.push(activityId);
        Meteor.users.update({_id: userId}, {$set: {activities: activities}});
      }
    },
    'record.add'(title, activityId) {
      var id = new Mongo.ObjectID().toHexString();
      var newRecord = Activities.find({_id: activityId}).fetch()[0].attendance_record ? Activities.find({_id: activityId}).fetch()[0].attendance_record : [];
      newRecord.push(id);
      Activities.update({_id: activityId}, {$set: {attendance_record: newRecord}});
      Records.insert({_id: id, activity: activityId, createdAt: new Date(), title, participators: []});
    },
    'record.takeAttendance'(userId, activityId, recordId) {
      var activity = Activities.find({_id: activityId}).fetch()[0];
      if (!activity) {
        throw new Meteor.Error('活动不存在');
      }
      if (activity.participators.indexOf(userId) == -1) {
        console.log('Throw Error')
        throw new Meteor.Error('您未报名此活动');
      }
      Records.update({_id: recordId}, {$addToSet: {participators: userId}});
    }
  });
}