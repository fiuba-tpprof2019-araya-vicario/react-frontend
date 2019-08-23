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
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-user-circle bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/my_projects')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Mi perfil</h4>
          </Row>
          <Row>Edita tu información personal</Row>
        </Col>
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-inbox bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/requests')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Mis solicitudes</h4>
          </Row>
          <Row>
            Revisa todas las solicitudes recibidas para colaborar en un proyecto
          </Row>
        </Col>
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-file bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/my_projects')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Mi proyecto</h4>
          </Row>
          <Row>Revisa el historial de tu proyecto</Row>
        </Col>
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-lightbulb-o bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/my_projects')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Ideas</h4>
          </Row>
          <Row>Explora y sumate a las ideas propuestas</Row>
        </Col>
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-clipboard bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/requirements')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Requerimientos</h4>
          </Row>
          <Row>Colabora con los distintos requerimientos solicitados</Row>
        </Col>
        <Col md={2} lg={2}>
          <Row>
            <Center>
              <button className="onlyIcon">
                <i
                  className="fa fa-archive bigIcon"
                  aria-hidden="true"
                  onClick={() => access('/my_projects')}
                />
              </button>
            </Center>
          </Row>
          <Row>
            <h4>Proyectos</h4>
          </Row>
          <Row>Explora los distintos proyectos finalizados</Row>
        </Col>
      </Row>
    </div>
  );
};
