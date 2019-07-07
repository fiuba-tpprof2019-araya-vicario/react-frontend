import React from 'react';
import { Row, Col } from 'react-bootstrap';

export class Loading extends React.Component {
  render() {
    return (
      <Row className="loading">
        <Col lg={12} className="text-center">
          <h3>
            <i className="fa fa-spinner fa-lg fa-spin">
            </i>
            &nbsp;
            Cargando
          </h3>
        </Col>
      </Row>);
  }
}
