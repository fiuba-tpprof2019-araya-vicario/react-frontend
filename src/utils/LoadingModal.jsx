import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import Center from 'react-center';

export default class LoadingModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super();
    this.state = { show: props.show };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Modal
        {...this.props}
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal loadingModal"
      >
        <Modal.Body>
          <Row className="expandedRow">
            <Center>
              <h1>
                <i className="fa fa-spinner fa-lg fa-spin">&nbsp;</i>
              </h1>
              <h3>Cargando</h3>
            </Center>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
