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
    selectedYear: {
      label: new Date().getFullYear(),
      value: new Date().getFullYear()
    }
  };

  componentDidMount() {
    this.reload();
  }

  updateYearSelected = (newValue) => {
    const selectedYearValue = newValue ? newValue.value : -1;

    this.setState(
      { selectedYear: newValue },
      this.props.resetDashboard(selectedYearValue)
    );
  };

  getOptions = () => {
    const list = [];

    for (let year = 2020; year <= new Date().getFullYear(); year += 1) {
      list.push({ value: year, label: year });
    }

    return list;
  };

  reload = () => {
    const { selectedYear } = this.state;
    const selectedYearValue = selectedYear ? selectedYear.value : -1;

    this.props.resetDashboard(selectedYearValue);
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
                  isClearable={false}
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
              onClick={this.reload}
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
