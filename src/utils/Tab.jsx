import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab as BootstrapTab } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import Loading from './Loading';

export default class Tab extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    loading: false,
    path: ''
  };

  render() {
    const { id, title, loading, children, path } = this.props;

    return (
      <BootstrapTab eventKey={id} key={id} title={title} className="form-group">
        <Route
          exact
          path={`${path}${id}`}
          render={() => (loading ? <Loading /> : children)}
        />
      </BootstrapTab>
    );
  }
}
