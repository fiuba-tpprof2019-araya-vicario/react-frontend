import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { clearAlert, getMyTutorials } from './myTutorialsReducer';
import { getById } from '../../utils/services/functions';
import Title from '../../utils/Title';
import BorderScreen from '../../utils/styles/BorderScreen';
import { myTutorialsMessages } from '../../utils/messages';
import { MyTutorialsTable } from './MyTutorialsTable';
import CustomAlert from '../../utils/CustomAlert';

export class MyTutorialsIndex extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getMyTutorials: PropTypes.func,
    myTutorialss: PropTypes.array
  };

  constructor() {
    super();
    this.createMyTutorials = this.createMyTutorials.bind(this);
    this.editMyTutorials = this.editMyTutorials.bind(this);
    this.deleteMyTutorials = this.deleteMyTutorials.bind(this);
  }

  componentDidMount() {
    this.props.clearAlert();
    this.props.getMyTutorials();
  }

  createMyTutorials() {
    this.CreateModal.showModal();
  }

  editMyTutorials(id) {
    this.EditModal.showModal(getById(this.props.myTutorialss, id));
  }

  deleteMyTutorials(id) {
    const myTutorials = getById(this.props.myTutorialss, id);

    this.DeleteModal.getRef().showModal(myTutorials.id, myTutorials.name);
  }

  render() {
    return (
      <BorderScreen>
        <Title
          title={myTutorialsMessages.TITLE}
          subtitle={myTutorialsMessages.SUBTITLE}
        />
        <Row>
          <Button
            bsStyle="success"
            bsSize="small"
            className="pull-right"
            onClick={() => this.createMyTutorials()}
          >
            <i className="fa fa-plus" aria-hidden="true">
              &nbsp;
            </i>
            Crear Requerimiento
          </Button>
        </Row>
        <br />
        {this.renderTable()}
      </BorderScreen>
    );
  }

  renderTable() {
    if (
      this.props.myTutorialss == null ||
      this.props.myTutorialss.length === 0
    ) {
      return <CustomAlert message={myTutorialsMessages.NO_RESULTS_MESSAGE} />;
    }

    return (
      <MyTutorialsTable
        data={this.props.myTutorialss}
        editMyTutorials={this.editMyTutorials}
        deleteMyTutorials={this.deleteMyTutorials}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  myTutorialss: state.myTutorialsReducer.myTutorialss
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
