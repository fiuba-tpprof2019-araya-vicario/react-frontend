import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearAlert, getInitialData } from './commissionsReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import CommissionsTable from './CommissionsTable';
import CustomAlert from '../../utils/CustomAlert';
import history from '../../redux/history';

export class CommissionsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getInitialData: PropTypes.func,
    projects: PropTypes.array
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getInitialData();
  }

  detailAction(id) {
    history.push(`/commissions/${id}`);
  }

  render() {
    return (
      <Fragment>
        <Title
          title={commissionsMessages.TITLE}
          subtitle={commissionsMessages.SUBTITLE}
        />
        <br />
        {this.renderTable()}
      </Fragment>
    );
  }

  renderTable() {
    if (this.props.projects == null || this.props.projects.length === 0) {
      return <CustomAlert message={commissionsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <CommissionsTable data={this.props.projects} show={this.detailAction} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.commissionsReducer.projects
});

const mapDispatch = (dispatch) => ({
  getInitialData: () => {
    dispatch(getInitialData());
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
