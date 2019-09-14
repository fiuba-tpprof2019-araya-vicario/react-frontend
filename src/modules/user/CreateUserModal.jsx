// import React from 'react'
// import ReactDOM from 'react-dom'
// import { connect } from 'react-redux'
// import { Row, Col, Button, FormControl } from 'react-bootstrap'
// import { createUsuario } from './userReducer'
// import { getOrganismoSelectOptions } from '../../utils/utils'
// import { CustomModal } from '../../utils/CustomModal'
// import { CustomFormField } from '../../utils/CustomFormField'
// import Select from 'react-select'

// export class CrearUsuarioModal extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       createForm: {
//         nombre: { error: false, mensaje: '' },
//         email: { error: false, mensaje: '' },
//         email2: { error: false, mensaje: '' },
//         pass: { error: false, mensaje: '' },
//         pass2: { error: false, mensaje: '' },
//         organismo: { seleccionado: -1, error: false, mensaje: '' }
//       }
//     }
//     this.updateOrganismoSelect = this.updateOrganismoSelect.bind(this)
//     this.abrirModal = this.abrirModal.bind(this)
//   }

//   resetCreateForm() {
//     let createForm = {
//       nombre: { error: false, mensaje: '' },
//       email: { error: false, mensaje: '' },
//       email2: { error: false, mensaje: '' },
//       pass: { error: false, mensaje: '' },
//       pass2: { error: false, mensaje: '' },
//       organismo: { seleccionado: -1 }
//     }
//     this.setState({ ...this.state, createForm: createForm })
//   }

//   validarCreateForm(nombre,email, email2, pass, pass2) {
//     let formOk = true

//     let createForm = {
//       nombre: { error: false, mensaje: '' },
//       email: { error: false, mensaje: '' },
//       email2: { error: false, mensaje: '' },
//       pass: { error: false, mensaje: '' },
//       pass2: { error: false, mensaje: '' },
//       organismo: { seleccionado: this.state.createForm.organismo.seleccionado, error: false, mensaje: '' }
//     }

//     if (nombre == null || nombre == '') {
//       createForm.nombre.error = true
//       createForm.nombre.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.nombre.error = false
//       createForm.nombre.mensaje = ''
//     }

//     if (this.state.createForm.organismo.seleccionado <= 0) {
//       createForm.organismo.error = true
//       createForm.organismo.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.organismo.error = false
//       createForm.organismo.mensaje = ''
//     }

//     if (email == null || email == '') {
//       createForm.email.error = true
//       createForm.email.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.email.error = false
//       createForm.email.mensaje = ''
//     }

//     if (email2 == null || email2 == '') {
//       createForm.email2.error = true
//       createForm.email2.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.email2.error = false
//       createForm.email2.mensaje = ''
//     }

//     if (formOk && email != email2) {
//       createForm.email2.error = true
//       createForm.email2.mensaje = 'Los emails no coinciden'
//       formOk = false
//     } else if (formOk) {
//       createForm.email2.error = false
//       createForm.email2.mensaje = ''
//     }

//     if (pass == null || pass == '') {
//       createForm.pass.error = true
//       createForm.pass.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.pass.error = false
//       createForm.pass.mensaje = ''
//     }

//     if (pass2 == null || pass2 == '') {
//       createForm.pass2.error = true
//       createForm.pass2.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       createForm.pass2.error = false
//       createForm.pass2.mensaje = ''
//     }

//     if (formOk && pass != pass2) {
//       createForm.pass2.error = true
//       createForm.pass2.mensaje = 'Las contraseñas no coinciden'
//       formOk = false
//     } else if (formOk) {
//       createForm.pass2.error = false
//       createForm.pass2.mensaje = ''
//     }

//     this.setState({ ...this.state, createForm: createForm })

//     return formOk
//   }

//   abrirModal() {
//     this.resetCreateForm()
//     this.modal.showModal()
//   }

//   getOrganismos() {
//     return getOrganismoSelectOptions(this.props.allOrganismos,true)
//   }

//   updateOrganismoSelect (newValue) {
//     let newCreateForm = {...this.state.createForm}
//     newCreateForm.organismo.seleccionado = (newValue != null) ? newValue.value : -1
//     this.setState({
//       ...this.state,
//       createForm: newCreateForm
//     })
//   }

