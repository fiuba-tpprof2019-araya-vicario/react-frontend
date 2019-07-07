import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Center from 'react-center';

export class CustomAlert extends React.Component {
  render() {
    return (
      <Row key={this.props.rowKey}>
        <Center>
          <Col lg={8}>
            <Alert onDismiss={this.props.onDismiss} bsStyle={this.props.bsStyle}><p>{this.props.message}</p></Alert>
          </Col>
        </Center>
      </Row>
    );
  }
}
