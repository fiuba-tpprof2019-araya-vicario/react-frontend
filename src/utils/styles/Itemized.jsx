import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

export default class Itemized extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    title: PropTypes.string
  };

  renderItems(items) {
    return items.map((item, index) => <li key={`item${index}`}>{item}</li>);
  }

  render() {
    return (
      <Row>
        <h4>{this.props.title}</h4>
        <ul style={{ listStyleType: 'disc' }}>
          {this.props.items && this.renderItems(this.props.items)}
        </ul>
      </Row>
    );
  }
}
