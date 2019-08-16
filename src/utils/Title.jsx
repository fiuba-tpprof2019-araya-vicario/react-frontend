import React from 'react';
import { Row } from 'react-bootstrap';

export default class Title extends React.Component {
  render() {
    let subtitle;
    if (this.props.subtitle) {
      subtitle = <h4>{this.props.subtitle}</h4>;
    }
    return (
      <Row>
        <h1>{this.props.title}</h1>
        {subtitle}
        <br/>
      </Row>
    );
  }
}