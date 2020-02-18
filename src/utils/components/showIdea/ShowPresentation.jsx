import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { myProjectMessages } from '../../../utils/messages';
import UploadProposalModal from './modals/UploadProposalModal';
import FullRow from '../../../utils/styles/FullRow';

export default class ShowPresentation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    canEditProposal: PropTypes.bool,
    uploadProposal: PropTypes.func
  };

  showUploadProposalModal = () => {
    this.UploadProposal.showModal();
  };

  render() {
    const { project, canEditProposal, uploadProposal } = this.props;
    const proposal = project.proposal_url ? (
      <a
        className="fixMarginLeft"
        onClick={(event) => event.stopPropagation()}
        href={project.proposal_url}
        target="_blank"
      >
        {project.proposal_name}
      </a>
    ) : (
      <span className="fixMarginLeft">{myProjectMessages.EMPTY_PROPOSAL}</span>
    );

    return (
      <FullRow>
        <Fragment>
          <h4>Propuesta:</h4>
          <Row>
            {canEditProposal ? (
              <Fragment>
                <Button
                  bsStyle="success"
                  className="fixMarginLeft"
                  bsSize="xs"
                  onClick={() => this.showUploadProposalModal()}
                >
                  <i className="fa fa-upload">&nbsp;</i>&nbsp;Subir propuesta
                </Button>
                &nbsp;
                {proposal}
                &nbsp;
              </Fragment>
            ) : (
              <Fragment>{proposal}</Fragment>
            )}
          </Row>
          <UploadProposalModal
            uploadProposal={uploadProposal}
            projectId={project.id}
            ref={(modal) => {
              this.UploadProposal = modal;
            }}
          />
        </Fragment>
      </FullRow>
    );
  }
}
