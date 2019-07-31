import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Loading extends React.Component {
  render() {
    return (
      <Row className="loading">
        <Col lg={12} className="text-center">
          <h3>
            <i className="fa fa-spinner fa-lg fa-spin">
            &nbsp;
            </i>
            Cargando
          </h3>
        </Col>
      </Row>);
  }
}
