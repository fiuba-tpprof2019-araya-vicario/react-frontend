import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import Center from 'react-center';
import { isValidEmail } from '../../utils/functions/funtions';
import LoadingModal from '../../utils/LoadingModal';
import MandatoryField from '../../utils/forms/MandatoryField';

export default class ContactForm extends React.Component {

  constructor() {
    super();
    this.state = {
      file: null,
      form: {
        email: { error: false, mensaje: '' },
        name: { error: false, mensaje: '' },
        description: { error: false, mensaje: '' },
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetForm() {
    let form = {
      email: { error: false, mensaje: '' },
      name: { error: false, mensaje: '' },
      description: { error: false, mensaje: '' },
    };
    this.setState({ ...this.state, form: form });
  }

  validateForm(email, name, description) {
    let formOk = true;

    let form = {
      email: { error: false, mensaje: '' },
      name: { error: false, mensaje: '' },
      description: { error: false, mensaje: '' },
    };

    if (email == null || email == '' || !isValidEmail(email)) {
      form.email.error = true;
      form.email.mensaje = 'Tenés que ingresar un mail de contacto valido';
      formOk = false;
    } else {
      form.email.error = false;
      form.email.mensaje = '';
    }

    if (name == null || name == '') {
      form.name.error = true;
      form.name.mensaje = 'Tenés que ingresar un nombre de contacto';
      formOk = false;
    } else {
      form.name.error = false;
      form.name.mensaje = '';
    }

    if (description == null || description == '') {
      form.description.error = true;
      form.description.mensaje = 'Tenés que ingresar la descripción del requerimiento';
      formOk = false;
    } else {
      form.description.error = false;
      form.description.mensaje = '';
    }

    this.setState({ ...this.state, form: form });

    return formOk;
  }

  onSubmit() {
    let email = ReactDOM.findDOMNode(this.emailInput).value;
    let name = ReactDOM.findDOMNode(this.nameInput).value;
    let description = ReactDOM.findDOMNode(this.descriptionInput).value;
    if (this.validateForm(email, name, description)) {
      this.props.uploadForm({email, name, description});
      this.resetForm();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading && <LoadingModal show={true}/>}
        <Row>
          <Row key={'uploadFormRow2'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.name.error)? 'error' : null}>
                <ControlLabel>Nombre de contacto <MandatoryField/></ControlLabel>
                <FormControl
                  disabled={this.props.user && this.props.user.email}
                  defaultValue={this.props.user ? this.props.user.name : ''}
                  ref={nameInput => { this.nameInput = nameInput; }} 
                  key="nameInput" 
                  type="text"
                  placeholder={'Ingrese nombre de contacto'}/>
              </FormGroup>
              {this.state.form.email.error &&
                <HelpBlock bsSize="small" >{this.state.form.name.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'uploadFormRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.email.error)? 'error' : null}>
                <ControlLabel>Mail de contacto <MandatoryField/></ControlLabel>
                <FormControl
                  disabled={this.props.user && this.props.user.email}
                  defaultValue={this.props.user ? this.props.user.email : ''}
                  ref={emailInput => { this.emailInput = emailInput; }}
                  key="emailInput"
                  type="email"
                  placeholder={'Ingrese un email (example@domain.com)'}/>
              </FormGroup>
              {this.state.form.email.error &&
                <HelpBlock bsSize="small" >{this.state.form.email.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'uploadFormRow3'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.description.error)? 'error' : null}>
                <ControlLabel>Descripción del requerimiento <MandatoryField/></ControlLabel>
                <textarea 
                  className="form-control"  
                  style={{resize:'vertical'}}
                  rows="10" 
                  ref={descriptionInput => { this.descriptionInput = descriptionInput;}} 
                  placeholder={'Ingrese la descripción...'}
                />
              </FormGroup>
              {this.state.form.email.error &&
                <HelpBlock bsSize="small" >{this.state.form.description.mensaje}</HelpBlock>}
            </Col>
          </Row>
        </Row>
        <Center>
          <Button key={'uploadFormButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>Enviar requerimiento</Button>
        </Center>
      </React.Fragment>
    );
  }
}