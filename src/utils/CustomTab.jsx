import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab, Route } from 'react-bootstrap';
import Loading from './Loading';

export default class CustomTab extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    const { key, title, loading, children, path } = this.props;

    return (
      <Tab eventKey={key} key={key} title={title} className="form-group">
        <Route
          path={`${path}/${key}`}
          render={loading ? children : <Loading />}
        />
      </Tab>
    );
  }
}
