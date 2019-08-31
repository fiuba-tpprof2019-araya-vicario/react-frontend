import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Glyphicon, Row } from 'react-bootstrap';
import CustomAlert from '../../utils/CustomAlert';
import { myProjectMessages } from '../../utils/messages';
import {
  formatterDate,
  getFullName,
  getOnlyField,
  getStudentFullName,
  getTutorFullName
} from '../../utils/services/functions';
import FullRow from '../../utils/styles/FullRow';
import Itemized from '../../utils/styles/Itemized';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    userId: PropTypes.number,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func
  };

  getAutors() {
    const { Creator, Students } = this.props.project;
    const autors = [];

    if (Creator && Students) {
      autors.push(`Creador: ${getFullName(Creator)}`);
      Students.forEach((student) => {
        autors.push(`Participante: ${getStudentFullName(student)}`);
      });
    }

    return autors;
  }

  getTutors() {
    const { Tutor, Cotutors } = this.props.project;
    const tutors = [];

    if (Tutor && Cotutors) {
      tutors.push(`Tutor: ${getTutorFullName(Tutor)}`);
      Cotutors.forEach((tutor) => {
        tutors.push(`Cotutor: ${getTutorFullName(tutor)}`);
      });
    }

    return tutors;
  }

  render() {
    const {
      project,
      userId,
      showUploadIdeaModal,
      isUserCreator,
      showAbandonIdeaModal
    } = this.props;

    return (
      <Fragment>
        <Row>
          <br />
          <CustomAlert
            rowKey="infoNextStep"
            bsStyle="info"
            message={myProjectMessages.NEW_STEP_PROJECT_CREATED_INFO}
          />
          <br />
          <Row>
            <h3>Título: {project.name}</h3>
          </Row>
          <br />
          <FullRow>
            <Itemized title="Autores:" items={this.getAutors()} />
            <Itemized title="Tutores:" items={this.getTutors()} />
            <Itemized
              title="Fecha de creación:"
              items={[formatterDate(project.createdAt)]}
            />
            <Itemized
              title="Departamentos:"
              items={getOnlyField(project.departments, 'label')}
            />
          </FullRow>
          <br />
          <Row>
            <h4>Descripción:</h4>
            <p>{project.description}</p>
          </Row>
          <br />
          <Row className="pull-right">
            <Button
              bsStyle="danger"
              onClick={() => showAbandonIdeaModal(userId)}
              bsSize="small"
            >
              <Glyphicon glyph="log-out">&nbsp;</Glyphicon>
              Abandonar idea
            </Button>
            &nbsp;
            {isUserCreator && (
              <Button
                bsStyle="primary"
                onClick={showUploadIdeaModal}
                bsSize="small"
              >
                <i className="fa fa-pencil">&nbsp;</i>&nbsp;Editar idea
              </Button>
            )}
          </Row>
        </Row>
      </Fragment>
    );
  }
}
