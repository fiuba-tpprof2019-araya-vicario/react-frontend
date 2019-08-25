import PropTypes from 'prop-types';
import React from 'react';
import {
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Modal
} from 'react-bootstrap';
import Select from 'react-select';
import Field from '../../../utils/Field';
import MandatoryField from '../../../utils/forms/MandatoryField';
import { getFullName } from '../../../utils/services/functions';

export default class UploadIdeaModal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    coautors: PropTypes.array,
    tutors: PropTypes.array,
    editMode: PropTypes.number,
    projectTypes: PropTypes.array,
    uploadIdea: PropTypes.func
  };

  constructor(props) {
    super();
    const project = props.project ? props.project : {};
    const user = props.user ? props.user : {};

    this.state = {
      form: {
        description: { error: false, mensaje: '' },
        autor: { error: false, mensaje: '' },
        title: { error: false, mensaje: '' }
      },
      coautors: project.students ? props.project.students : [],
      tutors: [],
      title: project.name ? project.name : '',
      description: project.description ? project.description : '',
      projectType: project.type ? project.type : null,
      tutor: project.tutor ? project.tutor : null,
      autor: project.creator ? getFullName(project.creator) : user.name,
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateAutorsSelect = this.updateAutorsSelect.bind(this);
    this.updateAutor = this.updateAutor.bind(this);
    this.updateProjectTypeSelect = this.updateProjectTypeSelect.bind(this);
    this.updateTutorSelect = this.updateTutorSelect.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      this.resetForm(this.props);
    }
  }

  updateProjectTypeSelect(newValue) {
    this.setState({
      ...this.state,
      projectType: newValue
    });
  }

  updateAutorsSelect(newValue) {
    this.setState({
      ...this.state,
      coautors: newValue
    });
  }

  updateTutorSelect(newValue) {
    this.setState({
      ...this.state,
      tutor: newValue
    });
  }

  updateTitle(newValue) {
    this.setState({
      ...this.state,
      title: newValue.target.value
    });
  }

  updateDescription(newValue) {
    this.setState({
      ...this.state,
      description: newValue.target.value
    });
  }

  updateAutor(newValue) {
    this.setState({
      ...this.state,
      autor: newValue.target.value
    });
  }

  resetForm(props) {
    const project = props.project ? props.project : {};
    const user = props.user ? props.user : {};

    this.setState({
      file: null,
      form: {
        description: { error: false, mensaje: '' },
        autor: { error: false, mensaje: '' },
        title: { error: false, mensaje: '' }
      },
      coautors: project.students ? props.project.students : [],
      tutors: [],
      title: project.name ? project.name : '',
      description: project.description ? project.description : '',
      projectType: project.type ? project.type : null,
      tutor: project.tutor ? project.tutor : null,
      autor: project.creator ? getFullName(project.creator) : user.name
    });
  }

  validateForm(title, description, autor) {
    let formOk = true;

    const form = {
      description: { error: false, mensaje: '' },
      autor: { error: false, mensaje: '' },
      title: { error: false, mensaje: '' }
    };

    if (title == null || title === '') {
      form.title.error = true;
      form.title.mensaje = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    } else {
      form.title.error = false;
      form.title.mensaje = '';
    }

    if (description == null || description === '') {
      form.description.error = true;
      form.description.mensaje = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    } else {
      form.description.error = false;
      form.description.mensaje = '';
    }

    if (autor == null || autor === '') {
      form.autor.error = true;
      form.autor.mensaje = 'Tenés que ingresar el autor de la idea';
      formOk = false;
    } else {
      form.autor.error = false;
      form.autor.mensaje = '';
    }

    this.setState({ ...this.state, form });

    return formOk;
  }

  showModal() {
    // this.resetForm();
    this.setState({ show: true });
  }

  hideModal() {
    // this.resetForm();
    this.setState({ show: false });
  }

  onSubmit() {
    const { title, description, autor } = this.state;
    const type = this.state.projectType ? this.state.projectType.value : null;
    const coautors = this.state.coautors ? this.state.coautors : null;
    const tutorId = this.state.tutor ? this.state.tutor.value : null;

    if (this.validateForm(title, description, autor)) {
      this.props.uploadIdea({
        title,
        description,
        coautors,
        type,
        autor,
        tutorId
      });
      this.hideModal();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Crear idea a alto nivel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key="formCreateRow0">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={this.state.form.title.error ? 'error' : null}
              >
                <ControlLabel>
                  Título
                  <MandatoryField />
                </ControlLabel>
                <FormControl
                  value={this.state.title}
                  onChange={(e) => this.updateTitle(e)}
                  ref={(titleInput) => {
                    this.titleInput = titleInput;
                  }}
                  key="titleInput"
                  placeholder="Ingrese un título para tu idea"
                  type="text"
                  required
                />
              </FormGroup>
              {this.state.form.title.error && (
                <HelpBlock bsSize="small">
                  {this.state.form.title.mensaje}
                </HelpBlock>
              )}
            </Col>
          </Row>
          <Row key="formCreateRow5">
            <Col md={12} lg={12}>
              <Field
                key="projectTypeGroup"
                bsSize="small"
                controlId="projectTypeSelect"
                label="Tipo"
                required
                inputComponent={
                  <Select
                    key="projectTypeSelect"
                    value={this.state.projectType}
                    ref={(projectTypeSelect) => {
                      this.projectTypeSelect = projectTypeSelect;
                    }}
                    onChange={(e) => this.updateProjectTypeSelect(e)}
                    options={this.props.projectTypes}
                    isSearchable
                    id="projectTypeSelect"
                    placeholder="Seleccione un tipo de proyecto"
                    name="projectTypeSelect"
                    multi={false}
                  />
                }
              />
            </Col>
          </Row>
          <Row key="formCreateRow1">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={this.state.form.autor.error ? 'error' : null}
              >
                <ControlLabel>
                  Autor
                  <MandatoryField />
                </ControlLabel>
                <FormControl
                  defaultValue={this.state.autor}
                  onChange={this.updateAutor}
                  disabled={this.props.user && this.props.user.name}
                  ref={(autorInput) => {
                    this.autorInput = autorInput;
                  }}
                  key="autorInput"
                  type="text"
                />
              </FormGroup>
              {this.state.form.autor.error && (
                <HelpBlock bsSize="small">
                  {this.state.form.autor.mensaje}
                </HelpBlock>
              )}
            </Col>
          </Row>
          <Row key="formCreateRow2">
            <Col md={12} lg={12}>
              <Field
                key="coautorsGroup"
                bsSize="small"
                controlId="coautorsSelect"
                label="Coautores"
                inputComponent={
                  <Select
                    key="coautorsSelect"
                    value={this.state.coautors}
                    ref={(coautorsSelect) => {
                      this.coautorsSelect = coautorsSelect;
                    }}
                    onChange={(e) => this.updateAutorsSelect(e)}
                    options={this.props.coautors}
                    isSearchable
                    id="coautorsSelect"
                    placeholder="Seleccione coautores"
                    name="coautorsSelect"
                    multi
                  />
                }
              />
            </Col>
          </Row>
          <Row key="formCreateRow3">
            <Col md={12} lg={12}>
              <Field
                key="tutorGroup"
                bsSize="small"
                controlId="tutorSelect"
                label="Tutor"
                inputComponent={
                  <Select
                    key="tutorSelect"
                    value={this.state.tutor}
                    ref={(tutorSelect) => {
                      this.tutorSelect = tutorSelect;
                    }}
                    onChange={(e) => this.updateTutorSelect(e)}
                    options={this.props.tutors}
                    isSearchable
                    id="tutorSelect"
                    placeholder="Seleccione un tutor"
                    name="tutorSelect"
                    multi={false}
                  />
                }
              />
            </Col>
          </Row>
          <Row key="formCreateRow4">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={
                  this.state.form.description.error ? 'error' : null
                }
              >
                <ControlLabel>
                  Descripción de la idea
                  <MandatoryField />
                </ControlLabel>
                <textarea
                  value={this.state.description}
                  onChange={this.updateDescription}
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  rows="10"
                  ref={(descriptionInput) => {
                    this.descriptionInput = descriptionInput;
                  }}
                  placeholder="Ingrese una descripción de tu idea..."
                />
              </FormGroup>
              {this.state.form.description.error && (
                <HelpBlock bsSize="small">
                  {this.state.form.description.mensaje}
                </HelpBlock>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize="small" onClick={this.hideModal}>
            Cancelar
          </Button>
          &nbsp;
          <Button
            key="createFileButton"
            bsSize="small"
            bsStyle="primary"
            onClick={this.onSubmit}
          >
            {this.props.editMode ? 'Enviar' : 'Crear'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
