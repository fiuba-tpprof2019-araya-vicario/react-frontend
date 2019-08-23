import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  getRequirements,
  uploadRequirement
} from './requirementReducer';
import Title from '../../utils/Title';
import BorderScreen from '../../utils/styles/BorderScreen';
import { requirementMessages } from '../../utils/messages';
import { RequirementTable } from './RequirementTable';
import CustomAlert from '../../utils/CustomAlert';
import CreateRequirementModal from './modals/CreateRequirementModal';

export class RequirementIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getRequirements: PropTypes.func,
    uploadRequirement: PropTypes.func,
    requirements: PropTypes.array
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getRequirements();
  }

  createRequirement() {
    this.CreateModal.showModal();
  }

  render() {
    return (
      <BorderScreen>
        <Title
          title={requirementMessages.TITLE}
          subtitle={requirementMessages.SUBTITLE}
        />
        <Row>
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
        </Row>
        <br />
        {this.renderTable()}
        <CreateRequirementModal
          uploadRequirement={this.props.uploadRequirement}
          ref={(modal) => {
            this.CreateModal = modal;
          }}
        />
      </BorderScreen>
    );
  }

  renderTable() {
    if (
      this.props.requirements == null ||
      this.props.requirements.length === 0
    ) {
      return <CustomAlert message={requirementMessages.NO_RESULTS_MESSAGE} />;
    }

    return <RequirementTable data={this.props.requirements} />;
  }
}

const mapStateToProps = (state) => ({
  requirements: state.requirementReducer.requirements
});

const mapDispatch = (dispatch) => ({
  getRequirements: () => {
    dispatch(getRequirements());
  },
  uploadRequirement: (form) => {
    dispatch(uploadRequirement(form));
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
