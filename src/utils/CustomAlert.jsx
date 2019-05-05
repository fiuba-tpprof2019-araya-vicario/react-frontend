import React from 'react'
import { Alert, Col, Row } from 'react-bootstrap'

export class CustomAlert extends React.Component {
  render() {
    return (
      <Row key={this.props.rowKey}>
        <Col lg={12}>
          <Alert onDismiss={this.props.onDismiss} bsStyle={this.props.bsStyle}><p>{this.props.message}</p></Alert>
        </Col>
      </Row>
    )
  }
}
