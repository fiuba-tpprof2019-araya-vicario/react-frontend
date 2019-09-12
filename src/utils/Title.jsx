import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Title extends React.Component {
  static propTypes = {
    subtitle: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    let subtitle;

    if (this.props.subtitle) {
      subtitle = <h4>{this.props.subtitle}</h4>;
    }

    return (
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <h1>{this.props.title}</h1>
          {subtitle}
          <br />
        </Col>
      </Row>
    );
  }
}
