/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';

export class CustomTable extends React.Component {
  static propTypes = {
    headers: PropTypes.array,
    data: PropTypes.array,
    actions: PropTypes.object
  };

  nullHref = '';

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
    const { editAction, deleteAction } = actions;
    let editRender;
    let deleteRender;

    if (editAction) {
      editRender = (
        <a href={this.nullHref}>
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
        <a href={this.nullHref}>
          <Glyphicon
            glyph="eye-close"
            title="Eliminar"
            onClick={() => deleteAction(row.id)}
          />
        </a>
      );
    }

    const spaceEditDelete = editRender && deleteRender ? '  ' : '';

    return (
      <td key="actions">
        {editRender}
        {spaceEditDelete}
        {deleteRender}
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
