// import React from 'react';
// import { connect } from 'react-redux';

// import { Row, Col, Button } from 'react-bootstrap';
// import { withRouter } from 'react-router-dom';
// import {
//   getUsuarios,
//   clearUsers,
//   obtenerOrganismos,
//   clearAlert
// } from './userReducer';
// import BuscarUsuarioForm from './BuscarUsuarioForm';
// import BuscarUsuarioTable from './BuscarUsuarioTable';
// import CrearUsuarioModal from './CrearUsuarioModal';

// export class Usuario extends React.Component {
//   constructor() {
//     super();
//     this.abrirModalCrearUsuario = this.abrirModalCrearUsuario.bind(this);
//   }

//   componentDidMount() {
//     // this.props.obtenerOrganismos();
//   }

//   abrirModalCrearUsuario() {
//     this.crearUsuarioModal.wrappedInstance.abrirModal();
//   }

//   render() {
//     return (
//       <div>
//         <Row>
//           <Col md={8} lg={8} sm={8} xs={8}>
//             <h4>Administración de usuarios</h4>
//           </Col>
//           <Col lg={4} md={4} sm={4} xs={4}>
//             <br />
//             <Button
//               bsStyle="success"
//               bsSize="xsmall"
//               className="pull-right"
//               onClick={this.abrirModalCrearUsuario}
//             >
//               <i className="fa fa-plus" aria-hidden="true">
//                 &nbsp;
//               </i>
//               Nuevo usuario
//             </Button>
//           </Col>
//         </Row>

//         <BuscarUsuarioForm />

//         <BuscarUsuarioTable />

//         <CrearUsuarioModal
//           ref={(modal) => {
//             this.crearUsuarioModal = modal;
//           }}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatch = (dispatch) => ({
//   usuarios: (nombre, email, organismo) => {
//     dispatch(getUsuarios(nombre, email, organismo));
//   },
//   clearResult: () => {
//     dispatch(clearUsers());
//   },
//   clearAlert: () => {
//     dispatch(clearAlert());
//   },
//   obtenerOrganismos: () => {
//     dispatch(obtenerOrganismos());
//   }
// });

// const mapStateToProps = (state) => ({
//   alert: state.userReducer.alert,
//   allOrganismos: state.userReducer.allOrganismos,
//   permisosUsuario: state.authReducer.permisos
// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatch
//   )(Usuario)
// );
