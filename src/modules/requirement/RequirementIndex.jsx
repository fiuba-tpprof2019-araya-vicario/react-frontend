import React from 'react';
import { connect } from 'react-redux';
import { clearAlert, getRequirements, uploadRequirements } from './requirementReducer';
import Title from '../../utils/Title';
import { Button, Row } from 'react-bootstrap';
import BorderScreen from '../../utils/styles/BorderScreen';
import { requirementMessages } from '../../utils/messages';
import { withRouter } from 'react-router-dom';
import { RequirementTable } from './RequirementTable';
import CustomAlert from '../../utils/CustomAlert';
import CreateRequirementModal from './modals/CreateRequirementModal';

export class RequirementIndex extends React.Component {

  componentDidMount () {
    this.props.clearAlert();
    this.props.getRequirements();
  }

  createRequirement() {
    this.CreateModal.showModal();
  }

  render () {
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
            onClick={() => this.createRequirement()}>
            <i className="fa fa-plus" aria-hidden="true">&nbsp;</i> Crear Requerimiento
          </Button> 
        </Row>
        <br />
        { this.renderTable() }
        <CreateRequirementModal           
          ref={(modal) => {
            this.CreateModal = modal;
          }}
        />
      </BorderScreen>
    );
  }

  renderTable () {
    if (this.props.requirements == null || this.props.requirements.length === 0) {
      return (
        <CustomAlert message={requirementMessages.NO_RESULTS_MESSAGE}/>
      );
    } else {
      return (
        <RequirementTable data={this.props.requirements} />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    requirements: state.requirementReducer.requirements
  };
};

const mapDispatch = dispatch => ({
  getRequirements: () => {
    dispatch(getRequirements());
  },
  uploadRequirements: (form) => {
    dispatch(uploadRequirements(form));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatch)(RequirementIndex));
