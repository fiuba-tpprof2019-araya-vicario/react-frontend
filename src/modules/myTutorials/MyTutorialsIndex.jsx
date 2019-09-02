import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearAlert, getMyTutorials } from './myTutorialsReducer';
import Title from '../../utils/Title';
import BorderScreen from '../../utils/styles/BorderScreen';
import { myTutorialsMessages } from '../../utils/messages';
import { MyTutorialsTable } from './MyTutorialsTable';
import CustomAlert from '../../utils/CustomAlert';
import history from '../../redux/history';

export class MyTutorialsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getMyTutorials: PropTypes.func,
    myTutorials: PropTypes.array
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getMyTutorials();
  }

  detailAction(id) {
    history.push(`/my_tutorials/${id}`);
  }

  render() {
    return (
      <BorderScreen>
        <Title
          title={myTutorialsMessages.TITLE}
          subtitle={myTutorialsMessages.SUBTITLE}
        />
        <br />
        {this.renderTable()}
      </BorderScreen>
    );
  }

  renderTable() {
    if (this.props.myTutorials == null || this.props.myTutorials.length === 0) {
      return <CustomAlert message={myTutorialsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <MyTutorialsTable
        data={this.props.myTutorials}
        showProjectDetail={this.detailAction}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  myTutorials: state.myTutorialsReducer.myTutorials
});

const mapDispatch = (dispatch) => ({
  getMyTutorials: () => {
    dispatch(getMyTutorials());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyTutorialsIndex)
);
