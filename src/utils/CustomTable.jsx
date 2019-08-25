/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { Table, Button } from 'react-bootstrap';

export class CustomTable extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    actions: PropTypes.object
  };

  constructor() {
    super();
    this.getHeaders = this.getHeaders.bind(this);
    this.getTableRows = this.getTableRows.bind(this);
  }

  getActions() {
    const { actions } = this.props;

    return actions;
  }

  getHeaders(actions) {
    const returnHeaders = this.props.headers.map((header, i) => (
      <th key={`th${i}`}>{header}</th>
    ));

    if (actions) {
      returnHeaders.push(<th className="text-right" key="actions" />);
    }

    return returnHeaders;
  }

  getActionsColumn(row, actions) {
    const { editAction, deleteAction, acceptAction, rejectAction } = actions;
    let editRender;
    let deleteRender;
    let acceptRender;
    let rejectRender;

    if (editAction) {
      editRender = (
        <a role="button">
          <i
            className="fa fa-pencil"
            title="Editar"
            onClick={() => editAction(row.id)}
          />
        </a>
      );
    }

    if (deleteAction) {
      deleteRender = (
        <a role="button">
          <i
            className="fa fa-trash"
            title="Editar"
            onClick={() => deleteAction(row.id)}
          />
        </a>
      );
    }

    if (acceptAction) {
      acceptRender = (
        <Button
          bsSize="xsmall"
          bsStyle="primary"
          onClick={() => acceptAction(row.id)}
        >
          <i className="fa fa-success action" title="Aceptar" />
          Acceptar
        </Button>
      );
    }

    if (rejectAction) {
      rejectRender = (
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={() => rejectAction(row.id)}
        >
          <i className="fa fa-remove action" title="rechazar" />
          Rechazar
        </Button>
      );
    }

    return (
      <td key="actions" className="actionsColumn">
        {editRender}
        {deleteRender}
        {acceptRender}
        {rejectRender}
      </td>
    );
  }

  getTableRows(actions) {
    const { data } = this.props;

    const tableRows = data.map((rowObject) => {
      const returnValue = [];

      for (const j in rowObject) {
        returnValue.push(<td key={j}>{rowObject[j]}</td>);
      }

      if (actions) {
        returnValue.push(this.getActionsColumn(rowObject, actions));
      }

      return <tr key={rowObject.id}>{returnValue}</tr>;
    });

    return tableRows;
  }

  render() {
    const actions = this.getActions();

    return (
      <Table condensed striped hover responsive>
        <thead>
          <tr>{this.getHeaders(actions)}</tr>
        </thead>
        <tbody>{this.getTableRows(actions)}</tbody>
      </Table>
    );
  }
}
