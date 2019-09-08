// import React from 'react'
// import { connect } from 'react-redux'

// import { Alert } from 'react-bootstrap'
// import { withRouter } from 'react-router-dom'
// import { CustomTable } from '../../utils/CustomTable'
// import { permisoEditUsuarios } from '../../utils/utils'
// import history from '../../history'

// export class BuscarUsuarioTable extends React.Component {

//   editarAction(id) {
//     history.push('/usuarios/' + id)
//   }

//   getTablaUsuarios() {
//     if (this.props.activeSearch && this.props.result.length != 0) {
//       if (permisoEditUsuarios(this.props.permisosUsuario))
//         return <CustomTable data={this.props.result} headers={['Nombre', 'Email', 'Organismo']} editAction={this.editarAction} />
//       else
//         return <CustomTable data={this.props.result} headers={['Nombre', 'Email', 'Organismo']} />
//     } else if (this.props.activeSearch) {
//       return <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.getTablaUsuarios()}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     result: state.userReducer.result,
//     activeSearch: state.userReducer.activeSearch,
//     permisosUsuario: state.authReducer.permisos
//   }
// }

// export default withRouter(connect(mapStateToProps, null)(BuscarUsuarioTable))
