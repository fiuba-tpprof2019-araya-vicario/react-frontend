/* eslint-disable react/no-find-dom-node */
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import Center from 'react-center';
import { isValidEmail } from '../../utils/services/functions';
import MandatoryField from '../../utils/forms/MandatoryField';

export default class ContactForm extends React.Component {
  static propTypes = {
    uploadForm: PropTypes.func,
    user: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      form: {
        email: { error: false, message: '' },
        name: { error: false, message: '' },
        description: { error: false, message: '' }
      }
    };
  }

  resetForm() {
    const form = {
      email: { error: false, message: '' },
      name: { error: false, message: '' },
      description: { error: false, message: '' }
    };

    this.setState({ form });
  }

  validateForm(email, name, description) {
    let formOk = true;

    const form = {
      email: { error: false, message: '' },
      name: { error: false, message: '' },
      description: { error: false, message: '' }
    };

    if (email == null || email === '' || !isValidEmail(email)) {
      form.email.error = true;
      form.email.message = 'Tenés que ingresar un mail de contacto valido';
      formOk = false;
    }

    if (!name) {
      form.name.error = true;
      form.name.message = 'Tenés que ingresar un nombre de contacto';
      formOk = false;
    }

    if (!description) {
      form.description.error = true;
      form.description.message =
        'Tenés que ingresar la descripción del requerimiento';
      formOk = false;
    }

    this.setState({ form });

    return formOk;
  }

  onSubmit = () => {
    const email = ReactDOM.findDOMNode(this.emailInput).value.trim();
    const name = ReactDOM.findDOMNode(this.nameInput).value.trim();
    const description = ReactDOM.findDOMNode(
      this.descriptionInput
    ).value.trim();

    if (this.validateForm(email, name, description)) {
      this.props.uploadForm({ email, name, description });
      this.resetForm();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Row key="uploadFormRow2">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={this.state.form.name.error ? 'error' : null}
              >
                <ControlLabel>
                  Nombre de contacto <MandatoryField />
                </ControlLabel>
                <FormControl
                  disabled={this.props.user && this.props.user.name}
                  defaultValue={this.props.user ? this.props.user.name : ''}
                  ref={(nameInput) => {
                    this.nameInput = nameInput;
                  }}
                  key="nameInput"
                  type="text"
                  placeholder="Ingrese nombre de contacto"
                />
              </FormGroup>
              <HelpBlock
                display-if={this.state.form.email.error}
                bsSize="small"
              >
                {this.state.form.name.message}
              </HelpBlock>
            </Col>
          </Row>
          <Row key="uploadFormRow1">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={this.state.form.email.error ? 'error' : null}
              >
                <ControlLabel>
                  Mail de contacto <MandatoryField />
                </ControlLabel>
                <FormControl
                  disabled={this.props.user && this.props.user.email}
                  defaultValue={this.props.user ? this.props.user.email : ''}
                  ref={(emailInput) => {
                    this.emailInput = emailInput;
                  }}
                  key="emailInput"
                  type="email"
                  placeholder="Ingrese un email (example@domain.com)"
                />
              </FormGroup>
              {this.state.form.email.error && (
                <HelpBlock bsSize="small">
                  {this.state.form.email.message}
                </HelpBlock>
              )}
            </Col>
          </Row>
          <Row key="uploadFormRow3">
            <Col md={12} lg={12}>
              <FormGroup
                validationState={
                  this.state.form.description.error ? 'error' : null
                }
              >
                <ControlLabel>
                  Descripción del requerimiento <MandatoryField />
                </ControlLabel>
                <textarea
                  className="form-control"
                  style={{ resize: 'vertical' }}
                  rows="10"
                  ref={(descriptionInput) => {
                    this.descriptionInput = descriptionInput;
                  }}
                  placeholder="Ingrese la descripción..."
                />
              </FormGroup>
              {this.state.form.email.error && (
                <HelpBlock bsSize="small">
                  {this.state.form.description.message}
                </HelpBlock>
              )}
            </Col>
          </Row>
        </Row>
        <Center>
          <Button
            key="uploadFormButton"
            bsSize="small"
            bsStyle="primary"
            onClick={this.onSubmit}
          >
            Enviar contacto
          </Button>
        </Center>
      </React.Fragment>
    );
  }
}
