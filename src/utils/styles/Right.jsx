import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

export default class Right extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return <Row align="right">{this.props.children}</Row>;
  }
}
