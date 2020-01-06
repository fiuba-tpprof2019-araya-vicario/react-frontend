import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class Dialogue extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    body: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    title: PropTypes.string,
    buttons: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
  };

  constructor(props) {
    super();
    this.state = { show: props.show };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <Modal
        {...this.props}
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.body}</Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>
          &nbsp;{this.props.buttons}
        </Modal.Footer>
      </Modal>
    );
  }
}
