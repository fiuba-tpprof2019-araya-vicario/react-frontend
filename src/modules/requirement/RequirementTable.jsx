/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

export class RequirementTable extends React.Component {
  static propTypes = {
    data: PropTypes.array
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
      'Título',
      'Descripción',
      'Fecha de alta',
      'Última modificación',
      'Estado'
    ];
    const returnHeaders = [];

    for (const i in headers) {
      returnHeaders.push(<th key={i}>{headers[i]}</th>);
    }

    // returnHeaders.push(<th className="text-right" key={'acciones'} ></th>)
    return returnHeaders;
  }

  getTableRows() {
    const { data } = this.props;

    const tableRow = data.map((rowObject) => {
      let i;
      const returnValue = [];

      for (i in rowObject) {
        returnValue.push(<td key={i}>{rowObject[i]}</td>);
      }

      return <tr key={rowObject.id}>{returnValue}</tr>;
    });

    return tableRow;
  }

  render() {
    return (
      <Fragment>
        <Table condensed striped hover responsive>
          <thead>
            <tr>{this.getHeaders()}</tr>
          </thead>
          <tbody>{this.getTableRows()}</tbody>
        </Table>
      </Fragment>
    );
  }
}
