import React, { Component } from 'react';
import { Tabs } from 'react-bootstrap';
import history from '../history';

export default class CustomTab extends Component {

  render() {
    const { key, title, loading, children, path } = this.props;
    
    return (
      <Tab 
        eventKey={key}
        key={key} 
        title={title}
        className="form-group">
        <Route path={`${path}/${key}`} 
          render={(loading)
            ? children
            : <CustomCargando/>} /> 
      </Tab>
    );
  }
}