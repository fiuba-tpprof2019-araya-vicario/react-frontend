import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class FullRow extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string
  };

  render() {
    const { length } = this.props.children;

    if (length) {
      const width = 12 / length;

      return (
        <Row key={this.props.id}>
          {this.props.children.map((children, i) => (
            <Col key={i} sm={width} md={width} lg={width}>
              {children}
            </Col>
          ))}
        </Row>
      );
    }

    return (
      <Row key={this.props.id}>
        <Col sm={12} md={12} lg={12}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}
