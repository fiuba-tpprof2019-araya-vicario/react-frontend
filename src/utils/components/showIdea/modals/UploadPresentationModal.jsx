import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, FormControl } from 'react-bootstrap';
import Dialogue from '../../../Dialogue';
import Field from '../../../forms/Field';

export default class UploadPresentationModal extends React.Component {
  static propTypes = {
    upload: PropTypes.func,
    name: PropTypes.string,
    projectId: PropTypes.number,
    presentationId: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      form: {
        file: { error: false, mensaje: '', value: '' }
      }
    };
  }

  resetCreateForm = () => {
    const form = {
      file: { error: false, mensaje: '', value: '' }
    };

    this.setState({ form });
  };

  showModal = () => {
    this.resetCreateForm();
    this.modal.showModal();
  };

  updateFile = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        file: { error: false, message: '', value: event.target.files[0] }
      }
    });
  };

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

    this.setState({ form });

    return formOk;
  }

  getModalBody() {
    const { name } = this.props;

    return (
      <Row key="body">
        <Col md={12}>
          <Field
            controlId="fileInput"
            label={`Adjuntar archivo de ${name} en formato pdf`}
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
          const { projectId, presentationId } = this.props;
          const file = form.file.value;

          if (this.validateForm(file)) {
            this.props.upload(projectId, presentationId, { file });
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
    const { name } = this.props;

    return (
      <Dialogue
        key="uploadPresentation"
        title={`Subir la ${name} del proyecto`}
        body={this.getModalBody()}
        buttons={this.getModalButtons()}
        ref={(modal) => {
          this.modal = modal;
        }}
      />
    );
  }
}
