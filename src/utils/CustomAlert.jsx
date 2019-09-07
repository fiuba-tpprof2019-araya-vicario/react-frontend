import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Center from 'react-center';

export default class CustomAlert extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string,
    size: PropTypes.number,
    onDismiss: PropTypes.func,
    bsStyle: PropTypes.string,
    message: PropTypes.string
  };

  componentWillUnmount() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  render() {
    return (
      <Row key={this.props.rowKey}>
        <Center>
          <Col lg={this.props.size ? this.props.size : 10}>
            <Alert
              onDismiss={this.props.onDismiss}
              bsStyle={this.props.bsStyle}
            >
              <p>{this.props.message}</p>
            </Alert>
          </Col>
        </Center>
      </Row>
    );
  }
}
