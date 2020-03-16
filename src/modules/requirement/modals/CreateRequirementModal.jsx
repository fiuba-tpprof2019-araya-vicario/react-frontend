import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import FullRow from '../../../utils/styles/FullRow';
import Field from '../../../utils/forms/Field';

export default class CreateRequirementModal extends React.Component {
  static propTypes = {
    uploadRequirement: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      show: false,
      form: {
        description: { error: false, message: '', value: '' },
        title: { error: false, message: '', value: '' },
        file: { error: false, message: '', value: '' }
      }
    };
  }

  updateTitle = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        title: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  updateDescription = (newValue) => {
    this.setState({
      form: {
        ...this.state.form,
        description: { error: false, message: '', value: newValue.target.value }
      }
    });
  };

  resetForm = () => {
    const form = {
      description: { error: false, message: '', value: '' },
      title: { error: false, message: '', value: '' }
    };

    this.setState({ form });
  };

  validateForm = (title, description, file) => {
    let formOk = true;

    const form = {
      description: { error: false, message: '', value: description },
      title: { error: false, message: '', value: title },
      file: { error: false, message: '', value: file }
    };

    if (title == null || title === '') {
      form.title.error = true;
      form.title.message = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    }

    if (description == null || description === '') {
      form.description.error = true;
      form.description.message = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    }

    this.setState({ form });

    return formOk;
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onSubmit = () => {
    const { form } = this.state;
    const title = form.title.value;
    const description = form.description.value;
    const file = form.file.value;

    if (this.validateForm(title, description, file)) {
      this.props.uploadRequirement({ name: title, description, file });
      this.resetForm();
      this.hideModal();
    }
  };

  updateFile = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        file: { error: false, message: '', value: event.target.files[0] }
      }
    });
  };

  render() {
    const { title, description } = this.state.form;

    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
        backdrop="static"
        bsSize="lg"
        autoFocus
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Crear requerimiento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FullRow key="1">
            <Field
              controlId="titleInput"
              label="Título"
              required
              validationState={title.error}
              validationMessage={title.message}
              inputComponent={
                <FormControl
                  type="text"
                  value={title.value}
                  placeholder="Ingrese un título para tu requerimiento"
                  onChange={this.updateTitle}
                />
              }
            />
          </FullRow>
          <FullRow key="2">
            <Field
              controlId="descriptionInput"
              label="Descripción"
              required
              validationState={description.error}
              validationMessage={description.message}
              inputComponent={
                <textarea
                  value={description.value}
                  onChange={this.updateDescription}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  rows="10"
                  placeholder="Ingrese una descripción de tu requerimiento..."
                />
              }
            />
          </FullRow>
          <FullRow key="3">
            <Field
              controlId="fileInput"
              label="Adjuntar archivo de requerimiento en formato pdf"
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
          </FullRow>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>
          &nbsp;
          <Button
            key="createButton"
            bsSize="small"
            bsStyle="primary"
            onClick={this.onSubmit}
          >
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
