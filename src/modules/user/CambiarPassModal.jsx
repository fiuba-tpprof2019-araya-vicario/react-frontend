// import React from 'react'
// import ReactDOM from 'react-dom'
// import { connect } from 'react-redux'
// import { updateUsuario } from './userReducer'
// import { Button, FormControl } from 'react-bootstrap'
// import { CustomModal } from '../../utils/CustomModal'
// import { CustomFormField } from '../../utils/CustomFormField'

// export class CambiarPassModal extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       passForm: {
//         input: { error: false, mensaje: '' },
//         input2: { error: false, mensaje: '' }
//       }
//     }
//     this.abrirModal = this.abrirModal.bind(this)
//     this.resetPassForm = this.resetPassForm.bind(this)
//   }

//   resetPassForm() {
//     let passForm = {
//       input: { error: false, mensaje: '' },
//       input2: { error: false, mensaje: '' }
//     }
//     this.setState({ ...this.state, passForm: passForm })
//   }

//   validarCambiarPassForm(input, input2) {
//     let formOk = true

//     let passForm = {
//       input: { error: false, mensaje: '' },
//       input2: { error: false, mensaje: '' }
//     }

//     if (input == null || input == '') {
//       passForm.input.error = true
//       passForm.input.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       passForm.input.error = false
//       passForm.input.mensaje = ''
//     }

//     if (input2 == null || input2 == '') {
//       passForm.input2.error = true
//       passForm.input2.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       passForm.input2.error = false
//       passForm.input2.mensaje = ''
//     }

//     if (formOk && input != input2) {
//       passForm.input2.error = true
//       passForm.input2.mensaje = 'Las contraseñas no coinciden'
//       formOk = false
//     } else if (formOk) {
//       passForm.input2.error = false
//       passForm.input2.mensaje = ''
//     }
//     this.setState({ ...this.state, passForm: passForm })

//     return formOk
//   }

//   getCambiarPassModalBody() {
//     let body = []
//     body.push(<CustomFormField key="passfield1" validationState={this.state.passForm.input.error ? 'error' : null}
//       validationMessage={this.state.passForm.input.mensaje} bsSize="small" controlId="passInput"
//       label="Nueva contraseña" inputComponent={
//         <FormControl ref={passInput => { this.passInput = passInput }} id="passInput" key="passInput" bsSize="small"
//           type="password" placeholder="ingresá una contraseña"></FormControl>
//       }/>)
//     body.push(<CustomFormField key="passfield2" validationState={this.state.passForm.input2.error ? 'error' : null}
//       validationMessage={this.state.passForm.input2.mensaje} bsSize="small" controlId="pass2Input"
//       label="Verificar contraseña" inputComponent={
//         <FormControl ref={passInput2 => { this.passInput2 = passInput2 }} id="pass2Input" key="pass2Input" bsSize="small"
//           type="password" placeholder="verificá la contraseña"></FormControl>
//       }/>)
//     return body
//   }

//   getCambiarPassModalButtons() {
//     let buttons = []
//     buttons.push(<Button key={'cambiarPassButton'} bsStyle={'primary'} bsSize={'small'} onClick={() => {
//       let pass1 = ReactDOM.findDOMNode(this.passInput).value
//       let pass2 = ReactDOM.findDOMNode(this.passInput2).value
//       if (this.validarCambiarPassForm(pass1, pass2)) {
//         this.props.updateUsuario(
//           this.props.idUsuario,
//           pass1,
//           pass2)
//         this.modal.hideModal()
//       }
//     }}>Guardar</Button>)
//     return buttons
//   }

//   abrirModal() {
//     this.resetPassForm()
//     this.modal.showModal()
//   }

//   render() {
//     return (
//       <CustomModal key={'modal'} title={'Cambiar contraseña'} body={this.getCambiarPassModalBody()}
//         buttons={this.getCambiarPassModalButtons()} ref={(modal) => { this.modal = modal }} />
//     )
//   }
// }

// const mapDispatch = (dispatch) => ({
//   updateUsuario: (idUsuario, password, confirmacionPassword) => {
//     dispatch(updateUsuario(idUsuario, null, null, null, password, confirmacionPassword))
//   }
// })

// export default connect(null, mapDispatch, null , { withRef: true })(CambiarPassModal)
