import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import history from '../../redux/history';
import { getUserById, clearAlert } from './userReducer';
import LoadingModal from '../../utils/LoadingModal';
import Title from '../../utils/Title';
// import EditUserRoles from './EditUserRoles';
import EditUserForm from './EditUserForm';
import { userMessages } from '../../utils/messages';

export class UserDetail extends React.Component {
  constructor() {
    super();
    console.log('lalalalala');
    this.state = {
      ready: false
    };
    this.submitEditForm = this.submitEditForm.bind(this);
  }

  static propTypes = {
    userId: PropTypes.string,
    user: PropTypes.func,
    allRoles: PropTypes.array,
    activeUser: PropTypes.object
  };

  componentDidMount() {
    this.state.ready = false;
    this.props.user(this.props.userId);
  }

  componentWillReceiveProps() {
    this.state.ready = true;
  }

  submitEditForm() {
    this.formEdit.wrappedInstance.editarUserSubmit();
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
            allRoles={this.props.allRoles}
            user={this.props.activeUser}
          />
          <Row>
            <Col md={8}>
              <Panel>
                <Panel.Body>
                  {/* <EditUserRoles
                    activeUser={this.props.activeUser}
                    allRoles={this.props.allRoles}
                  /> */}
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
  }
});

const mapStateToProps = (state, ownProps) => ({
  alert: state.userReducer.alert,
  activeUser: state.userReducer.activeUser,
  userId: ownProps.match.params.id,
  allRoles: state.userReducer.allRoles
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(UserDetail)
);
