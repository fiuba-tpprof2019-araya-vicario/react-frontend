import React from 'react';
import { Row } from 'react-bootstrap';

export default class Title extends React.Component {
  render() {
    let subtitle;
    if (this.props.subtitle) {
      subtitle = <h3>{this.props.subtitle}</h3>;
    }
    return (
      <Row>
        <h1>{this.props.title}</h1>
        {subtitle}
      </Row>
    );
  }
}