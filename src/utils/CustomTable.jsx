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

  actionEnabled(action, row) {
    return action && (!action.disabled || !action.disabled(row));
  }

  getActionsColumn(row, actions) {
    const { editAction, deleteAction, acceptAction, rejectAction } = actions;
    let editRender;
    let deleteRender;
    let acceptRender;
    let rejectRender;

    if (this.actionEnabled(editAction, row)) {
      editRender = (
        <a role="button">
          <i
            className="fa fa-pencil"
            title="Editar"
            onClick={() => editAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(deleteAction, row)) {
      deleteRender = (
        <a role="button">
          <i
            className="fa fa-trash"
            title="Editar"
            onClick={() => deleteAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(acceptAction, row)) {
      acceptRender = (
        <Button
          bsSize="xsmall"
          bsStyle="success"
          onClick={() => acceptAction.action(row.id)}
        >
          <i className="fa fa-check action" title="Aceptar" />
          Aceptar
        </Button>
      );
    }

    if (this.actionEnabled(rejectAction, row)) {
      rejectRender = (
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={() => rejectAction.action(row.id)}
        >
          <i className="fa fa-remove action" title="Rechazar" />
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
