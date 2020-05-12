import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import Center from 'react-center';

export default class LoadingModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  };

  render() {
    return (
      <Modal show={this.props.show} dialogClassName="custom-modal loadingModal">
        <Modal.Body>
          <Row className="expandedRow">
            <Center>
              <h1 data-test-id="loading-icon">
                <i className="fa fa-spinner fa-lg fa-spin">&nbsp;</i>
              </h1>
              <h3 data-test-id="loading-text">Cargando</h3>
            </Center>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
