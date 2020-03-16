import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { CustomTable } from '../../utils/CustomTable';
import Dialogue from '../../utils/Dialogue';
import Field from '../../utils/forms/Field';

export default class EditMyUserInterests extends React.Component {
  static propTypes = {
    interests: PropTypes.array,
    userInterests: PropTypes.array,
    refresh: PropTypes.func
  };

  constructor(props) {
    super();
    this.state = {
      removeInterestClicked: -1,
      selectedInterest: -1,
      formSelect: { error: false, message: '' },
      interests: props.userInterests
    };
  }

  showAddInterestModal = () => {
    this.resetInterestForm();
    this.addInterestModal.showModal();
  };

  showRemoveInterestModal = (id) => {
    this.setState({ removeInterestClicked: id });
    this.removeInterestModal.showModal();
  };

  updateInterestSelect = (newValue) => {
    this.setState({ selectedInterest: newValue != null ? newValue.value : -1 });
  };

  updateScoreSelect = (newValue) => {
    this.setState({ selectedScore: newValue != null ? newValue.value : -1 });
  };

  resetInterestForm() {
    const formSelect = {
      error: false,
      message: ''
    };

    this.setState({ formSelect });
  }

  validarRolForm() {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (this.state.selectedInterest <= 0) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    } else {
      formSelect.error = false;
      formSelect.message = '';
    }

    this.setState({ formSelect });

    return formOk;
  }

  getAgregarRolModalBody() {
    const interestsList = this.getInterestsList();
    const selectRender = [];
    const options = [];

    interestsList.forEach((interests) => {
      options.push({ value: interests.id, label: interests.name });
    }, this);
    selectRender.push(
      <Field
        validationState={this.state.formSelect.error}
        key="interesField"
        bsSize="small"
        controlId="interesSelect"
        label="Interes"
        required
        validationMessage={this.state.formSelect.message}
        inputComponent={
          <Select
            key="interesSelect"
            name="intereselect"
            clearable={false}
            value={this.state.selectedInterest}
            options={options}
            id="interesSelect"
            onChange={this.updateInterestSelect}
            placeholder="seleccioná un interes"
          />
        }
      />
    );
    selectRender.push(
      <Field
        validationState={this.state.formSelect.error}
        key="scoreField"
        bsSize="small"
        controlId="interesSelect"
        label="Interes"
        required
        validationMessage={this.state.formSelect.message}
        inputComponent={
          <FormControl
            type="range"
            min="0"
            max="5"
            value={this.state.selectedScore}
            title="Selecciona un puntaje"
            placeholder="Ingrese un puntaje de 0 a 5"
            onChange={this.updateScoreSelect}
          />
        }
      />
    );

    return selectRender;
  }

  getAddInterestModalButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="agregarButton"
        bsStyle="primary"
        bsSize="small"
        onClick={() => {
          if (this.validarRolForm()) {
            this.state.interests.push(
              this.getInterestById(this.state.selectedInterest)
            );
            this.addInterestModal.hideModal();
            this.props.refresh(this.state.interests);
          }
        }}
      >
        Guardar
      </Button>
    );

    return buttons;
  };

  getDeleteInterestModalBody() {
    return (
      <p>
        ¿Seguro querés eliminar el interes{' '}
        {this.getInterestNameById(this.state.removeInterestClicked)}?
      </p>
    );
  }

  getDeleteInterestModalButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="borrarButton"
        bsStyle="danger"
        bsSize="small"
        onClick={() => {
          const filteredInterests = this.state.interests.filter(
            (interest) => interest.id !== this.state.removeInterestClicked
          );

          this.setState({ interests: filteredInterests });
          this.removeInterestModal.hideModal();
          this.props.refresh(filteredInterests);
        }}
      >
        Eliminar
      </Button>
    );

    return buttons;
  };

  getInterestNameById(id) {
    const interest =
      this.state.interests &&
      this.state.interests.find((element) => element.id === id);

    return interest ? interest.name : '';
  }

  getInterestById(id) {
    return this.props.interests.find((element) => element.id === id);
  }

  getInterestsList() {
    const { interests } = this.props;

    return _.differenceBy(interests, this.state.interests, 'id');
  }

  getInterestTable() {
    if (this.state.interests.length !== 0) {
      return (
        <CustomTable
          data={this.state.interests}
          headers={['Nombre', 'Descripción', 'Puntaje']}
          actions={{
            removeAction: { action: this.showRemoveInterestModal }
          }}
        />
      );
    }

    return <Alert bsStyle="info">No posees intereses</Alert>;
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={8} md={8}>
            <h3>Mis intereses</h3>
          </Col>
          <Col lg={4} md={4}>
            {this.getInterestsList().length !== 0 && (
              <Button
                bsStyle="success"
                bsSize="xsmall"
                className="pull-right"
                onClick={this.showAddInterestModal}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;
                </i>
                Agregar interés
              </Button>
            )}
          </Col>
        </Row>
        {this.getInterestTable()}
        <Dialogue
          key="borrarRolModal"
          title="Borrar interes"
          body={this.getDeleteInterestModalBody()}
          buttons={this.getDeleteInterestModalButtons()}
          ref={(removeInterestModal) => {
            this.removeInterestModal = removeInterestModal;
          }}
        />
        <Dialogue
          key="addInterestModal"
          title="Agregar interes"
          body={this.getAgregarRolModalBody()}
          buttons={this.getAddInterestModalButtons()}
          ref={(addInterestModal) => {
            this.addInterestModal = addInterestModal;
          }}
        />
      </div>
    );
  }
}
