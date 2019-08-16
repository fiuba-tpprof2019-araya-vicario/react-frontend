import React from 'react';
import { Row } from 'react-bootstrap';

export default class Itemized extends React.Component {
  renderItems(items){
    return items.map((item, index) => {
      return <li key={'item'+index}>{item}</li>;
    });
  }

  render() {
    return (
      <Row>
        <h4>{this.props.title}</h4>
        <ul>{this.props.items && this.renderItems(this.props.items)}</ul>
      </Row>
    );
  }
}