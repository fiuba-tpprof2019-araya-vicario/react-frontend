import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
// import GooglePicker from 'react-google-picker';
import { myProjectMessages } from '../../../utils/messages';
import UploadProposalModal from './modals/UploadProposalModal';
// import { CLIENT_ID, DEVELOPER_KEY, SCOPE } from '../../api/api';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    isUserCreator: PropTypes.bool,
    uploadProposal: PropTypes.func
  };

  constructor() {
    super();

    this.showUploadProposalModal = this.showUploadProposalModal.bind(this);
    // this.uploadProposal = this.uploadProposal.bind(this);
  }

  // uploadProposal(data) {
  //   if (data.action === 'picked') {
  //     this.props.uploadProposal(this.props.project, data.docs[0].url);
  //   }
  // }

  showUploadProposalModal() {
    this.UploadProposal.showModal();
  }

  render() {
    const { project, isUserCreator, uploadProposal } = this.props;
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
      <Row>
        <h4>Propuesta:</h4>
        <Row>
          {isUserCreator ? (
            <Fragment>
              {/* <GooglePicker
                clientId={CLIENT_ID}
                developerKey={DEVELOPER_KEY}
                scope={SCOPE}
                onChange={this.uploadProposal}
                onAuthFailed={() => {}}
                multiselect={false}
                navHidden
                authImmediate={false}
                mimeTypes={['application/pdf']}
                viewId="DOCS"
              >
                <Button
                  bsStyle="success"
                  className="fixMarginLeft"
                  bsSize="small"
                >
                  <i className="fa fa-upload">&nbsp;</i>&nbsp;Subir propuesta
                </Button>
                &nbsp;
                {proposal}
              </GooglePicker> */}
              <Button
                bsStyle="success"
                className="fixMarginLeft"
                bsSize="small"
                onClick={() => this.showUploadProposalModal()}
              >
                <i className="fa fa-upload">&nbsp;</i>&nbsp;Subir propuesta
              </Button>
              &nbsp;
              {proposal}
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
      </Row>
    );
  }
}