//   getCrearModalBody() {
//     let body = []
//     body.push(<Row key={'formCreateRow1'}>
//       <Col lg={6}>
//         <CustomFormField key="nombreGroup" validationState={this.state.createForm.nombre.error ? 'error' : null}
//           validationMessage={this.state.createForm.nombre.mensaje} bsSize="small" controlId="nombreInput"
//           label="Nombre" inputComponent={
//             <FormControl ref={nombreInput => { this.nombreInput = nombreInput }} key="nombreInput" bsSize="small"
//               type="text" placeholder="ingresá un nombre"></FormControl>}
//         />
//       </Col>
//       <Col lg={6}>
//         <CustomFormField key="organismoGroup" validationState={this.state.createForm.organismo.error ? 'error' : null}
//           bsSize="small" controlId="organismoSelect" validationMessage={this.state.createForm.organismo.mensaje}
//           label="Organismo" inputComponent={
//             <Select key="organismoSelect" value={this.state.createForm.organismo.seleccionado}
//               options={this.getOrganismos()} id="organismoSelect" onChange={this.updateOrganismoSelect}
//               placeholder="seleccioná un organismo" name="organismoSelect" />
//           }/>
//       </Col>
//     </Row>)

//     body.push(<Row key={'formCreateRow2'}>
//       <Col lg={6}>
//         <CustomFormField key="emailGroup" validationState={this.state.createForm.email.error ? 'error' : null}
//           validationMessage={this.state.createForm.email.mensaje} bsSize="small" controlId="emailInput"
//           label="Email" inputComponent={
//             <FormControl ref={emailInput => { this.emailInput = emailInput }} key="emailInput" bsSize="small"
//               type="text" placeholder="ingresá una dirección de email"></FormControl>}
//         />
//       </Col>
//       <Col lg={6}>
//         <CustomFormField key="verificarEmailGroup" validationState={this.state.createForm.email2.error ? 'error' : null}
//           validationMessage={this.state.createForm.email2.mensaje} bsSize="small" controlId="verificarEmailInput"
//           label="Verificar email" inputComponent={
//             <FormControl ref={verificarEmailInput => { this.verificarEmailInput = verificarEmailInput }}
//               bsSize="small" type="text" placeholder="verificá el email" key="verificarEmailInput"></FormControl>}
//         />
//       </Col>
//     </Row>)
//     body.push(<Row key={'formCreateRow3'}>
//       <Col lg={6}>
//         <CustomFormField key="passGroup" validationState={this.state.createForm.pass.error ? 'error' : null}
//           validationMessage={this.state.createForm.pass.mensaje} bsSize="small" controlId="passInput"
//           label="Contraseña" inputComponent={
//             <FormControl ref={passInput => { this.passInput = passInput }}
//               bsSize="small" type="password" placeholder="ingresá una contraseña" key="passInput"></FormControl>}
//         />
//       </Col>
//       <Col lg={6}>
//         <CustomFormField key="pass2Group" validationState={this.state.createForm.pass2.error ? 'error' : null}
//           validationMessage={this.state.createForm.pass2.mensaje} bsSize="small" controlId="pass2Input"
//           label="Verificar contraseña" inputComponent={
//             <FormControl ref={passInput2 => { this.passInput2 = passInput2 }}
//               bsSize="small" type="password" placeholder="verificá la contraseña" key="pass2Input"></FormControl>}
//         />
//       </Col>
//     </Row>)
//     return body
//   }

//   getCrearModalButtons() {
//     let buttons = []
//     buttons.push(<Button key={'createUsuarioButton'} bsSize={'small'} bsStyle={'primary'} onClick={() => {
//       let nombre = ReactDOM.findDOMNode(this.nombreInput).value
//       let email = ReactDOM.findDOMNode(this.emailInput).value
//       let email2 = ReactDOM.findDOMNode(this.verificarEmailInput).value
//       let pass = ReactDOM.findDOMNode(this.passInput).value
//       let pass2 = ReactDOM.findDOMNode(this.passInput2).value

//       if(this.validarCreateForm(nombre, email, email2, pass, pass2)){
//         this.props.createUsuario(nombre, email, email2, this.state.createForm.organismo.seleccionado, pass, pass2)
//         this.modal.hideModal()
//       }
//     }}>Guardar</Button>)

//     return buttons
//   }

//   render() {
//     return (
//       <CustomModal key={'nuevoUsuarioModal'} title={'Nuevo usuario'} body={this.getCrearModalBody()}
//         buttons={this.getCrearModalButtons()} ref={(modal) => { this.modal = modal }} />
//     )
//   }
// }

// const mapDispatch = (dispatch) => ({
//   createUsuario: (nombreUsuario, email, verificarEmail, organismo, password, confirmacionPassword) => {
//     dispatch(createUsuario(nombreUsuario, email, verificarEmail, organismo, password, confirmacionPassword))
//   }
// })

// export default connect(null, mapDispatch, null , { withRef: true })(CrearUsuarioModal)
