import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import Dialogue from '../../Dialogue';
import Field from '../../forms/Field';

export default class UploadProposalModal extends React.Component {
  static propTypes = {
    uploadProposal: PropTypes.func,
    projectId: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      showArchivoInput: true,
      file: null,
      form: {
        file: { error: false, mensaje: '', value: '' }
      }
    };
    this.showModal = this.showModal.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  resetCreateForm() {
    const form = {
      file: { error: false, mensaje: '', value: '' }
    };

    this.setState({
      ...this.state,
      form
    });
  }

  showModal() {
    this.resetCreateForm();
    this.modal.showModal();
  }

  updateFile(event) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        file: { error: false, message: '', value: event.target.files[0] }
      }
    });
  }

  validateForm(file) {
    let formOk = true;

    const form = {
      file: { error: false, mensaje: '', value: file }
    };

    if (file === undefined || file === '') {
      form.file.error = true;
      form.file.mensaje = 'Este campo es obligatorio';
      formOk = false;
    } else {
      form.file.error = false;
      form.file.mensaje = '';
    }

    this.setState({ ...this.state, form });

    return formOk;
  }

  getModalBody() {
    return (
      <Row key="body">
        <Col md={12}>
          <Field
            controlId="fileInput"
            label="Adjuntar archivo de propuesta en formato pdf"
            required
            validationState={this.state.form.file.error}
            validationMessage={this.state.form.file.message}
            inputComponent={
              <FormControl
                type="file"
                accept="application/pdf"
                title="Selecciona un pdf"
                placeholder="Ingrese un archivo en formato pdf"
                onChange={this.updateFile}
              />
            }
          />
        </Col>
      </Row>
    );
  }

  getModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="uploadButton"
        bsSize="small"
        bsStyle="success"
        onClick={() => {
          const { form } = this.state;
          const { projectId } = this.props;
          const file = form.file.value;

          if (this.validateForm(file)) {
            this.props.uploadProposal(projectId, {
              file
            });
            this.modal.hideModal();
          }
        }}
      >
        Subir propuesta
      </Button>
    );

    return buttons;
  }

  render() {
    return (
      <Dialogue
        key="uploadProposal"
        title="Subir una propuesta"
        body={this.getModalBody()}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
