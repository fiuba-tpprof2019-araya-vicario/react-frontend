import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { myProjectMessages } from '../../../utils/messages';
import UploadPresentationModal from './modals/UploadPresentationModal';
import FullRow from '../../../utils/styles/FullRow';

export default class ShowPresentation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    name: PropTypes.string,
    element: PropTypes.string,
    canEdit: PropTypes.bool,
    upload: PropTypes.func
  };

  showUploadPresentationModal = () => {
    this.UploadPresentation.showModal();
  };

  render() {
    const { project, canEdit, upload, name, element } = this.props;
    const lowerCaseName = name.toLowerCase();
    const url = project.Presentation[`${element}_url`];
    const filename = project.Presentation[`${element}_name`];

    const presentation = url ? (
      <a
        className="fixMarginLeft"
        onClick={(event) => event.stopPropagation()}
        href={project.presentation_url}
        target="_blank"
      >
        {filename}
      </a>
    ) : (
      <span className="fixMarginLeft">
        {myProjectMessages.EMPTY_PRESENTATION(lowerCaseName)}
      </span>
    );

    return (
      <FullRow>
        <Fragment>
          <h4>{name}:</h4>
          <Row>
            {canEdit ? (
              <Fragment>
                <Button
                  bsStyle="success"
                  className="fixMarginLeft"
                  bsSize="xs"
                  onClick={() => this.showUploadPresentationModal()}
                >
                  <i className="fa fa-upload" />
                  {` Subir ${lowerCaseName}`}
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
            upload={upload}
            name={lowerCaseName}
            projectId={project.id}
            presentationId={project.Presentation.id}
            ref={(modal) => {
              this.UploadPresentation = modal;
            }}
          />
        </Fragment>
      </FullRow>
    );
  }
}
