import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

export class RequirementTable extends React.Component {
  constructor () {
    super();
    this.getHeaders = this.getHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
  }

  getHeaders () {
    let headers = [ 'Id', 'Creador', 'Requerimiento', 'Fecha de alta', 'Última modificación', 'Estado' ], i, returnHeaders = [];
    for (i in headers) {
      returnHeaders.push(
        <th key={i}>
          {headers[i]}
        </th>
      );
    }
    // returnHeaders.push(<th className="text-right" key={'acciones'} ></th>)
    return returnHeaders;
  }

  getTableRows () {
    let data = this.props.data;

    var tableRow = data.map(function (rowObject) {
      let i;
      var returnValue = [];

      for (i in rowObject) {
        returnValue.push(
          <td key={i}>
            {rowObject[i]}
          </td>);
      }
      // returnValue.push(
      //   <td colSpan="2" className="text-right" key={'acciones'}>
      //     <Button bsSize="xsmall" bsStyle="primary" onClick={() => accept(rowObject.id)}>
      //       <i className="fa fa-download action" title="Aceptar"></i>
      //       Acceptar
      //     </Button>
      //     <Button bsSize="xsmall" bsStyle="danger" onClick={() => reject(rowObject.id)}>
      //       <i className="fa fa-remove action" title="rechazar"></i>
      //       Rechazar
      //     </Button>
      //   </td>)

      return (<tr key={rowObject.id}>
        {returnValue}
      </tr>);
    });
    return tableRow;
  }

  render () {
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
      </Fragment>
    );
  }
}
