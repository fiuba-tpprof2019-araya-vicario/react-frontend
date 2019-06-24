import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Center from 'react-center';
import FittedImage from 'react-fitted-image'
import imagenPortada from "../images/imagen_portada.png"

export const Home = () => {
  return (
    <div>
      <Row>
        <FittedImage
          fit="contain"
          src={imagenPortada}
        />
      </Row>
      <br></br>
      <Center>
        <Row className="text-center">
          <Col md={2}>
            <i class="fa fa-user"></i>
          </Col>
          <Col md={2}>
            <i class="fa fa-file"></i>
          </Col>
          <Col md={2}>
            <i class="fa fa-lightbulb-o"></i>
          </Col>
          <Col md={2}>
            <i class="fa fa-tasks"></i>
          </Col>
          <Col md={2}>
            <i class="fa fa-archive"></i>
          </Col>
        </Row>
      </Center>
    </div> 
  );
};