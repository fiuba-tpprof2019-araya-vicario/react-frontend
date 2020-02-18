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

  static defaultProps = { size: 10, rowKey: 'alert' };

  componentWillUnmount() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  render() {
    const { rowKey, size, bsStyle, onDismiss, message } = this.props;

    return (
      <Row key={rowKey}>
        <Center>
          <Col lg={size}>
            <Alert onDismiss={onDismiss} bsStyle={bsStyle}>
              <p>{message}</p>
            </Alert>
          </Col>
        </Center>
      </Row>
    );
  }
}
