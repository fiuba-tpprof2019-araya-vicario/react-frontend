import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

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
        <h1>{this.props.title}</h1>
        {subtitle}
        <br />
      </Row>
    );
  }
}
