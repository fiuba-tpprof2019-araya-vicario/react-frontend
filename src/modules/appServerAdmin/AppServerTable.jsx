import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Alert, Table, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import DeleteAppServerModal from './modals/DeleteAppServerModal'
import { getAppServerDetail } from './appServerReducer'
import history from '../../redux/history'


export class AppServerTable extends React.Component {

  constructor() {
    super()
    this.getHeaders = this.getHeaders.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
    this.editAction = this.editAction.bind(this)
  }

  editAction(id) {
    history.push('/appServer/' + id)
  }

  deleteAction(appServerId, appServerName) {
    this.DeleteAppServerModal.wrappedInstance.abrirModal(appServerId, appServerName)
  }

  getHeaders() {
    let headers = ['id', 'Nombre', 'Url','Creado por', 'Fecha de alta'], i, returnHeaders = []
    for (i in headers) {
      returnHeaders.push(<th key={i}>{headers[i]}</th>)
    }
    returnHeaders.push(<th className="text-right" key={'acciones'} ></th>)
    return returnHeaders
  }

  getTableRows() {
    let data = this.props.appServers, editAction = this.editAction, deleteAction = this.deleteAction

    var tableRow = data.map(function (rowObject) {
      let i
      var returnValue = []

      for (i in rowObject) {
        returnValue.push(
          <td key={i}>
            {rowObject[i]}
          </td>)
      }
      returnValue.push(
        <td className="text-right" colSpan="1" key={'acciones'}>
          <Button bsSize="xsmall" bsStyle="primary" onClick={() => editAction(rowObject.id,rowObject.url)}>
            <i className="fa fa-line-chart action" title="Descargar"></i>&nbsp;
            Ver detalle
          </Button>&nbsp;&nbsp;
          <Button bsSize="xsmall" bsStyle="danger" onClick={() => deleteAction(rowObject.id, rowObject.name)}>
            <i className="fa fa-remove action" title="Eliminar"></i>&nbsp;
            Eliminar
          </Button>
        </td>)

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>)
    })
    return tableRow
  }

  render() {

    if (this.props.appServers.length == 0) {

      return (
        <Fragment>
          <br />
          <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
        </Fragment>)
    }
    return (
      <Fragment>
        <Table condensed striped hover responsive>
          <thead>
            <tr>
              {this.getHeaders()}
            </tr>
          </thead>
          <tbody>
            {this.getTableRows()}
          </tbody>
        </Table>
        <DeleteAppServerModal ref={(modal) => { this.DeleteAppServerModal = modal }} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  appServers: state.appServerReducer.appServers
})


const mapDispatch = (dispatch) => ({
  getAppServerDetail: (id) => {
    dispatch(getAppServerDetail(id))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatch)(AppServerTable))