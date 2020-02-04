import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import history from '../../redux/history';
import { getUserById, editUser } from './myUserReducer';
import LoadingModal from '../../utils/LoadingModal';
import Title from '../../utils/Title';
import EditMyUserCareers from './MyUserCareers';
import EditMyUserForm from './MyUserForm';
import { myUserMessages } from '../../utils/messages';
import { getOnlyField } from '../../utils/services/functions';

export class MyUserIndex extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ready: false,
      profiles: props.activeUser.profiles,
      careers: props.activeUser.careers
    };
  }

  static propTypes = {
    userId: PropTypes.string,
    user: PropTypes.func,
    editUser: PropTypes.func,
    careers: PropTypes.array,
    profiles: PropTypes.array,
    activeUser: PropTypes.object
  };

  componentDidMount() {
    this.state.ready = false;
    this.props.user(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    this.state.ready = true;
    const newProfiles = nextProps.activeUser.profiles;
    const newCareers = nextProps.activeUser.careers;

    this.setState({
      ...this.state,
      profiles: newProfiles,
      careers: newCareers
    });
  }

  refreshProfiles = (newProfiles) => {
    this.setState({
      ...this.state,
      profiles: newProfiles
    });
  };

  refreshCareers = (newCareers) => {
    this.setState({
      ...this.state,
      careers: newCareers
    });
  };

  submitEditForm = () => {
    const profiles = getOnlyField(this.state.profiles, (profile) => profile.id);
    const careers = getOnlyField(this.state.careers, (career) => career.id);

    this.props.editUser(this.props.userId, profiles, careers);
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
            <Col md={12}>
              <Panel>
                <Panel.Body>
                  <EditMyUserCareers
                    activeUser={this.props.activeUser}
                    careers={this.props.careers}
                    refresh={this.refreshCareers}
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
  user: (userId) => {
    dispatch(getUserById(userId));
  },
  editUser: (userId, profiles, careers) => {
    dispatch(editUser(userId, profiles, careers));
  }
});

const mapStateToProps = (state, ownProps) => ({
  activeUser: state.userReducer.activeUser,
  userId: ownProps.match.params.id,
  profiles: state.userReducer.profiles,
  careers: state.userReducer.careers
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(MyUserIndex)
);
