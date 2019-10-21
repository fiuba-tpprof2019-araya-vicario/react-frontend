import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { resetDashboard, clearAlert } from './dashboardReducer';
import { CustomAlert } from '../../utils/CustomAlert';
import { CustomGraphic } from '../../utils/CustomGraphic';

export class DashboardIndex extends React.Component {
  constructor() {
    super();

    this.recargar = this.recargar.bind(this);
  }

  componentDidMount() {
    this.props.clearResult();
  }

  recargar() {
    this.props.clearResult();
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={8} lg={8} sm={8} xs={8}>
            <h4>Dashboard</h4>
          </Col>
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
        {this.props.alert.text != null && (
          <CustomAlert
            onDismiss={this.props.clearAlert}
            clear={this.props.clearAlert}
            rowKey="alertRow"
            bsStyle={this.props.alert.style}
            message={this.props.alert.text}
          />
        )}
        <Row>
          <br />
        </Row>
        <Row>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Habilitados
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Deshabilitados
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: '#449d44',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.comercios && this.props.comercios.habilitados}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: '#d9534f',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.comercios &&
                      this.props.comercios.deshabilitados}
                  </b>
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
                  <Glyphicon glyph="home" /> CANTIDAD DE COMERCIOS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Habilidatos
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Deshabilitados
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: '#449d44',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.usuarios && this.props.usuarios.habilitados}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: '#d9534f',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.usuarios && this.props.usuarios.deshabilitados}
                  </b>
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
                  <Glyphicon glyph="user" /> CANTIDAD DE USUARIOS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Últimos 30 dias
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Día Actual
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      '$' + this.props.pedidos.ventasMes.toFixed(2)}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      '$' + this.props.pedidos.ventasHoy.toFixed(2)}
                  </b>
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
                  <Glyphicon glyph="usd" /> FACTURACIÓN
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
        {/* Pedidos */}
        <Row>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Últimos 30 dias
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Día Actual
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      this.props.pedidos.pedidosEntregadosMes}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      this.props.pedidos.pedidosEntregadosHoy}
                  </b>
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
                  <Glyphicon glyph="ok" /> PEDIDOS ENTREGADOS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Últimos 30 dias
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Día Actual
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      this.props.pedidos.pedidosCanceladosMes}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      this.props.pedidos.pedidosCanceladosHoy}
                  </b>
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
                  <Glyphicon glyph="remove" /> PEDIDOS CANCELADOS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col lg={4}>
            <Panel>
              <Panel.Heading
                style={{
                  textAlign: 'center',
                  backgroundColor: '#3f51b5',
                  borderColor: '#3a46b0',
                  color: 'white',
                  height: 35
                }}
              >
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Últimos 30 dias
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: 'white' }}>
                    Día actual
                  </Col>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body
                style={{ backgroundColor: '#ABB0D5', borderColor: '#3a46b0' }}
              >
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      '$' + (this.props.pedidos.ventasMes * 0.01).toFixed(2)}
                  </b>
                </Col>
                <Col
                  lg={6}
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 30,
                    padding: '0px',
                    margin: '0px',
                    lineHeight: '0.7'
                  }}
                >
                  <b>
                    {this.props.pedidos &&
                      '$' + (this.props.pedidos.ventasHoy * 0.01).toFixed(2)}
                  </b>
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
                  <Glyphicon glyph="usd" /> FEE HOY COMO
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
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
                  {this.props.pedidos && this.props.pedidos.pedidos && (
                    <CustomGraphic
                      YAxis={'Pedidos'}
                      desc1={'entregados'}
                      desc2={''}
                      pedidos={this.props.pedidos.pedidos}
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
        <Row>
          <Col lg={12}>
            <Panel
              style={{ backgroundColor: '#FFFFFF', borderColor: '#3a46b0' }}
            >
              {/* <Panel.Heading style={{ textAlign: 'center', backgroundColor: '#3f51b5', borderColor: '#3a46b0', color: 'white', height: 35 }}>
                <Panel.Title>
                  <Col lg={6} style={{ textAlign: 'center', color: '#64bd64' }}>
                    <Glyphicon glyph="ok" /> Facturación de los comercios
                  </Col>
                  <Col lg={6} style={{ textAlign: 'center', color: '#e9635f' }}>
                    <Glyphicon glyph="remove" /> Pérdidas por cancelación
                  </Col>
                </Panel.Title>
              </Panel.Heading> */}
              <Panel.Body>
                <Col lg={12}>
                  {this.props.pedidos && this.props.pedidos.ventas && (
                    <CustomGraphic
                      YAxis={'Pesos'}
                      desc1={'facturados'}
                      desc2={'$'}
                      pedidos={this.props.pedidos.ventas}
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
                  <Glyphicon glyph="usd" /> FACTURACIÓN OBTENIDA EN LOS ÚLTIMOS
                  30 DIAS
                </b>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  clearResult: () => {
    dispatch(resetDashboard());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  }
});

const mapStateToProps = (state) => ({
    alert: state.dashboardReducer.alert,
    usuarios: state.dashboardReducer.dashboardUsuarios,
    comercios: state.dashboardReducer.dashboardComercios,
    pedidos: state.dashboardReducer.dashboardPedidos,
  });

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(DashboardIndex)
);
