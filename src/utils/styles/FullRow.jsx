import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class FullRow extends React.Component {
  render() {
    return (
      <Row key={this.props.key}>
        <Col sm={12} md={12} lg={12}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}