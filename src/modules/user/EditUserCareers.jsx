import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import Table from '../../utils/Table';
import Dialogue from '../../utils/Dialogue';
import Field from '../../utils/forms/Field';
import { getDifferenceById, getById } from '../../utils/services/functions';

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
      selectedCareer: null,
      formSelect: { error: false, message: '' },
      careers: props.activeUser.careers
    };
  }

  showAddCareerModal = () => {
    this.resetCareerForm();
    this.addCareerModal.showModal();
  };

  showRemoveCareerModal = (id) => {
    this.setState({ removeCareerClicked: id });
    this.removeCareerModal.showModal();
  };

  updateCareerSelect = (newValue) => {
    this.setState({ selectedCareer: newValue });
  };

  resetCareerForm() {
    const formSelect = {
      error: false,
      message: ''
    };

    this.setState({ formSelect });
  }

  isValidForm() {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (!this.state.selectedCareer) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    }

    this.setState({ formSelect });

    return formOk;
  }

  getAddModalBody() {
    const careersList = this.getCareersList();
    const selectRender = [];
    const options = [];

    careersList.forEach((careers) => {
      options.push({ value: careers.id, label: careers.name });
    }, this);
    selectRender.push(
      <Field
        validationState={this.state.formSelect.error}
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
            isClearable={false}
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

  getAddCareerModalButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="addButton"
        bsStyle="primary"
        bsSize="small"
        onClick={() => {
          if (this.isValidForm()) {
            this.state.careers.push(
              this.getCareerById(this.state.selectedCareer.value)
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
  };

  getDeleteCareerModalBody() {
    return (
      <p>
        ¿Seguro querés eliminar el carrera{' '}
        {this.getCareerNameById(this.state.removeCareerClicked)}?
      </p>
    );
  }

  getDeleteCareerModalButtons = () => {
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

          this.setState({ careers: filteredCareers });
          this.removeCareerModal.hideModal();
          this.props.refresh(filteredCareers);
        }}
      >
        Eliminar
      </Button>
    );

    return buttons;
  };

  getCareerNameById = (id) => {
    const career =
      this.state.careers &&
      this.state.careers.find((element) => element.id === id);

    return career ? career.name : '';
  };

  getCareerById = (id) => getById(this.props.careers, id);

  getCareersList = () =>
    getDifferenceById(this.props.careers, this.state.careers);

  getCareerTable() {
    if (this.state.careers.length !== 0) {
      return (
        <Table
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
          body={this.getAddModalBody()}
          buttons={this.getAddCareerModalButtons()}
          ref={(addCareerModal) => {
            this.addCareerModal = addCareerModal;
          }}
        />
      </div>
    );
  }
}
