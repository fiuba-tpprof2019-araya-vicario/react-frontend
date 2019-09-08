// import React from 'react'
// import ReactDOM from 'react-dom'
// import { connect } from 'react-redux'
// import { updateUsuario } from './userReducer'
// import { getOrganismoSelectOptions } from '../../utils/utils'

// import Select from 'react-select'
// import { Row, Col, FormControl } from 'react-bootstrap'
// import { CustomFormField } from '../../utils/CustomFormField'

// export class EditarUsuarioForm extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       ready: false,
//       updateForm: {
//         nombre: { error: false, mensaje: '' },
//         email: { error: false, mensaje: '' },
//         organismo: { seleccionado: props.activeUser.organismo.id, error: false, mensaje: ''}
//       }
//     }
//     this.updateOrganismoSelect = this.updateOrganismoSelect.bind(this)
//     this.editarUsuarioSubmit = this.editarUsuarioSubmit.bind(this)
//   }

//   resetUpdateForm() {
//     let updateForm = {
//       nombre: { error: false, mensaje: '' },
//       email: { error: false, mensaje: '' },
//       organismo: { error: false, mensaje: '', seleccionado: this.state.organismo.seleccionado},
//     }
//     this.setState({ ...this.state, updateForm: updateForm })
//   }

//   validarUpdateForm(nombre, email) {
//     let formOk = true

//     let updateForm = {
//       nombre: { error: false, mensaje: '' },
//       email: { error: false, mensaje: '' },
//       organismo: this.state.updateForm.organismo
//     }

//     if (nombre == null || nombre == '') {
//       updateForm.nombre.error = true
//       updateForm.nombre.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       updateForm.nombre.error = false
//       updateForm.nombre.mensaje = ''
//     }

//     if (email == null || email == '') {
//       updateForm.email.error = true
//       updateForm.email.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       updateForm.email.error = false
//       updateForm.email.mensaje = ''
//     }

//     if (this.state.updateForm.organismo.seleccionado <= 0) {
//       updateForm.organismo.error = true
//       updateForm.organismo.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       updateForm.organismo.error = false
//       updateForm.organismo.mensaje = ''
//     }

//     this.setState({ ...this.state, updateForm: updateForm })

//     return formOk
//   }

//   updateOrganismoSelect (newValue) {
//     let newUpdateForm = {...this.state.updateForm}
//     newUpdateForm.organismo.seleccionado = (newValue != null) ? newValue.value : -1
//     this.setState({
//       ...this.state,
//       updateForm: newUpdateForm
//     })
//   }

//   editarUsuarioSubmit () {
//     if (this.validarUpdateForm(ReactDOM.findDOMNode(this.nombreInput).value,
//       ReactDOM.findDOMNode(this.emailInput).value)) {
//       this.props.updateUsuario(
//         this.props.activeUser.id,
//         ReactDOM.findDOMNode(this.nombreInput).value,
//         this.state.updateForm.organismo.seleccionado,
//         ReactDOM.findDOMNode(this.emailInput).value,
//         null, null)
//     }
//   }

//   render() {
//     return (
//       <form>
//         <Row>
//           <Col lg={4} md={4}>
//             <CustomFormField  validationState={this.state.updateForm.nombre.error ? 'error' : null}
//               validationMessage={this.state.updateForm.nombre.mensaje} bsSize="small" controlId="nombre"
//               label="Nombre" inputComponent={
//                 <FormControl defaultValue={this.props.activeUser.nombre} key="nombreInput" bsSize="small"
//                   ref={nombreInput => { this.nombreInput = nombreInput }} type="text"></FormControl>
//               }/>
//           </Col>
//           <Col lg={4} md={4}>
//             <CustomFormField validationState={this.state.updateForm.organismo.error ? 'error' : null}
//               validationMessage={this.state.updateForm.organismo.mensaje} bsSize="small" controlId="organismoSelect" label="Organismo"
//               inputComponent={
//                 <Select name="organismoSelect" value={this.state.updateForm.organismo.seleccionado}
//                   options={getOrganismoSelectOptions(this.props.allOrganismos,true)} id="organismoSelect"
//                   key="organismoSelect" onChange={this.updateOrganismoSelect} placeholder="Seleccioná un organismo"/>
//               }/>
//           </Col>
//           <Col lg={4} md={4}>
//             <CustomFormField  validationState={this.state.updateForm.email.error ? 'error' : null}
//               validationMessage={this.state.updateForm.email.mensaje} bsSize="small" controlId="email"
//               label="Email" inputComponent={
//                 <FormControl defaultValue={this.props.activeUser.email} key="emailInput" bsSize="small"
//                   ref={emailInput => { this.emailInput = emailInput }} type="text"></FormControl>
//               }/>
//           </Col>
//         </Row>
//       </form>
//     )
//   }
// }

// const mapDispatch = (dispatch) => ({
//   updateUsuario: (idUsuario, nombreUsuario, organismo, email, password, confirmacionPassword) => {
//     dispatch(updateUsuario(idUsuario, nombreUsuario, organismo, email, password, confirmacionPassword))
//   }
// })

// export default connect(null, mapDispatch, null, { withRef: true } )(EditarUsuarioForm)
