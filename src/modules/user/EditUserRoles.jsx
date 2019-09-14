// import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import _ from 'lodash'
// import { deleteRol, addRol } from './userReducer'

// import Select from 'react-select'
// import { Row, Col, Button, Alert, Glyphicon } from 'react-bootstrap'
// import { CustomModal } from '../../utils/CustomModal'
// import { CustomTable } from '../../utils/CustomTable'
// import { CustomFormField } from '../../utils/CustomFormField'

// export class EditarRolesUsuario extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       rolBorrarClickeado: -1,
//       rolSeleccionado: -1,
//       formSelect: { error: false, mensaje: ''}
//     }
//     this.abrirModalAgregarRol = this.abrirModalAgregarRol.bind(this)
//     this.abrirModalBorrarRol = this.abrirModalBorrarRol.bind(this)
//     this.getBorrarRolModalButtons = this.getBorrarRolModalButtons.bind(this)
//     this.getAgregarRolModalButtons = this.getAgregarRolModalButtons.bind(this)
//     this.updateRolSelect = this.updateRolSelect.bind(this)
//   }

//   abrirModalAgregarRol() {
//     this.resetRolForm()
//     this.modalAgregarRol.showModal()
//   }

//   abrirModalBorrarRol(id) {
//     this.setState({ rolBorrarClickeado: id })
//     this.modalBorrarRol.showModal()
//   }

//   updateRolSelect(newValue){
//     this.setState({
//       ...this.state,
//       rolSeleccionado: (newValue != null) ? newValue.value : -1
//     })
//   }

//   resetRolForm() {
//     let formSelect = {
//       error: false,
//       mensaje: ''
//     }
//     this.setState({ ...this.state, formSelect: formSelect })
//   }

//   validarRolForm(){
//     let formOk = true

//     let formSelect = {
//       error: false,
//       mensaje: ''
//     }

//     if (this.state.rolSeleccionado <= 0) {
//       formSelect.error = true
//       formSelect.mensaje = 'Este campo es obligatorio'
//       formOk = false
//     } else {
//       formSelect.error = false
//       formSelect.mensaje = ''
//     }

//     this.setState({ ...this.state, formSelect: formSelect })

//     return formOk
//   }

//   getAgregarRolModalBody() {
//     let rolesList = this.getRolesList(), selectRender = [], options = []
//     rolesList.forEach(function (roles) {
//       options.push({ value: roles.id, label: roles.nombre })
//     }, this)
//     selectRender.push(<CustomFormField validationState={this.state.formSelect.error ? 'error' : null}
//       key="rolField" bsSize="small" controlId="rolSelect" label="Rol" validationMessage={this.state.formSelect.mensaje}
//       inputComponent={
//         <Select key="rolSelect" name="rolSelect" value={this.state.rolSeleccionado}
//           options={options} id="rolSelect" onChange={this.updateRolSelect} placeholder="seleccioná un rol"/>
//       }/>)
//     return selectRender
//   }

//   getAgregarRolModalButtons() {
//     let buttons = []
//     buttons.push(<Button key={'agregarButton'} bsStyle={'primary'} bsSize={'small'} onClick={() => {
//       if (this.validarRolForm()) {
//         this.props.agregarRol(this.props.idUsuario, this.state.rolSeleccionado)
//         this.modalAgregarRol.hideModal()
//       }
//     }}>Guardar</Button>)
//     return buttons
//   }

//   getBorrarRolModalBody() {
//     return <p>¿Seguro querés eliminar el rol {this.getNombreRolById(this.state.rolBorrarClickeado)}?</p>
//   }

//   getBorrarRolModalButtons() {
//     let buttons = []
//     buttons.push(<Button key={'borrarButton'} bsStyle={'danger'} bsSize={'small'} onClick={() => {
//       this.props.removeRol(this.props.idUsuario, this.state.rolBorrarClickeado)
//       this.modalBorrarRol.hideModal()
//     }}>Eliminar</Button>)
//     return buttons
//   }

//   getNombreRolById(id) {
//     let nombre
//     this.props.activeUser.roles.forEach(function (element) {
//       if (element.id == id) {
//         nombre = element.nombre
//       }
//     }, this)
//     return nombre
//   }

//   getRolesList() {
//     let allRoles = this.props.allRoles
//     return _.differenceBy(allRoles, this.props.activeUser.roles, 'id')
//   }

//   getTablaRoles() {
//     if (this.props.activeUser.roles.length != 0) {
//       return <CustomTable data={this.props.activeUser.roles} headers={['Nombre', 'Descripción']} deleteAction={this.abrirModalBorrarRol} />
//     }
//     return <Alert bsStyle="info">No posees roles</Alert>
//   }

//   render() {
//     return (
//       <div>
//         <Row>
//           <Col lg={8} md={8}>
//             <h3>Roles del usuario</h3>
//           </Col>
//           <Col lg={4} md={4}>
//             {(this.getRolesList().length != 0) &&
//                 <Button bsStyle="success" bsSize="xsmall" className="pull-right" onClick={this.abrirModalAgregarRol}>
//                   <i className="fa fa-plus" aria-hidden="true">&nbsp;</i> Agregar rol
//                 </Button>}
//           </Col>
//         </Row>
//         {this.getTablaRoles()}
//         <CustomModal key={'borrarRolModal'} title={'Borrar rol'} body={this.getBorrarRolModalBody()} buttons={this.getBorrarRolModalButtons()} ref={(modalBorrarRol) => { this.modalBorrarRol = modalBorrarRol }} />
//         <CustomModal key={'agregarRolModal'} title={'Agregar rol'} body={this.getAgregarRolModalBody()} buttons={this.getAgregarRolModalButtons()} ref={(modalAgregarRol) => { this.modalAgregarRol = modalAgregarRol }} />
//       </div>
//     )
//   }
// }

// const mapDispatch = (dispatch) => ({
//   agregarRol: (idUsuario, idRol) => {
//     dispatch(addRol(idUsuario, idRol))
//   },
//   removeRol: (idUsuario, idRol) => {
//     dispatch(deleteRol(idUsuario, idRol))
//   }
// })

// const mapStateToProps = (state, ownProps) => {
//   return {
//     idUsuario: ownProps.match.params.id,
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatch)(EditarRolesUsuario))
