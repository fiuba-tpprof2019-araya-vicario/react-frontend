import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { resetDashboard } from './dashboardReducer';
import { CustomGraphic } from '../../utils/CustomGraphic';
import { dashboardMessages } from '../../utils/messages';
import Title from '../../utils/Title';

export class DashboardIndex extends React.Component {
  static propTypes = {
    clearResult: PropTypes.func,
    data: PropTypes.array
  };

  componentDidMount() {
    this.props.clearResult();
  }

  recargar = () => {
    this.props.clearResult();
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Title
            title={dashboardMessages.TITLE}
            subtitle={dashboardMessages.SUBTITLE}
          />
          <Col lg={4} md={4} sm={4} xs={4}>
            <br />
            <Button
              bsStyle="success"
              bsSize="xsmall"
              className="pull-right"
              onClick={this.recargar}
            >
              <Glyphicon glyph="repeat" />
              Recargar
            </Button>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col lg={12}>
            <Panel
              style={{ backgroundColor: '#FFFFFF', borderColor: '#3a46b0' }}
            >
              {/* <Panel.Heading style={{ textAlign: 'center', backgroundColor: '#3f51b5', borderColor: '#3a46b0', color: 'white', height: 35 }}>
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Entregados
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Cancelados
                  </Col>
                </Panel.Title>
              </Panel.Heading> */}
              <Panel.Body>
                <Col lg={12}>
                  {this.props.data && this.props.data && (
                    <CustomGraphic
                      YAxis="Pedidos"
                      desc1="entregados"
                      desc2=""
                      data={this.props.data}
                    />
                  )}
                </Col>
              </Panel.Body>
              <Panel.Footer
                style={{
                  backgroundColor: '#3a46b0',
                  borderColor: '#3a46b0',
                  color: 'white',
                  fontSize: 15
                }}
              >
                <b>
                  <Glyphicon glyph="phone-alt" /> PEDIDOS ENTREGADOS EN LOS
                  ÚLTIMOS 30 DIAS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  clearResult: () => {
    dispatch(resetDashboard());
  }
});

const mapStateToProps = (state) => ({
  data: state.dashboardReducer.data
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(DashboardIndex)
);
