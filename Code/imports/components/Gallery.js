import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class Gallery extends Component {

  renderItems() {
    var count = 0;
    return this.props.items.map((item) => {
      return (
        <Carousel.Item key={"gallery." + count++}>
          <img width={900} height={500} alt="900x500" src={"images/" + item} />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      )
    })
  }

  render() {
    return (
      <Carousel>
        {this.renderItems()}
      </Carousel>
    )
  }
}