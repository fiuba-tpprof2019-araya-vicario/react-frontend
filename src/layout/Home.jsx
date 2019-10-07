import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import FittedImage from 'react-fitted-image';
import history from '../redux/history';
import imagenPortada from '../images/imagen_portada.png';
import { CREDENTIALS } from '../utils/services/references';
import WithAuthorization from '../utils/WithAuthorization';

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
        <Center>
          <WithAuthorization requiredCredentials={CREDENTIALS.EDIT_USERS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button className="onlyIcon">
                    <i
                      className="fa fa-user-circle bigIcon"
                      aria-hidden="true"
                      onClick={() => access('/users')}
                    />
                  </button>
                </Center>
              </Row>
              <Row>
                <h4>Administrar usuarios</h4>
              </Row>
              <Row>Edita los perfiles de los usuarios de la plataforma</Row>
            </Col>
          </WithAuthorization>
          {/* <WithAuthorization requiredCredentials={CREDENTIALS.GET_PROJECTS}>
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
              Revisa todas las solicitudes recibidas para colaborar en un
              proyecto
            </Row>
          </Col>
        </WithAuthorization> */}
          <WithAuthorization requiredCredentials={CREDENTIALS.CREATE_PROJECTS}>
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
              <Row>
                Crea o acepta una invitación para trabajar en un proyecto
              </Row>
            </Col>
          </WithAuthorization>
          <WithAuthorization requiredCredentials={CREDENTIALS.GET_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button className="onlyIcon">
                    <i
                      className="fa fa-lightbulb-o bigIcon"
                      aria-hidden="true"
                      onClick={() => access('/ideas')}
                    />
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
          </WithAuthorization>
          <WithAuthorization requiredCredentials={CREDENTIALS.GET_PROJECTS}>
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
          </WithAuthorization>
          <WithAuthorization requiredCredentials={CREDENTIALS.APPROVE_PROJECTS}>
            <Col md={2} lg={2}>
              <Row>
                <Center>
                  <button className="onlyIcon">
                    <i
                      className="fa fa-gavel bigIcon"
                      aria-hidden="true"
                      onClick={() => access('/commissions')}
                    />
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
          </WithAuthorization>
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
            <Row>
              Explora los distintos proyectos finalizados por los estudiantes de
              la FIUBA
            </Row>
          </Col>
        </Center>
      </Row>
    </div>
  );
};
