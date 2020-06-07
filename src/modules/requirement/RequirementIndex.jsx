import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  getInitialData,
  deleteRequirement,
  editRequirement,
  uploadRequirement
} from './requirementReducer';
import { clearAlert } from '../login/authReducer';
import { uploadIdea } from '../myProject/myProjectReducer';
import { getById } from '../../utils/services/functions';
import Title from '../../utils/Title';
import { requirementMessages } from '../../utils/messages';
import { CREDENTIALS } from '../../utils/services/references';
import { RequirementTable } from './RequirementTable';
import Alert from '../../utils/Alert';
import UploadIdeaModal from '../../utils/components/uploadIdea/UploadIdeaModal';
import CreateRequirementModal from './modals/CreateRequirementModal';
import EditRequirementModal from './modals/EditRequirementModal';
import DeleteRequirementModal from './modals/DeleteRequirementModal';
import WithAuth from '../../utils/WithAuthorization';
import history from '../../redux/history';

export class RequirementIndex extends React.Component {
  static propTypes = {
    canEdit: PropTypes.bool,
    clearAlert: PropTypes.func,
    uploadIdea: PropTypes.func,
    getInitialData: PropTypes.func,
    uploadRequirement: PropTypes.func,
    editRequirement: PropTypes.func,
    deleteRequirement: PropTypes.func,
    requirements: PropTypes.array,
    coautors: PropTypes.array,
    careers: PropTypes.array,
    similarStudents: PropTypes.array,
    similarTutors: PropTypes.array,
    projectTypes: PropTypes.array,
    tutors: PropTypes.array,
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.clearAlert();
    if (this.props.user) {
      this.props.getInitialData(this.props.user.id);
    }
  }

  createRequirement = () => {
    this.CreateModal.showModal();
  };

  editRequirement = (id) => {
    this.EditModal.showModal(getById(this.props.requirements, id));
  };

  showUploadIdea = (id) => {
    this.UploadIdeaModal.showModal(getById(this.props.requirements, id));
  };

  deleteRequirement = (id) => {
    const requirement = getById(this.props.requirements, id);

    this.DeleteModal.getRef().showModal(requirement.id, requirement.name);
  };

  viewRequirementPdf = (id) => {
    const requirement = getById(this.props.requirements, id);

    window.open(requirement.file_url, '_blank');
  };

  uploadIdea = (form) => {
    this.props.uploadIdea(form);
  };

  render() {
    const similiarStudentsIds = this.props.similarStudents.map(
      ({ value }) => value
    );
    const similiarTutorsIds = this.props.similarTutors.map(
      ({ value }) => value
    );

    return (
      <Fragment>
        <Title
          title={requirementMessages.TITLE}
          subtitle={requirementMessages.SUBTITLE}
        />
        <Row>
          <WithAuth requiredCredentials={CREDENTIALS.EDIT_REQUIREMENTS}>
            <Button
              bsStyle="success"
              bsSize="small"
              className="pull-right"
              onClick={() => this.createRequirement()}
            >
              <i className="fa fa-plus" aria-hidden="true" /> Crear
              Requerimiento
            </Button>
          </WithAuth>
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
          uploadIdea={this.uploadIdea}
          careers={this.props.careers}
          coautors={this.props.coautors.filter(
            ({ value }) => !similiarStudentsIds.includes(value)
          )}
          tutors={this.props.tutors.filter(
            ({ value }) => !similiarTutorsIds.includes(value)
          )}
          similarTutors={this.props.similarTutors}
          similarStudents={this.props.similarStudents}
          projectTypes={this.props.projectTypes}
          ref={(modal) => {
            this.UploadIdeaModal = modal;
          }}
          user={this.props.isAuthenticated && this.props.user}
        />
      </Fragment>
    );
  }

  renderTable() {
    if (
      this.props.requirements == null ||
      this.props.requirements.length === 0
    ) {
      return <Alert message={requirementMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <RequirementTable
        data={this.props.requirements}
        projectId={this.props.user.projectId}
        editRequirement={this.editRequirement}
        deleteRequirement={this.deleteRequirement}
        uploadProject={this.uploadProject}
        uploadIdea={this.showUploadIdea}
        viewRequirementPdf={this.viewRequirementPdf}
        canEdit={this.props.canEdit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  requirements: state.requirementReducer.requirements,
  canEdit: state.authReducer.user.credentials.includes(
    CREDENTIALS.EDIT_REQUIREMENTS
  ),
  coautors: state.myProjectReducer.coautors,
  careers: state.myProjectReducer.careers,
  projectTypes: state.myProjectReducer.projectTypes,
  similarStudents: state.myProjectReducer.similarStudents,
  similarTutors: state.myProjectReducer.similarTutors,
  tutors: state.myProjectReducer.tutors,
  user: state.authReducer.user,
  isAuthenticated: state.authReducer.isAuthenticated
});

const mapDispatch = (dispatch) => ({
  getInitialData: (userId) => {
    dispatch(getInitialData(userId));
  },
  uploadRequirement: (form) => {
    dispatch(uploadRequirement(form));
  },
  editRequirement: (id, form) => {
    dispatch(editRequirement(id, form));
  },
  uploadIdea: (form) => {
    dispatch(uploadIdea(form, () => history.push('/my_projects/')));
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
