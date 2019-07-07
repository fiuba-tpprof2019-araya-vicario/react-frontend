import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getFileConfig, api } from '../../api/apiInterfaceProvider';
import DeleteFileModal from './modals/DeleteFileModal';

export class FileTable extends React.Component {

  constructor() {
    super();
    this.getHeaders = this.getHeaders.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  deleteAction(fileId, fileName) {
    this.DeleteFileModal.wrappedInstance.abrirModal(fileId, fileName);
  }

  downloadAction(id) {
    let config = getFileConfig();
    axios.get(api.file(id), config)
      .then((response) => {
        const reader = new FileReader();
        reader.readAsText(response.data);
        reader.onload = function () {
          window.location = reader.result;
        };
      });
  }

  getHeaders() {
    let headers = ['Id', 'Nombre', 'Tamaño', 'Fecha de alta', 'Última modificación'], i, returnHeaders = [];

    for (i in headers) {
      returnHeaders.push(
        <th key={i}>
          {headers[i]}
        </th>
      );
    }
    returnHeaders.push(<th className="text-right" key={'acciones'} ></th>);
    return returnHeaders;
  }

  getTableRows() {
    let data = this.props.result, downloadAction = this.downloadAction, deleteAction = this.deleteAction;

    var tableRow = data.map(function (rowObject) {
      let i;
      var returnValue = [];

      for (i in rowObject) {
        returnValue.push(
          <td key={i}>
            {rowObject[i]}
          </td>);
      }
      returnValue.push(
        <td colSpan="2" className="text-right" key={'acciones'}>
          <Button bsSize="xsmall" bsStyle="primary" onClick={() => downloadAction(rowObject.id, rowObject.filename)}>
            <i className="fa fa-download action" title="Descargar"></i>&nbsp;
            Descargar
          </Button>&nbsp;&nbsp;
          <Button bsSize="xsmall" bsStyle="danger" onClick={() => deleteAction(rowObject.id, rowObject.filename)}>
            <i className="fa fa-remove action" title="Eliminar"></i>&nbsp;
            Eliminar
          </Button>
        </td>);

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>);
    });
    return tableRow;
  }

  render() {
    if (this.props.result.length == 0) {
      return (<Fragment>
        <br />
        <Alert bsStyle="info">La búsqueda no trajo resultados</Alert>
      </Fragment>);
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
        <DeleteFileModal ref={(modal) => { this.DeleteFileModal = modal; }} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.filesReducer.result
  };
};



export default withRouter(connect(mapStateToProps, null)(FileTable));