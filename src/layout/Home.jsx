import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import FittedImage from 'react-fitted-image';
import history from '../redux/history';
import imagenPortada from '../images/imagen_portada.png';

export const Home = () => {

  const access = (url) => {
    history.push(url);
  };

  return (
    <div>
      <Row>
        <FittedImage fit="contain" src={imagenPortada} />
      </Row>
      <br />
      <Row className="text-center">
        <Col md={1} lg={1}> 
        </Col>
        <Col md={2} lg={2}>
          <Center>
            <button className="onlyIcon">
              <i className="fa fa-user-circle bigIcon" 
                aria-hidden="true" 
                onClick={() => access('/my_project')}/>
            </button>
          </Center>
        </Col>
        <Col md={2} lg={2}>
          <Center>
            <button className="onlyIcon">
              <i className="fa fa-file bigIcon"
                aria-hidden="true" 
                onClick={() => access('/my_project')}/>
            </button>
          </Center>
        </Col>
        <Col md={2} lg={2}>
          <Center>
            <button className="onlyIcon">
              <i className="fa fa-lightbulb-o bigIcon"
                aria-hidden="true" 
                onClick={() => access('/my_project')}/>
            </button>
          </Center>
        </Col>
        <Col md={2} lg={2}>
          <Center>
            <button className="onlyIcon">
              <i className="fa fa-tasks bigIcon"
                aria-hidden="true" 
                onClick={() => access('/my_project')}/>
            </button>
          </Center>
        </Col>
        <Col md={2} lg={2}>
          <Center>
            <button className="onlyIcon">
              <i className="fa fa-archive bigIcon"
                aria-hidden="true" 
                onClick={() => access('/my_project')}/>
            </button>
          </Center>
        </Col>
      </Row>
    </div>
  );
};
