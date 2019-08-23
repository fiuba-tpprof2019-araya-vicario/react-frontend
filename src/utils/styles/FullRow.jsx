import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class FullRow extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    key: PropTypes.string
  };

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
