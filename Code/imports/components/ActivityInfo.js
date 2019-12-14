import React, { Component } from 'react';
import AvatarList from './AvatarList';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const ThickDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 10, backgroundColor: "#F3F3F3", borderTop: "1px solid #E2E2E2", borderBottom: "1px solid #E2E2E2", marginTop: 10, marginBottom: 10}}/>
)

const ThinDivider = () => (
  <div className="col-xs-12 col-sm-12" style={{height: 1, backgroundColor: "#E2E2E2", marginTop: 10, marginBottom: 10}}/>
)

export default class ActivityInfo extends Component {
  render() {
    return (
      <div className="container-fluid" style={{padding: 0}}>
        <Card style={{marginBottom: 10}}>
          <CardMedia
            overlay={<CardTitle title={this.props.activity.title} />}
          >
            <img src={this.props.activity.cover ? this.props.activity.cover : "/images/federer.png"} alt="" />
          </CardMedia>
        </Card>
        <div className="col-xs-12 col-sm-12">
          <div style={{borderBottom: "1px solid #E2E2E2", fontSize: 24, paddingBottom: 6, marginBottom: 6}}>活动简介</div>
          <div>{this.props.activity.description}</div>
        </div>
        <ThickDivider />
        <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
          <i className="far fa-calendar-alt"></i>
          <div style={{marginLeft: 16}}>{moment(this.props.activity.start).format("YYYY-MM-DD") + " -- " + moment(this.props.activity.end).format("YYYY-MM-DD")}</div>
        </div>
        <ThinDivider />
        <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
          <i className="fas fa-map-marker-alt"></i>
          <div style={{marginLeft: 16}}>{this.props.activity.location}</div>
        </div>
        <ThinDivider />
        <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
          <i className="fas fa-sort-numeric-down"></i>
          <div style={{marginLeft: 16}}>{'最多' + this.props.activity.memberCapacity + '人报名'}</div>
        </div>
        <ThinDivider />
        <div className="col-xs-12 col-sm-12" style={{display: "flex", alignItems: "center"}}>
          {this.props.activity.attendance ? <i className="far fa-calendar-check"></i> : <i className="far fa-calendar-times"></i>}
          <div style={{marginLeft: 16}}>{this.props.activity.attendance ? "需要签到" : "无需签到"}</div>
        </div>
        <ThickDivider />
        <div className="col-xs-12 col-sm-12">
          <div style={{borderBottom: "1px solid #E2E2E2", fontSize: 24, paddingBottom: 6, marginBottom: 6}}>参与者 ({this.props.activity.participatorCount})</div>
          <AvatarList participators={this.props.activity.participators} count={this.props.activity.participatorCount}/>
        </div>
      </div>
    )
  }
}