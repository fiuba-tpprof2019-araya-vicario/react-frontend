import React from 'react';
import { Row } from 'react-bootstrap';

export default class Right extends React.Component {
  render() {
    return (
      <Row align='right'>
        {this.props.children}
      </Row>
    );
  }
}