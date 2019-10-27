import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Glyphicon, Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Field from '../../utils/forms/Field';
import { resetDashboard } from './dashboardReducer';
import { CustomGraphic } from '../../utils/CustomGraphic';
import { dashboardMessages } from '../../utils/messages';
import Title from '../../utils/Title';

export class DashboardIndex extends React.Component {
  static propTypes = {
    clearResult: PropTypes.func,
    projects: PropTypes.object
  };

  state = {
    selectedYear: new Date().getFullYear()
  };

  componentDidMount() {
    this.props.clearResult();
  }

  updateYearSelected = (newValue) => {
    this.setState({
      ...this.state,
      selectedCareer: newValue != null ? newValue.value : -1
    });
  };

  getOptions = () => [{ value: 2019, label: 2019 }];

  recargar = () => {
    this.props.clearResult();
  };

  render() {
    console.log(this.props.projects);

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
                  value={this.state.selectedYear}
                  options={this.getOptions()}
                  id="yearSelect"
                  onChange={this.updateYearSelected}
                  placeholder="seleccioná un año"
                />
              }
            />
          </Col>
          <Col md={6}>
            <Button
              bsStyle="success"
              bsSize="small"
              className="pull-right"
              onClick={this.recargar}
            >
              <Glyphicon glyph="repeat" /> Recargar
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12}>
            <Panel style={{ backgroundColor: '#FFFFFF' }}>
              <Panel.Body>
                {this.props.projects && (
                  <CustomGraphic
                    YAxisLabel="Proyectos terminados"
                    desc1="terminados"
                    desc2=""
                    data={[this.props.projects.terminated]}
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
  clearResult: () => {
    dispatch(resetDashboard());
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
