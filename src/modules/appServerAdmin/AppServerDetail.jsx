import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getAppServerDetail } from './appServerReducer';
import { Row, Col, Label, Button, Glyphicon } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import RequestsGraph from './RequestsGraph';
import { Loading } from '../../utils/Loading';
import history from '../../redux/history';

export class AppServerIndex extends React.Component {
  constructor() {
    super();
    this.recargar = this.recargar.bind(this);
  }

  componentDidMount() {
    this.props.getAppServerDetail(this.props.match.params.id);
  }

  abrirCrearAppServerModal() {
    this.crearAppServerModal.wrappedInstance.abrirModal();
  }

  recargar() {
    this.props.getAppServerDetail(this.props.match.params.id);
  }

  render() {
    if (this.props.active != null) {
      return (
        <Fragment>
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <h2>App server: {this.props.active.name} </h2>
              <Label bsStyle={this.props.data?'success':'danger'}>
                {this.props.data?'Online':'Offline'}
              </Label>
            </Col>

          </Row>
          <Row>
            <Col lg={11}>
              <h4>Requests / hora</h4>            
            </Col>
            <Col lg={1}>
              <Button bsStyle="success" bsSize="xsmall" className="pull-right" onClick={this.recargar}>
                <Glyphicon glyph="repeat" />Recargar
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <RequestsGraph />
            </Col>
            <Col lg={12}>
              <Button bsStyle="default" bsSize="small" onClick={history.goBack}>Volver</Button>
            </Col>
          </Row>
        </Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => ({
  active: state.appServerReducer.active,
  data: state.appServerReducer.activeMetricsData
});

const mapDispatch = (dispatch) => ({
  getAppServerDetail: (id) => {
    dispatch(getAppServerDetail(id));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatch)(AppServerIndex));
