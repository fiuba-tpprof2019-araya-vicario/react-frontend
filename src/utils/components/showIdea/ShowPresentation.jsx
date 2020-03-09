import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { myProjectMessages } from '../../../utils/messages';
import UploadPresentationModal from './modals/UploadPresentationModal';
import FullRow from '../../../utils/styles/FullRow';

export default class ShowPresentation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    canEditPresentation: PropTypes.bool,
    uploadPresentation: PropTypes.func
  };

  showUploadPresentationModal = () => {
    this.UploadPresentation.showModal();
  };

  render() {
    const { project, canEditPresentation, uploadPresentation } = this.props;
    const presentation = project.presentation_url ? (
      <a
        className="fixMarginLeft"
        onClick={(event) => event.stopPropagation()}
        href={project.presentation_url}
        target="_blank"
      >
        {project.presentation_name}
      </a>
    ) : (
      <span className="fixMarginLeft">
        {myProjectMessages.EMPTY_PRESENTATION}
      </span>
    );

    return (
      <FullRow>
        <Fragment>
          <h4>Presentación:</h4>
          <Row>
            {canEditPresentation ? (
              <Fragment>
                <Button
                  bsStyle="success"
                  className="fixMarginLeft"
                  bsSize="xs"
                  onClick={() => this.showUploadPresentationModal()}
                >
                  <i className="fa fa-upload">&nbsp;</i>&nbsp;Subir presentación
                </Button>
                &nbsp;
                {presentation}
                &nbsp;
              </Fragment>
            ) : (
              <Fragment>{presentation}</Fragment>
            )}
          </Row>
          <UploadPresentationModal
            uploadPresentation={uploadPresentation}
            projectId={project.id}
            ref={(modal) => {
              this.UploadPresentation = modal;
            }}
          />
        </Fragment>
      </FullRow>
    );
  }
}
