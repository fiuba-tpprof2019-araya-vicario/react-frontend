import 'rc-slider/assets/index.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import ScoreSlider from '../../utils/forms/ScoreSlider';
import Table from '../../utils/Table';
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
      selectedScore: 0,
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

  resetInterestForm = () => {
    this.setState({
      formSelect: {
        error: false,
        message: ''
      },
      selectedScore: 0
    });
  };

  validarRolForm = () => {
    let formOk = true;

    const formSelect = {
      error: false,
      message: ''
    };

    if (this.state.selectedInterest <= 0) {
      formSelect.error = true;
      formSelect.message = 'Este campo es obligatorio';
      formOk = false;
    }

    this.setState({ formSelect });

    return formOk;
  };

  getAgregarRolModalBody = () => {
    const { selectedInterest, selectedScore, formSelect } = this.state;

    return [
      <Field
        validationState={formSelect.error}
        key="interesField"
        bsSize="small"
        controlId="interesSelect"
        label="Interes"
        required
        validationMessage={formSelect.message}
        inputComponent={
          <Select
            key="interesSelect"
            name="intereselect"
            isClearable={false}
            value={selectedInterest}
            options={this.getInterestsList().map((interests) => ({
              value: interests.id,
              label: interests.name
            }))}
            id="interesSelect"
            onChange={this.updateInterestSelect}
            placeholder="seleccioná un interes"
          />
        }
      />,
      <br key="space" />,
      <Row key="scoreField">
        <Col md={12}>
          <Field
            key="interesScore"
            controlId="scoreSelect"
            label="Puntaje"
            required
            inputComponent={
              <ScoreSlider
                disabled={selectedInterest < 0}
                value={selectedScore}
                onChange={(value) => this.setState({ selectedScore: value })}
              />
            }
          />
        </Col>
      </Row>
    ];
  };

  getAddInterestModalButtons = () => (
    <Button
      key="agregarButton"
      bsStyle="primary"
      bsSize="small"
      onClick={() => {
        if (this.validarRolForm()) {
          this.state.interests.push({
            ...this.getInterestById(this.state.selectedInterest),
            score: this.state.selectedScore
          });
          this.addInterestModal.hideModal();
          this.props.refresh(this.state.interests);
        }
      }}
    >
      Guardar
    </Button>
  );

  getDeleteInterestModalBody = () => (
    <p>
      ¿Seguro querés eliminar el interes{' '}
      {this.getInterestNameById(this.state.removeInterestClicked)}?
    </p>
  );

  getDeleteInterestModalButtons = () => (
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

  getInterestNameById = (id) => {
    const interest =
      this.state.interests &&
      this.state.interests.find((element) => element.id === id);

    return interest ? interest.name : '';
  };

  getInterestById = (id) =>
    this.props.interests.find((element) => element.id === id);

  getInterestsList = () =>
    _.differenceBy(this.props.interests, this.state.interests, 'id');

  getInterestTable = () => {
    if (this.state.interests.length !== 0) {
      return (
        <Table
          key="table"
          data={this.state.interests}
          headers={['Nombre', 'Puntaje']}
          actions={{
            removeAction: { action: this.showRemoveInterestModal }
          }}
        />
      );
    }

    return <Alert bsStyle="info">No posees intereses</Alert>;
  };

  render() {
    return (
      <div>
        <Row key="header">
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
