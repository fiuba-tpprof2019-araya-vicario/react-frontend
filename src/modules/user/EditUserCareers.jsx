import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import { CustomTable } from '../../utils/CustomTable';
import Dialogue from '../../utils/Dialogue';
import Field from '../../utils/forms/Field';

export default class EditUserCareers extends React.Component {
  static propTypes = {
    careers: PropTypes.array,
    activeUser: PropTypes.object,
    refresh: PropTypes.func
  };

  constructor(props) {
    super();

    this.state = {
      removeCareerClicked: -1,
      selectedCareer: -1,
      formSelect: { error: false, message: '' },
      careers: props.activeUser.careers
    };
    this.showAddCareerModal = this.showAddCareerModal.bind(this);
    this.showRemoveCareerModal = this.showRemoveCareerModal.bind(this);
    this.getDeleteCareerModalButtons = this.getDeleteCareerModalButtons.bind(
      this
    );
    this.getAddCareerModalButtons = this.getAddCareerModalButtons.bind(this);
    this.updateCareerSelect = this.updateCareerSelect.bind(this);
  }

  showAddCareerModal() {
    this.resetCareerForm();
    this.addCareerModal.showModal();
  }

  showRemoveCareerModal(id) {
    this.setState({ removeCareerClicked: id });
    this.removeCareerModal.showModal();
  }

  updateCareerSelect(newValue) {
    this.setState({
      ...this.state,
      selectedCareer: newValue != null ? newValue.value : -1
    });
  }

  resetCareerForm() {
    const formSelect = {
      error: false,
      message: ''
    };

    this.setState({ ...this.state, formSelect });
  }

  validarRolForm() {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (this.state.selectedCareer <= 0) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    } else {
      formSelect.error = false;
      formSelect.message = '';
    }

    this.setState({ ...this.state, formSelect });

    return formOk;
  }

  getAgregarRolModalBody() {
    const careersList = this.getCareersList();
    const selectRender = [];
    const options = [];

    careersList.forEach((careers) => {
      options.push({ value: careers.id, label: careers.name });
    }, this);
    selectRender.push(
      <Field
        validationState={this.state.formSelect.error ? 'error' : null}
        key="carreraField"
        bsSize="small"
        controlId="carreraSelect"
        label="Carrera"
        required
        validationMessage={this.state.formSelect.message}
        inputComponent={
          <Select
            key="carreraSelect"
            name="carreraelect"
            value={this.state.selectedCareer}
            options={options}
            id="carreraSelect"
            onChange={this.updateCareerSelect}
            placeholder="seleccioná un carrera"
          />
        }
      />
    );

    return selectRender;
  }

  getAddCareerModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="agregarButton"
        bsStyle="primary"
        bsSize="small"
        onClick={() => {
          if (this.validarRolForm()) {
            this.state.careers.push(
              this.getCareerById(this.state.selectedCareer)
            );
            this.addCareerModal.hideModal();
            this.props.refresh(this.state.careers);
          }
        }}
      >
        Guardar
      </Button>
    );

    return buttons;
  }

  getDeleteCareerModalBody() {
    return (
      <p>
        ¿Seguro querés eliminar el carrera{' '}
        {this.getCareerNameById(this.state.removeCareerClicked)}?
      </p>
    );
  }

  getDeleteCareerModalButtons() {
    const buttons = [];

    buttons.push(
      <Button
        key="borrarButton"
        bsStyle="danger"
        bsSize="small"
        onClick={() => {
          const filteredCareers = this.state.careers.filter(
            (career) => career.id !== this.state.removeCareerClicked
          );

          this.setState({
            ...this.state,
            careers: filteredCareers
          });
          this.removeCareerModal.hideModal();
          this.props.refresh(filteredCareers);
        }}
      >
        Eliminar
      </Button>
    );

    return buttons;
  }

  getCareerNameById(id) {
    const career =
      this.state.careers &&
      this.state.careers.find((element) => element.id === id);

    return career ? career.name : '';
  }

  getCareerById(id) {
    return this.props.careers.find((element) => element.id === id);
  }

  getCareersList() {
    const { careers } = this.props;

    return _.differenceBy(careers, this.state.careers, 'id');
  }

  getCareerTable() {
    if (this.state.careers.length !== 0) {
      return (
        <CustomTable
          data={this.state.careers}
          headers={['Nombre', 'Descripción']}
          actions={{
            removeAction: { action: this.showRemoveCareerModal }
          }}
        />
      );
    }

    return <Alert bsStyle="info">No posees carreras</Alert>;
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={8} md={8}>
            <h3>Carreras del usuario</h3>
          </Col>
          <Col lg={4} md={4}>
            {this.getCareersList().length !== 0 && (
              <Button
                bsStyle="success"
                bsSize="xsmall"
                className="pull-right"
                onClick={this.showAddCareerModal}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;
                </i>
                Agregar carrera
              </Button>
            )}
          </Col>
        </Row>
        {this.getCareerTable()}
        <Dialogue
          key="borrarRolModal"
          title="Borrar carrera"
          body={this.getDeleteCareerModalBody()}
          buttons={this.getDeleteCareerModalButtons()}
          ref={(removeCareerModal) => {
            this.removeCareerModal = removeCareerModal;
          }}
        />
        <Dialogue
          key="addCareerModal"
          title="Agregar carrera"
          body={this.getAgregarRolModalBody()}
          buttons={this.getAddCareerModalButtons()}
          ref={(addCareerModal) => {
            this.addCareerModal = addCareerModal;
          }}
        />
      </div>
    );
  }
}
