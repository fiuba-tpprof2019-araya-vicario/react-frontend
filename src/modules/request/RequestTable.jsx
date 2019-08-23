/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { Table, Button } from 'react-bootstrap';

export class RequestTable extends React.Component {
  static propTypes = {
    accept: PropTypes.func,
    reject: PropTypes.func,
    data: PropTypes.object
  };

  constructor() {
    super();
    this.getHeaders = this.getHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
  }

  getHeaders() {
    const headers = [
      'Id',
      'Creador',
      'Proyecto',
      'Fecha de alta',
      'Última modificación'
    ];
    const returnHeaders = [];

    for (const i in headers) {
      returnHeaders.push(<th key={i}>{headers[i]}</th>);
    }
    returnHeaders.push(<th className="text-right" key="actions" />);

    return returnHeaders;
  }

  getTableRows() {
    const { data, accept, reject } = this.props;
    const tableRow = data.map((rowObject) => {
      let i;
      const returnValue = [];

      for (i in rowObject) {
        returnValue.push(<td key={i}>{rowObject[i]}</td>);
      }
      returnValue.push(
        <td colSpan="2" className="text-right" key="actions">
          <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={() => accept(rowObject.id)}
          >
            <i className="fa fa-download action" title="Aceptar" />
            Acceptar
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="danger"
            onClick={() => reject(rowObject.id)}
          >
            <i className="fa fa-remove action" title="rechazar" />
            Rechazar
          </Button>
        </td>
      );

      return <tr key={rowObject.id}>{returnValue}</tr>;
    });

    return tableRow;
  }

  render() {
    return (
      <Table condensed striped hover responsive>
        <thead>
          <tr>{this.getHeaders()}</tr>
        </thead>
        <tbody>{this.getTableRows()}</tbody>
      </Table>
    );
  }
}
