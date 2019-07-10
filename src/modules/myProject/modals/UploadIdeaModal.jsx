import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, FormControl, FormGroup, ControlLabel, HelpBlock, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Field from '../../../utils/Field';
import MandatoryField from '../../../utils/forms/MandatoryField';

export default class UploadIdeaModal extends React.Component {

  constructor() {
    super();
    this.state = {
      file: null,
      form: {
        description: { error: false, mensaje: '' },
        autor: { error: false, mensaje: '' },
        title: { error: false, mensaje: '' },
      },
      coautors: []
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateAutorsSelect = this.updateAutorsSelect.bind(this);
  }

  updateAutorsSelect(newValue) {
    this.setState({
      ...this.state, 
      coautors: newValue,
    });
  }

  resetForm() {
    let form = {
      description: { error: false, mensaje: '' },
      autor: { error: false, mensaje: '' },
      title: { error: false, mensaje: '' }
    };
    this.setState({ ...this.state, form: form });
  }

  validateForm(title, description, autor) {
    let formOk = true;

    let form = {
      description: { error: false, mensaje: '' },
      autor: { error: false, mensaje: '' },
      title: { error: false, mensaje: '' }
    };

    if (title == null || title == '') {
      form.title.error = true;
      form.title.mensaje = 'Tenés que ingresar el título de tu idea';
      formOk = false;
    } else {
      form.title.error = false;
      form.title.mensaje = '';
    }

    if (description == null || description == '') {
      form.description.error = true;
      form.description.mensaje = 'Tenés que ingresar la descripción de tu idea';
      formOk = false;
    } else {
      form.description.error = false;
      form.description.mensaje = '';
    }

    if (autor == null || autor == '') {
      form.autor.error = true;
      form.autor.mensaje = 'Tenés que ingresar el autor de la idea';
      formOk = false;
    } else {
      form.autor.error = false;
      form.autor.mensaje = '';
    }

    this.setState({ ...this.state, form: form });

    return formOk;
  }

  showModal() {
    this.resetForm();
    this.setState({ show: true });
  }

  hideModal() {
    this.resetForm();
    this.setState({ show: false });
  }

  onSubmit() {
    let description = ReactDOM.findDOMNode(this.descriptionInput).value;
    let autor = ReactDOM.findDOMNode(this.autorInput).value;
    if (this.validateForm(description, autor)) {
      this.props.uploadIdea(description, autor);
      this.hideModal();
    }
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Crear idea a alto nivel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row key={'formCreateRow0'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.title.error)? 'error' : null}>
                <ControlLabel>Título<MandatoryField/></ControlLabel>
                <FormControl 
                  ref={titleInput => { this.titleInput = titleInput; }}
                  key="titleInput"
                  placeholder={'Ingrese un título para tu idea'}
                  type="text"/>
              </FormGroup>
              {this.state.form.title.error &&
                <HelpBlock bsSize="small" >{this.state.form.title.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'formCreateRow1'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.autor.error)? 'error' : null}>
                <ControlLabel>Autor<MandatoryField/></ControlLabel>
                <FormControl 
                  defaultValue={this.props.user ? this.props.user.name : ''}
                  disabled={this.props.user && this.props.user.name}
                  ref={autorInput => { this.autorInput = autorInput; }}
                  key="autorInput"
                  type="text"/>
              </FormGroup>
              {this.state.form.autor.error &&
                <HelpBlock bsSize="small" >{this.state.form.autor.mensaje}</HelpBlock>}
            </Col>
          </Row>
          <Row key={'formCreateRow2'}>
            <Col md={12} lg={12}>
              <Field key="coautorsGroup" bsSize="small" controlId="coautorsSelect" label="Coautores"
                inputComponent=
                  {<Select 
                    key="coautorsSelect" 
                    value={[]}
                    ref={coautorsSelect => { this.coautorsSelect = coautorsSelect; }} 
                    onChange={ (e) => this.updateAutorsSelect(e) }
                    options={this.props.coautors}
                    isSearchable={true}
                    id="coautorsSelect"
                    placeholder="Seleccione coautores"
                    name="coautorsSelect"
                    multi={true}/>
                  }/>
            </Col>
          </Row>
          <Row key={'formCreateRow3'}>
            <Col md={12} lg={12}>
              <FormGroup validationState={(this.state.form.description.error)? 'error' : null}>
                <ControlLabel>Descripción de la idea<MandatoryField/></ControlLabel>
                <textarea 
                  className="form-control"  
                  style={{resize:'vertical'}}
                  rows="10" 
                  ref={descriptionInput => { this.descriptionInput = descriptionInput;}} 
                  placeholder={'Ingrese una descripción de tu idea...'}
                />
              </FormGroup>
              {this.state.form.description.error &&
                <HelpBlock bsSize="small" >{this.state.form.description.mensaje}</HelpBlock>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize={'small'} onClick={this.hideModal}>Cancelar</Button>&nbsp;
          <Button key={'createFileButton'} bsSize={'small'} bsStyle={'primary'} onClick={this.onSubmit}>Crear</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}