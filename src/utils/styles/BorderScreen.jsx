import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class BorderScreen extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    key: PropTypes.string
  };

  render() {
    return (
      <Row key={this.props.key}>
        <Col md={1} lg={1} />
        <Col md={10} lg={10}>
          {this.props.children}
        </Col>
        <Col md={1} lg={1} />
      </Row>
    );
  }
}
