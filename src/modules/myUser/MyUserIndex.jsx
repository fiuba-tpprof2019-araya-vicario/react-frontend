import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import history from '../../redux/history';
import { getInitialData, editUser } from './myUserReducer';
import LoadingModal from '../../utils/LoadingModal';
import Title from '../../utils/Title';
import EditMyUserCareers from './MyUserCareers';
import EditMyUserInterests from './MyUserInterests';
import EditMyUserForm from './MyUserForm';
import { myUserMessages } from '../../utils/messages';

export class MyUserIndex extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ready: false,
      userInterests: props.activeUser.userInterests
    };
  }

  static propTypes = {
    userId: PropTypes.string,
    getInitialData: PropTypes.func,
    editUser: PropTypes.func,
    careers: PropTypes.array,
    profiles: PropTypes.array,
    interests: PropTypes.array,
    userInterests: PropTypes.array,
    activeUser: PropTypes.object
  };

  componentDidMount() {
    this.state.ready = false;
    this.props.getInitialData();
  }

  componentWillReceiveProps(nextProps) {
    this.state.ready = true;
    const newUserInterests = nextProps.userInterests;

    this.setState({ userInterests: newUserInterests });
  }

  refreshInterests = (newInterests) => {
    this.setState({ userInterests: newInterests });
  };

  submitEditForm = () => {
    const userInterests = this.state.userInterests.map(({ id }) => id);

    this.props.editUser(this.props.userId, userInterests);
  };

  render() {
    if (this.state.ready) {
      return (
        <Grid fluid>
          <Title title={myUserMessages.TITLE} />
          <EditMyUserForm
            ref={(formEdit) => {
              this.formEdit = formEdit;
            }}
            profiles={this.props.profiles}
            user={this.props.activeUser}
          />
          <Row>
            <Col md={6}>
              <Panel>
                <Panel.Body>
                  <EditMyUserCareers
                    activeUser={this.props.activeUser}
                    careers={this.props.careers}
                  />
                </Panel.Body>
              </Panel>
            </Col>
            <Col md={6}>
              <Panel>
                <Panel.Body>
                  <EditMyUserInterests
                    activeUser={this.props.activeUser}
                    interests={this.props.interests}
                    userInterests={this.props.userInterests}
                    refresh={this.refreshInterests}
                  />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Button
                bsStyle="primary"
                bsSize="small"
                onClick={this.submitEditForm}
              >
                Guardar
              </Button>
              &nbsp;
              <Button bsStyle="default" bsSize="small" onClick={history.goBack}>
                Volver
              </Button>
            </Col>
          </Row>
        </Grid>
      );
    }

    return <LoadingModal />;
  }
}

const mapDispatch = (dispatch) => ({
  getInitialData: (userId) => {
    dispatch(getInitialData(userId));
  },
  editUser: (userId, profiles, careers) => {
    dispatch(editUser(userId, profiles, careers));
  }
});

const mapStateToProps = (state) => ({
  activeUser: state.authReducer.user,
  profiles: state.myUserReducer.profiles,
  careers: state.myUserReducer.careers,
  interests: state.myUserReducer.interests,
  userInterests: state.myUserReducer.userInterests
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyUserIndex)
);
