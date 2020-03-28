import PropTypes from 'prop-types';
import React from 'react';
import { Alert as BootstrapAlert, Col, Row } from 'react-bootstrap';
import Center from 'react-center';

export default class Alert extends React.Component {
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
            <BootstrapAlert onDismiss={onDismiss} bsStyle={bsStyle}>
              <p>{message}</p>
            </BootstrapAlert>
          </Col>
        </Center>
      </Row>
    );
  }
}
