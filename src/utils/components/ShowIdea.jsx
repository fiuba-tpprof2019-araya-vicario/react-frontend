import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Glyphicon, Row } from 'react-bootstrap';
import CustomAlert from '../../utils/CustomAlert';
import {
  formatterDate,
  getFullName,
  getOnlyField,
  getStudentFullName,
  getTutorFullName
} from '../../utils/services/functions';
import history from '../../redux/history';
import FullRow from '../../utils/styles/FullRow';
import Itemized from '../../utils/styles/Itemized';
import ShowProposal from './ShowProposal';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    nextStepMessage: PropTypes.string,
    userId: PropTypes.number,
    showProposal: PropTypes.bool,
    showBackButton: PropTypes.bool,
    showAbandonButton: PropTypes.bool,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func
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
      showBackButton,
      showAbandonButton,
      userId,
      showUploadIdeaModal,
      uploadProposal,
      isUserCreator,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    return (
      <Fragment>
        <Row>
          <br />
          <CustomAlert
            rowKey="infoNextStep"
            bsStyle="info"
            message={nextStepMessage}
          />
          <br />
          <Row>
            <h3>Título: {project.name}</h3>
          </Row>
          <br />
          <FullRow>
            <Itemized title="Autores:" items={this.getAutors()} />
            <Itemized title="Tutores:" items={this.getTutors()} />
            <Fragment>
              <Itemized
                title="Tipo de proyecto:"
                items={project.Type && [project.Type.name]}
              />
              <Itemized
                title="Carreras:"
                items={project.Careers && getOnlyField(project.Careers, 'name')}
              />
            </Fragment>
            <Fragment>
              <Itemized
                title="Fecha de creación:"
                items={[formatterDate(project.createdAt)]}
              />
              <Itemized
                title="Última modificación:"
                items={[formatterDate(project.updatedAt)]}
              />
            </Fragment>
          </FullRow>
          <br />
          <Row>
            <h4>Descripción:</h4>
            <p>{project.description}</p>
          </Row>
          {showProposal && (
            <ShowProposal
              project={project}
              isUserCreator={isUserCreator}
              uploadProposal={uploadProposal}
            />
          )}
          <br />
          <Row className="pull-right">
            {showBackButton && (
              <Button
                className="pull-left"
                bsStyle="default"
                bsSize="small"
                onClick={history.goBack}
              >
                Volver
              </Button>
            )}
            &nbsp;
            {showAbandonButton && (
              <Button
                bsStyle="danger"
                onClick={() => showAbandonIdeaModal(userId)}
                bsSize="small"
              >
                <Glyphicon glyph="log-out">&nbsp;</Glyphicon>
                Abandonar idea
              </Button>
            )}
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
            {!isUserCreator && project.proposal_url && (
              <Button bsStyle="success" onClick={() => {}} bsSize="small">
                <i className="fa fa-check">&nbsp;</i>&nbsp; Aceptar propuesta
              </Button>
            )}
          </Row>
        </Row>
      </Fragment>
    );
  }
}
