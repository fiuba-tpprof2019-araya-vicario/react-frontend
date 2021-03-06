import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import FittedImage from 'react-fitted-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListAlt,
  faUserCircle,
  faFileAlt,
  faLightbulb,
  faGavel,
  faArchive
} from '@fortawesome/free-solid-svg-icons';
import history from '../redux/history';
import imagenPortada from '../images/imagen_portada.png';
import { CREDENTIALS } from '../utils/services/references';
import WithAuth from '../utils/WithAuthorization';

export const Home = () => {
  const access = (url) => history.push(url);

  return (
    <div>
      <Row>
        <FittedImage fit="contain" src={imagenPortada} />
      </Row>
      <br />
      <Row className="text-center">
        <Center>
          <WithAuth requiredCredentials={CREDENTIALS.EDIT_USERS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button
                    className="onlyIcon bigIcon"
                    onClick={() => access('/users')}
                  >
                    <FontAwesomeIcon icon={faUserCircle} />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Administrar usuarios</h4>
              </Row>
              <Row>Edita los perfiles de los usuarios de la plataforma</Row>
            </Col>
          </WithAuth>
          <WithAuth requiredCredentials={CREDENTIALS.CREATE_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button
                    className="onlyIcon bigIcon"
                    onClick={() => access('/my_projects')}
                  >
                    <FontAwesomeIcon icon={faFileAlt} />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Mi proyecto</h4>
              </Row>
              <Row>
                Crea o acepta una invitación para trabajar en un proyecto
              </Row>
            </Col>
          </WithAuth>
          <WithAuth requiredCredentials={CREDENTIALS.GET_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button
                    className="onlyIcon bigIcon"
                    onClick={() => access('/ideas')}
                  >
                    <FontAwesomeIcon icon={faLightbulb} />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Ideas</h4>
              </Row>
              <Row>
                Explora y sumate a las ideas propuestas por otros estudiantes
              </Row>
            </Col>
          </WithAuth>
          <WithAuth requiredCredentials={CREDENTIALS.GET_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button
                    className="onlyIcon bigIcon"
                    onClick={() => access('/requirements')}
                  >
                    <FontAwesomeIcon icon={faListAlt} />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Requerimientos</h4>
              </Row>
              <Row>Colabora con los distintos requerimientos solicitados</Row>
            </Col>
          </WithAuth>
          <WithAuth requiredCredentials={CREDENTIALS.APPROVE_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button
                    className="onlyIcon bigIcon"
                    onClick={() => access('/commissions')}
                  >
                    <FontAwesomeIcon icon={faGavel} />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Comisión curricular</h4>
              </Row>
              <Row>
                Administrá los distintos proyectos creados según tus carreras
              </Row>
            </Col>
          </WithAuth>
          <Col md={2} lg={2}>
            <Row>
              <Center>
                <button
                  className="onlyIcon bigIcon"
                  onClick={() => access('/public')}
                >
                  <FontAwesomeIcon icon={faArchive} />
                </button>
              </Center>
            </Row>
            <Row>
              <h4>Proyectos</h4>
            </Row>
            <Row>
              Explora los distintos proyectos finalizados por los estudiantes de
              FIUBA
            </Row>
          </Col>
        </Center>
      </Row>
    </div>
  );
};
