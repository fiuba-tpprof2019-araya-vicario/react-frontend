/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

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
    const {
      detailAction,
      editAction,
      deleteAction,
      acceptAction,
      removeAction,
      rejectAction,
      uploadAction
    } = actions;
    let detailRender;
    let editRender;
    let deleteRender;
    let acceptRender;
    let rejectRender;
    let removeRender;
    let uploadRender;

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

    if (this.actionEnabled(removeAction, row)) {
      removeRender = (
        <a role="button">
          <i
            className="fa fa-times"
            title="Editar"
            onClick={() => removeAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(acceptAction, row)) {
      acceptRender = (
        <a role="button">
          <i
            className="fa fa-check action"
            title="Aceptar"
            onClick={() => acceptAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(rejectAction, row)) {
      rejectRender = (
        <a role="button">
          <i
            className="fa fa-remove action"
            title="Rechazar"
            onClick={() => rejectAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(detailAction, row)) {
      detailRender = (
        <a role="button">
          <i
            className="fa fa-search"
            title="Editar"
            onClick={() => detailAction.action(row.id)}
          />
        </a>
      );
    }

    if (this.actionEnabled(uploadAction, row)) {
      uploadRender = (
        <a
          title="Subir una propuesta"
          onClick={() => uploadAction.action(row.id)}
          role="button"
        >
          <FontAwesomeIcon icon={faFileUpload} />
        </a>
      );
    }

    return (
      <td key="actions" className="actionsColumn">
        {removeRender}
        {detailRender}
        {rejectRender}
        {acceptRender}
        {deleteRender}
        {editRender}
        {uploadRender}
      </td>
    );
  }

  isValidKey(key) {
    return (
      key !== 'id' &&
      key !== 'projectId' &&
      key !== 'requestId' &&
      key !== 'project' &&
      key !== 'requestStatusId'
    );
  }

  getTableRows(actions) {
    const { data } = this.props;

    const tableRows = data.map((rowObject) => {
      const returnValue = [];

      for (const key in rowObject) {
        if (this.isValidKey(key)) {
          returnValue.push(<td key={key}>{rowObject[key]}</td>);
        }
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
