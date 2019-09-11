import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import GooglePicker from 'react-google-picker';
import { myProjectMessages } from '../../utils/messages';
import { CLIENT_ID, DEVELOPER_KEY, SCOPE } from '../../api/api';

export default class ShowIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    isUserCreator: PropTypes.bool,
    uploadProposalUrl: PropTypes.func
  };

  constructor() {
    super();

    this.uploadProposalUrl = this.uploadProposalUrl.bind(this);
  }

  uploadProposalUrl(data) {
    if (data.action === 'picked') {
      this.props.uploadProposalUrl(this.props.project, data.docs[0].url);
    }
  }

  render() {
    const { project, isUserCreator } = this.props;
    const proposal = project.proposal_url ? (
      <a
        className="fixMarginLeft"
        onClick={(event) => event.stopPropagation()}
        href={project.proposal_url}
        target="_blank"
      >
        {project.proposal_url}
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
              <GooglePicker
                clientId={CLIENT_ID}
                developerKey={DEVELOPER_KEY}
                scope={SCOPE}
                onChange={this.uploadProposalUrl}
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
              </GooglePicker>
            </Fragment>
          ) : (
            <Fragment>{proposal}</Fragment>
          )}
        </Row>
      </Row>
    );
  }
}
