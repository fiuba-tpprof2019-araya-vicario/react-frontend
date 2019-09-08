// import React from 'react'
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

// import history from '../../history'
// import { getUsuarioById, clearAlert } from './userReducer'
// import { Row, Col, Grid, Panel, Button } from 'react-bootstrap'
// import { CustomCargando } from '../../utils/CustomCargando'
// import { CustomAlert } from '../../utils/CustomAlert'
// import EditarRolesUsuario from './EditarRolesUsuario'
// import CambiarPassModal  from './CambiarPassModal'
// import EditarUsuarioForm from './EditarUsuarioForm'

// export class EditarUsuario extends React.Component {

//   constructor() {
//     super()
//     this.state = {
//       ready: false,
//     }
//     this.abrirModalCambiarPass = this.abrirModalCambiarPass.bind(this)
//     this.submitEditForm = this.submitEditForm.bind(this)
//   }

//   componentDidMount() {
//     this.state.ready = false
//     this.props.usuario(this.props.idUsuario)
//   }

//   componentWillReceiveProps(){
//     this.state.ready = true
//   }

//   submitEditForm(){
//     this.formEdit.wrappedInstance.editarUsuarioSubmit()
//   }

//   abrirModalCambiarPass() {
//     this.cambiarPassModal.wrappedInstance.abrirModal()
//   }

//   componentWillUnmount(){
//     this.props.clearAlert()
//   }

//   render() {
//     if (this.state.ready){
//       return (
//         <Grid fluid={true}>
//           <Row>
//             <Col md={12}>
//               <h4>Editar usuario</h4>
//             </Col>
//           </Row>
//           {(this.props.alert != null) &&
//             <CustomAlert onDismiss={this.props.clearAlert} rowKey="alertRow" bsStyle={this.props.alert.style} message={this.props.alert.text} />}

//           <EditarUsuarioForm ref={(formEdit) => { this.formEdit = formEdit }} allOrganismos={this.props.allOrganismos} allRoles={this.props.allRoles} activeUser={this.props.activeUser} />
//           <Row>
//             <Col md={8}>
//               <Panel>
//                 <Panel.Body>
//                   <EditarRolesUsuario activeUser={this.props.activeUser} allRoles={this.props.allRoles}/>
//                   <CambiarPassModal idUsuario={this.props.idUsuario} ref={(modal) => { this.cambiarPassModal = modal }} />
//                 </Panel.Body>
//               </Panel>
//             </Col>
//             <Col md={4}>
//               <Button bsStyle="info" bsSize="small" onClick={this.abrirModalCambiarPass}>
//                 <i className="fa fa-lock"></i> Cambiar Contraseña
//               </Button>
//             </Col>
//           </Row>
//           <Row>
//             <Col lg={12}>
//               <Button bsStyle="primary" bsSize="small" onClick={this.submitEditForm}>Guardar</Button>&nbsp;
//               <Button bsStyle="default" bsSize="small" onClick={history.goBack}>Volver</Button>
//             </Col>
//           </Row>
//         </Grid>
//       )
//     } else {
//       return <CustomCargando />
//     }
//   }
// }

// const mapDispatch = (dispatch) => ({
//   usuario: (idUsuario) => {
//     dispatch(getUsuarioById(idUsuario))
//   },
//   clearAlert: () => {
//     dispatch(clearAlert())
//   }
// })

// const mapStateToProps = (state, ownProps) => {
//   return {
//     alert: state.userReducer.alert,
//     activeUser: state.userReducer.activeUser,
//     idUsuario: ownProps.match.params.id,
//     allOrganismos: state.userReducer.allOrganismos,
//     allRoles: state.userReducer.allRoles,
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatch)(EditarUsuario))
