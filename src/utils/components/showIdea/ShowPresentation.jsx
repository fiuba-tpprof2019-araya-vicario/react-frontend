import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import Switch from 'react-switch';
import MandatoryField from '../../../utils/forms/MandatoryField';
import { myProjectMessages } from '../../../utils/messages';
import UploadPresentationModal from './modals/UploadPresentationModal';
import FullRow from '../../../utils/styles/FullRow';

export default class ShowPresentation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    name: PropTypes.string,
    element: PropTypes.string,
    required: PropTypes.bool,
    canEdit: PropTypes.bool,
    isUserCreator: PropTypes.bool,
    upload: PropTypes.func,
    saveVisibility: PropTypes.func
  };

  state = { checked: false };

  componentDidMount() {
    const { project, element } = this.props;
    const visible = project.Presentation[`${element}_visible`];

    this.setVisibility(visible);
  }

  setVisibility = (checked) => {
    this.setState({ checked });
  };

  showUploadPresentationModal = () => {
    this.UploadPresentation.showModal();
  };

  handleChange = (checked) => {
    const {
      element,
      project: { id, Presentation }
    } = this.props;
    const key = `${element}_visible`;
    const newPresentation = {};

    newPresentation[key] = checked;
    this.setVisibility(checked);
    this.props.saveVisibility(id, Presentation.id, newPresentation);
  };

  render() {
    const {
      project,
      canEdit,
      upload,
      name,
      element,
      required,
      isUserCreator
    } = this.props;
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
          <h4>
            {name}
            <MandatoryField display-if={required} />:
          </h4>
          <Row>
            {canEdit && isUserCreator ? (
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
              presentation
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
        <Fragment display-if={canEdit}>
          <h4>Mostrar {lowerCaseName} en el portal público:</h4>
          <Switch onChange={this.handleChange} checked={this.state.checked} />
        </Fragment>
      </FullRow>
    );
  }
}
