import PropTypes from 'prop-types';
import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default class Table extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    actions: PropTypes.object
  };

  getActions() {
    const { actions } = this.props;

    return actions;
  }

  getHeaders = (actions) => {
    const returnHeaders = this.props.headers.map((header, i) => (
      <th key={`th${i}`}>{header}</th>
    ));

    if (actions) {
      returnHeaders.push(<th className="text-right" key="actions" />);
    }

    return returnHeaders;
  };

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
      viewPdfAction,
      uploadAction
    } = actions;
    let detailRender;
    let editRender;
    let deleteRender;
    let acceptRender;
    let rejectRender;
    let removeRender;
    let uploadRender;
    let viewPdfRender;

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

    if (this.actionEnabled(viewPdfAction, row)) {
      viewPdfRender = (
        <a
          title="Ver el PDF"
          onClick={() => viewPdfAction.action(row.id)}
          role="button"
        >
          <FontAwesomeIcon icon={faFilePdf} />
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
        {viewPdfRender}
      </td>
    );
  }

  isValidKey(key) {
    return (
      key !== 'id' &&
      key !== 'projectId' &&
      key !== 'requestId' &&
      key !== 'project' &&
      key !== 'requestStatusId' &&
      key !== 'file_url'
    );
  }

  getTableRows = (actions) => {
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
  };

  render() {
    const actions = this.getActions();

    return (
      <BootstrapTable condensed striped hover responsive>
        <thead>
          <tr>{this.getHeaders(actions)}</tr>
        </thead>
        <tbody>{this.getTableRows(actions)}</tbody>
      </BootstrapTable>
    );
  }
}
