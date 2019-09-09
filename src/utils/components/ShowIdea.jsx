import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Glyphicon, Row } from 'react-bootstrap';
import GooglePicker from 'react-google-picker';
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
import { myProjectMessages } from '../../utils/messages';
import { CLIENT_ID, DEVELOPER_KEY, SCOPE } from '../../api/api';

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
    uploadProposalUrl: PropTypes.func
  };

  constructor() {
    super();

    this.uploadProposalUrl = this.uploadProposalUrl.bind(this);
  }

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

  uploadProposalUrl(data) {
    if (data.action === 'picked') {
      this.props.uploadProposalUrl(this.props.project, data.docs[0].url);
    }
  }

  render() {
    const {
      project,
      showBackButton,
      showAbandonButton,
      userId,
      showUploadIdeaModal,
      isUserCreator,
      showProposal,
      nextStepMessage,
      showAbandonIdeaModal
    } = this.props;

    console.log(project);

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
            <Itemized
              title="Fecha de creación:"
              items={[formatterDate(project.createdAt)]}
            />
            <Itemized
              title="Carreras:"
              items={project.Careers && getOnlyField(project.Careers, 'name')}
            />
          </FullRow>
          <br />
          <Row>
            <h4>Descripción:</h4>
            <p>{project.description}</p>
          </Row>
          {showProposal && (
            <Row>
              <h4>Propuesta:</h4>
              <Row>
                <GooglePicker
                  clientId={CLIENT_ID}
                  developerKey={DEVELOPER_KEY}
                  scope={SCOPE}
                  onChange={this.uploadProposalUrl}
                  onAuthFailed={() => {}}
                  multiselect
                  navHidden
                  authImmediate={false}
                  mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                  viewId="DOCS"
                >
                  <Button
                    bsStyle="success"
                    className="fixMarginLeft"
                    bsSize="small"
                  >
                    <i className="fa fa-pencil">&nbsp;</i>&nbsp;Subir propuesta
                  </Button>
                  &nbsp;
                  {project.proposal_url ? (
                    <span>{project.proposal_url}</span>
                  ) : (
                    <span>{myProjectMessages.EMPTY_PROPOSAL}</span>
                  )}
                </GooglePicker>
              </Row>
            </Row>
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
          </Row>
        </Row>
      </Fragment>
    );
  }
}
