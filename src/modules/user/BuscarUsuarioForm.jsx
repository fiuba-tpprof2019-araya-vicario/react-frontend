// import React from 'react';
// import ReactDOM from 'react-dom';
// import { connect } from 'react-redux';
// import Select from 'react-select';
// import { Row, Col, Button, FormControl } from 'react-bootstrap';
// import { withRouter } from 'react-router-dom';
// import { getUsuarios } from './userReducer';
// import Filed from '../../utils/forms/Field';
// import { getOrganismoSelectOptions } from '../../utils/utils';

// export class BuscarUsuarioForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       organismoFiltro: '-1'
//     };
//     this.updateOrganismoSearch = this.updateOrganismoSearch.bind(this);
//   }

//   getOrganismosSearch() {
//     return getOrganismoSelectOptions(this.props.allOrganismos, true);
//   }

//   updateOrganismoSearch(newValue) {
//     this.setState({
//       ...this.state,
//       organismoFiltro: newValue != null ? newValue.value : -1
//     });
//   }

//   render() {
//     return (
//       <form
//         onSubmit={(event) => {
//           event.preventDefault(); // Previene el submit default del form
//           let nombreSearch = ReactDOM.findDOMNode(this.nombreSearch).value;
//           let emailSearch = ReactDOM.findDOMNode(this.emailSearch).value;
//           let organismoSearch = this.state.organismoFiltro;

//           this.props.usuarios(nombreSearch, emailSearch, organismoSearch);
//         }}

//       >
//         <Row>
//           <Col lg={4}>
//             <CustomFormField
// key="nombreSearch"
// bsSize="small"
// controlId="nombreSearch"
// label="Nombre"
// inputComponent={
//               <FormControl ref={nombreSearch => { this.nombreSearch = nombreSearch }} key="nombreSearchControl"
//                 bsSize="small" type="text"></FormControl>
//             }
//             />
//           </Col>
//           <Col lg={4}>
//             <CustomFormField
// key="emailSearch"
// bsSize="small"
// controlId="emailSearch"
// label="Email"
// inputComponent={
//               <FormControl ref={emailSearch => { this.emailSearch = emailSearch }} key="emailSearchControl"
//                 bsSize="small" type="text"></FormControl>
//             }
//             />
//           </Col>
//           <Col lg={4}>
//             <CustomFormField
// key="organismoSearch"
// bsSize="small"
// controlId="organismoSearch"
// label="Organismo"
//               inputComponent={
//                 <Select
// name="organismoSelect"
// value={this.state.organismoFiltro}
//                   options={this.getOrganismosSearch(this.props.allOrganismos)}
// id="organismoSearch"
//                   key="organismoSearchControl"
// onChange={this.updateOrganismoSearch}
// placeholder="Búsqueda por organismo"
//                 />
//               }

//             />
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={12} md={12}>
//             <Button bsStyle="primary" bsSize="small" type="submit">
//               Buscar
//             </Button>
//           </Col>
//         </Row>
//       </form>
//     );
//   }
// }

// const mapDispatch = (dispatch) => ({
//   usuarios: (nombre, email, organismo) => {
//     dispatch(getUsuarios(nombre, email, organismo));
//   }
// });

// export default withRouter(
//   connect(
//     null,
//     mapDispatch
//   )(BuscarUsuarioForm)
// );
