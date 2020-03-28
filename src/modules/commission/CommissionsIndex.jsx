import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import Select from 'react-select';
import { getInitialData } from './commissionsReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import Field from '../../utils/forms/Field';
import { commissionsMessages } from '../../utils/messages';
import { getSelectOptions } from '../../utils/services/functions';
import CommissionsTable from './CommissionsTable';
import Alert from '../../utils/Alert';
import history from '../../redux/history';

export class CommissionsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    pendingProjects: PropTypes.array,
    approvedProjects: PropTypes.array,
    terminatedProjects: PropTypes.array,
    user: PropTypes.object
  };

  state = {
    approved: false,
    terminated: false,
    selectedCareer: -1
  };

  componentDidMount() {
    const { approved, terminated, selectedCareer } = this.state;

    this.props.clearAlert();
    this.props.getInitialData(approved, terminated, selectedCareer);
  }

  detailAction = (id) => {
    history.push(`/commissions/${id}`);
  };

  handleSelect = (select) => {
    const approved = select === 2;
    const terminated = select === 3;

    this.setState({ approved, terminated });
    this.props.getInitialData(approved, terminated, this.state.selectedCareer);
  };

  getCareerOptions = () => {
    const { careers } = this.props.user;

    return careers ? getSelectOptions(careers, {}) : [];
  };

  updateCareerSelect = (newValue) => {
    const { approved, terminated } = this.state;
    const selectedCareer = newValue != null ? newValue.value : -1;

    this.setState({ selectedCareer });
    this.props.getInitialData(approved, terminated, selectedCareer);
  };

  render() {
    const {
      pendingProjects,
      approvedProjects,
      terminatedProjects
    } = this.props;

    return (
      <Fragment>
        <Title
          title={commissionsMessages.TITLE}
          subtitle={commissionsMessages.SUBTITLE}
        />
        <br />
        <Tabs defaultActiveKey={1} id="tab" onSelect={this.handleSelect}>
          <br />
          <Field
            bsSize="small"
            label="Carrera"
            inputComponent={
              <Select
                key="careerSelect"
                name="careerelect"
                clearable={false}
                value={this.state.selectedCareer}
                options={this.getCareerOptions()}
                id="careerSelect"
                onChange={this.updateCareerSelect}
                placeholder="Filtra por una carrera"
              />
            }
          />
          <Tab eventKey={1} title="Proyectos pendientes">
            {this.renderTable(pendingProjects)}
          </Tab>
          <Tab eventKey={2} title="Proyectos aprobados">
            {this.renderTable(approvedProjects)}
          </Tab>
          <Tab eventKey={3} title="Proyectos terminados">
            {this.renderTable(terminatedProjects)}
          </Tab>
        </Tabs>
      </Fragment>
    );
  }

  renderTable(projects) {
    if (!projects || projects.length === 0) {
      return (
        <Fragment>
          <br />
          <Alert message={commissionsMessages.NO_RESULTS_MESSAGE} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <br />
        <CommissionsTable data={projects} show={this.detailAction} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingProjects: state.commissionsReducer.pendingProjects,
  approvedProjects: state.commissionsReducer.approvedProjects,
  terminatedProjects: state.commissionsReducer.terminatedProjects,
  user: state.authReducer.user
});

const mapDispatch = (dispatch) => ({
  getInitialData: (approved, terminated, selectedCareer) => {
    dispatch(getInitialData(approved, terminated, selectedCareer));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(CommissionsIndex)
);
