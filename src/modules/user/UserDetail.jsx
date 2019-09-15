import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import history from '../../redux/history';
import { getUserById, clearAlert, editUser } from './userReducer';
import LoadingModal from '../../utils/LoadingModal';
import Title from '../../utils/Title';
import EditUserProfiles from './EditUserProfiles';
import EditUserForm from './EditUserForm';
import { userMessages } from '../../utils/messages';
import { getOnlyField } from '../../utils/services/functions';

export class UserDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ready: false,
      profiles: props.profiles
    };
    this.submitEditForm = this.submitEditForm.bind(this);
    this.refreshProfiles = this.refreshProfiles.bind(this);
  }

  static propTypes = {
    userId: PropTypes.string,
    user: PropTypes.func,
    editUser: PropTypes.func,
    profiles: PropTypes.array,
    activeUser: PropTypes.object
  };

  componentDidMount() {
    this.state.ready = false;
    this.props.user(this.props.userId);
  }

  componentWillReceiveProps() {
    this.state.ready = true;
  }

  refreshProfiles(newProfiles) {
    this.setState({
      ...this.state,
      profiles: newProfiles
    });
  }

  submitEditForm() {
    // this.formEdit.wrappedInstance.editarUserSubmit();
    const profiles = getOnlyField(this.state.profiles, 'id');

    this.props.editUser(this.props.userId, profiles);
  }

  render() {
    if (this.state.ready) {
      return (
        <Grid fluid>
          <Title title={userMessages.TITLE} />
          <EditUserForm
            ref={(formEdit) => {
              this.formEdit = formEdit;
            }}
            profiles={this.props.profiles}
            user={this.props.activeUser}
          />
          <Row>
            <Col md={8}>
              <Panel>
                <Panel.Body>
                  <EditUserProfiles
                    activeUser={this.props.activeUser}
                    profiles={this.props.profiles}
                    refresh={this.refreshProfiles}
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
  clearAlert: () => {
    dispatch(clearAlert());
  },
  editUser: (userId, profiles) => {
    dispatch(editUser(userId, profiles));
  }
});

const mapStateToProps = (state, ownProps) => ({
  alert: state.userReducer.alert,
  activeUser: state.userReducer.activeUser,
  userId: ownProps.match.params.id,
  profiles: state.userReducer.profiles
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(UserDetail)
);
