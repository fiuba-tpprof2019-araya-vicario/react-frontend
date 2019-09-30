import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getRequirements,
  deleteRequirement,
  editRequirement,
  uploadRequirement
} from './requirementReducer';
import { getById } from '../../utils/services/functions';
import Title from '../../utils/Title';
import { requirementMessages } from '../../utils/messages';
import { CREDENTIALS } from '../../utils/services/references';
import { RequirementTable } from './RequirementTable';
import CustomAlert from '../../utils/CustomAlert';
import UploadIdeaModal from '../../utils/components/uploadIdea/UploadIdeaModal';
import CreateRequirementModal from './modals/CreateRequirementModal';
import EditRequirementModal from './modals/EditRequirementModal';
import DeleteRequirementModal from './modals/DeleteRequirementModal';
import WithAuthorization from '../../utils/WithAuthorization';

export class RequirementIndex extends React.Component {
  static propTypes = {
    canEdit: PropTypes.bool,
    clearAlert: PropTypes.func,
    getRequirements: PropTypes.func,
    uploadRequirement: PropTypes.func,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func,
    requirements: PropTypes.array
  };

  constructor() {
    super();
    this.createRequirement = this.createRequirement.bind(this);
    this.editRequirement = this.editRequirement.bind(this);
    this.deleteRequirement = this.deleteRequirement.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getRequirements();
  }

  createRequirement() {
    this.CreateModal.showModal();
  }

  editRequirement(id) {
    this.EditModal.showModal(getById(this.props.requirements, id));
  }

  showUploadIdea(id) {
    this.UploadIdeaModal.showModal(getById(this.props.requirements, id));
  }

  deleteRequirement(id) {
    const requirement = getById(this.props.requirements, id);

    this.DeleteModal.getRef().showModal(requirement.id, requirement.name);
  }

  render() {
    return (
      <Fragment>
        <Title
          title={requirementMessages.TITLE}
          subtitle={requirementMessages.SUBTITLE}
        />
        <Row>
          <WithAuthorization
            requiredCredentials={CREDENTIALS.EDIT_REQUIREMENTS}
          >
            <Button
              bsStyle="success"
              bsSize="small"
              className="pull-right"
              onClick={() => this.createRequirement()}
            >
              <i className="fa fa-plus" aria-hidden="true">
                &nbsp;
              </i>
              Crear Requerimiento
            </Button>
          </WithAuthorization>
        </Row>
        <br />
        {this.renderTable()}
        <CreateRequirementModal
          uploadRequirement={this.props.uploadRequirement}
          ref={(modal) => {
            this.CreateModal = modal;
          }}
        />
        <EditRequirementModal
          editRequirement={this.props.editRequirement}
          ref={(modal) => {
            this.EditModal = modal;
          }}
        />
        <DeleteRequirementModal
          onDelete={this.props.deleteRequirement}
          ref={(modal) => {
            this.DeleteModal = modal;
          }}
        />
        <UploadIdeaModal
          // uploadIdea={this.uploadIdea}
          // editIdea={this.editIdea}
          // careers={this.props.careers}
          // coautors={this.props.coautors}
          // tutors={this.props.tutors}
          // projectTypes={this.props.projectTypes}
          // project={this.props.project}
          // editMode={this.state.activeStep}
          ref={(modal) => {
            this.UploadIdeaModal = modal;
          }}
          // user={this.props.isAuthenticated && this.props.user}
        />
      </Fragment>
    );
  }

  renderTable() {
    if (
      this.props.requirements == null ||
      this.props.requirements.length === 0
    ) {
      return <CustomAlert message={requirementMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <RequirementTable
        data={this.props.requirements}
        editRequirement={this.editRequirement}
        deleteRequirement={this.deleteRequirement}
        uploadProject={this.uploadProject}
        uploadIdea={this.showUploadIdea}
        canEdit={this.props.canEdit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  requirements: state.requirementReducer.requirements,
  canEdit: state.authReducer.user.credentials.includes(
    CREDENTIALS.EDIT_REQUIREMENTS
  )
});

const mapDispatch = (dispatch) => ({
  getRequirements: () => {
    dispatch(getRequirements());
  },
  uploadRequirement: (form) => {
    dispatch(uploadRequirement(form));
  },
  editRequirement: (id, form) => {
    dispatch(editRequirement(id, form));
  },
  deleteRequirement: (id, form) => {
    dispatch(deleteRequirement(id, form));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(RequirementIndex)
);
