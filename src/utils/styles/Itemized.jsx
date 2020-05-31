import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

export default class Itemized extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    title: PropTypes.string.isRequired
  };

  renderItems(items) {
    return items.map((item, index) => <li key={`item-${index}`}>{item}</li>);
  }

  render() {
    const itemsList = this.props.items
      ? this.renderItems(this.props.items)
      : null;

    return (
      <Row>
        <h4 data-test-id="items-title">{this.props.title}</h4>
        <ul data-test-id="items-list" style={{ listStyleType: 'disc' }}>
          {itemsList}
        </ul>
      </Row>
    );
  }
}
