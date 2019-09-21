import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Glyphicon, Row } from 'react-bootstrap';
import history from '../../redux/history';
import CustomAlert from '../../utils/CustomAlert';
import {
  formatterDate,
  getFullName,
  getOnlyField,
  getStudentFullName,
  getRequestFromUser,
  getTutorFullName
} from '../../utils/services/functions';
import FullRow from '../../utils/styles/FullRow';
import Itemized from '../../utils/styles/Itemized';
import AcceptProposalModal from './modals/AcceptProposalModal';
import ShowProposal from './ShowProposal';
import getStatusIcon from '../forms/StatusIcon';

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
    acceptProposal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func
  };

  constructor() {
    super();

    this.showAcceptProposalModal = this.showAcceptProposalModal.bind(this);
  }

  getAutors() {
    const { Creator, Students } = this.props.project;
    const autors = [];

    if (Creator && Students) {
      autors.push(`Creador: ${getFullName(Creator)}`);
      Students.forEach((student) => {
        const fullName = getStudentFullName(student);

        autors.push(
          <span>
            Participante: {fullName}
            {getStatusIcon(
              `estudiante ${fullName}`,
              student.StudentRequests[0].accepted_proposal
            )}
          </span>
        );
      });
    }

    return autors;
  }

  getTutors() {
    const { Tutor, Cotutors } = this.props.project;
    const tutors = [];

    if (Tutor && Cotutors) {
      const fullName = getTutorFullName(Tutor);

      tutors.push(
        <span>
          Tutor: {fullName}
          {getStatusIcon(
            `tutor ${fullName}`,
            Tutor.TutorRequests[0].accepted_proposal
          )}
        </span>
      );
      Cotutors.forEach((tutor) => {
        tutors.push(`Cotutor: ${getTutorFullName(tutor)}`);
      });
    }

    return tutors;
  }

  showAcceptProposalModal() {
    this.AcceptProposal.showModal();
  }

  render() {
    const {
      project,
      showBackButton,
      showAbandonButton,
      userId,
      showUploadIdeaModal,
      uploadProposal,
      acceptProposal,
      isUserCreator,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    const request = getRequestFromUser(userId, project);

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
            {!isUserCreator &&
              project.proposal_url &&
              request &&
              request.accepted_proposal !== 'accepted' && (
                <Button
                  bsStyle="success"
                  onClick={() => this.showAcceptProposalModal()}
                  bsSize="small"
                >
                  <i className="fa fa-check">&nbsp;</i>&nbsp; Aceptar propuesta
                </Button>
              )}
          </Row>
        </Row>
        <AcceptProposalModal
          acceptProposal={acceptProposal}
          requestId={request && request.id}
          ref={(modal) => {
            this.AcceptProposal = modal;
          }}
        />
      </Fragment>
    );
  }
}
