import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class BorderScreen extends React.Component {
  render() {
    return (
      <Row>
        <Col md={1} lg={1} />
        <Col md={10} lg={10}>
          {this.props.children}
        </Col>
        <Col md={1} lg={1} />
      </Row>
    );
  }
}