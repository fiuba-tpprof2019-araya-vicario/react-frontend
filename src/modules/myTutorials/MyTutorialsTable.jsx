/* eslint-disable guard-for-in */
import PropTypes from 'prop-types';
import React from 'react';
import { CustomTable } from '../../utils/CustomTable';

export class MyTutorialsTable extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    showProjectDetail: PropTypes.func
  };

  getHeaders() {
    return ['Título', 'Descripción', 'Tipo', 'Fecha de creación', 'Estado'];
  }

  render() {
    return (
      <CustomTable
        headers={this.getHeaders()}
        data={this.props.data}
        actions={{
          detailAction: {
            action: this.props.showProjectDetail
          }
        }}
      />
    );
  }
}
