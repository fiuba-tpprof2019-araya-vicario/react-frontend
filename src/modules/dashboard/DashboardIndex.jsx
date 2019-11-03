import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Center from 'react-center';
import Select from 'react-select';
import Field from '../../utils/forms/Field';
import { resetDashboard } from './dashboardReducer';
import VerticalBarGraphic from '../../utils/graphics/VerticalBarGraphic';
import RadialGraphic from '../../utils/graphics/RadialGraphic';
import { dashboardMessages } from '../../utils/messages';
import Title from '../../utils/Title';

export class DashboardIndex extends React.Component {
  static propTypes = {
    resetDashboard: PropTypes.func,
    projects: PropTypes.object
  };

  state = {
    selectedYear: new Date().getFullYear()
  };

  componentDidMount() {
    this.recargar();
  }

  updateYearSelected = (newValue) => {
    const selectedYear = newValue != null ? newValue.value : -1;

    this.setState(
      {
        ...this.state,
        selectedYear
      },
      this.props.resetDashboard(selectedYear)
    );
  };

  getOptions = () => [{ value: 2019, label: 2019 }];

  recargar = () => {
    const { selectedYear } = this.state;

    this.props.resetDashboard(selectedYear);
  };

  render() {
    return (
      <Fragment>
        <Title
          title={dashboardMessages.TITLE}
          subtitle={dashboardMessages.SUBTITLE}
        />
        <Row>
          <Col md={6}>
            <Field
              key="yearField"
              bsSize="small"
              controlId="yearSelect"
              label="Año"
              required
              inputComponent={
                <Select
                  key="yearSelect"
                  name="yearSelect"
                  clearable={false}
                  value={this.state.selectedYear}
                  options={this.getOptions()}
                  id="yearSelect"
                  onChange={this.updateYearSelected}
                  placeholder="seleccioná un año"
                />
              }
            />
          </Col>
          <Col className="flexContainer" lg={2} md={2}>
            <Button
              className="flexBottomMedium"
              bsStyle="primary"
              onClick={this.recargar}
            >
              <Glyphicon glyph="repeat" /> Recargar
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12}>
            <Center>
              {this.props.projects && (
                <RadialGraphic data={this.props.projects.total} />
              )}
            </Center>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12}>
            <Panel>
              <Panel.Body>
                {this.props.projects && (
                  <VerticalBarGraphic
                    YAxisLabel="Proyectos"
                    desc1="en progreso"
                    desc2="terminados"
                    data={[
                      this.props.projects.progress,
                      this.props.projects.terminated
                    ]}
                  />
                )}
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  resetDashboard: (year) => {
    dispatch(resetDashboard(year));
  }
});

const mapStateToProps = (state) => ({
  projects: state.dashboardReducer.projects
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(DashboardIndex)
);
