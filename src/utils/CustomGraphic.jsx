/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import 'react-vis/dist/style.css';
import moment from 'moment';
import { Label } from 'react-bootstrap';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  VerticalBarSeries,
  Crosshair
} from 'react-vis';

export class CustomGraphic extends React.Component {
  static propTypes = {
    XAxisLabel: PropTypes.string,
    YAxisLabel: PropTypes.string,
    desc1: PropTypes.string,
    desc2: PropTypes.string,
    data: PropTypes.array
  };

  static defaultProps = { XAxisLabel: 'Mes' };

  state = { crosshair1: [], crosshair2: [], w: null, z: null };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onMouseLeave = () => {
    this.setState({ crosshairValues: [], w: null, z: null });
  };

  onNearestX1 = (value) => {
    this.setState({ ...this.state, crosshair1: [value] });
  };

  onNearestX2 = (value) => {
    this.setState({ ...this.state, crosshair2: [value] });
  };

  render() {
    const { XAxisLabel, YAxisLabel, data } = this.props;

    return (
      <FlexibleWidthXYPlot
        onMouseLeave={this.onMouseLeave}
        // xType="time"
        height={250}
        stackBy="y"
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={XAxisLabel} position="start" />
        <YAxis title={YAxisLabel} />
        <VerticalBarSeries
          onNearestX={this.onNearestX1}
          className="first-series"
          data={[{ x: 2, y: 10 }, { x: 4, y: 5 }, { x: 5, y: 15 }]}
        />
        <VerticalBarSeries
          onNearestX={this.onNearestX2}
          className="first-series"
          data={[{ x: 2, y: 12 }, { x: 4, y: 2 }, { x: 5, y: 11 }]}
        />
        {/* <LineSeries
          id="primeros"
          name="primeros"
          stroke="#449d44"
          onNearestX={this.onNearestX1}
          className="first-series"
          data={data[0]}
        /> */}
        {/* <LineSeries
          id="segundos"
          name="segundos"
          stroke="#d9534f"
          onNearestX={this._onNearestX2}
          className="first-series"
          data={this.props.pedidos.cancelados} /> */}
        <Crosshair values={this.state.crosshair1}>
          <div>
            {this.state.crosshair1.length > 0 && (
              <h4>
                <Label>
                  {moment(this.state.crosshair1[0].x).format('YYYY/MM/DD')}:{' '}
                  {this.props.desc2}
                  {this.state.crosshair1[0].y} {this.props.desc1}
                  {this.state.crosshair2[0].y} {this.props.desc1}
                </Label>
              </h4>
            )}
          </div>
        </Crosshair>
        <Crosshair values={this.state.crosshair2}>
          <div>
            {this.state.crosshair2.length > 0 && (
              <h4>
                <Label>
                  {moment(this.state.crosshair2[0].x).format('YYYY/MM/DD')}:{' '}
                  {this.props.desc2}
                  {this.state.crosshair2[0].y} {this.props.desc1}
                </Label>
              </h4>
            )}
          </div>
        </Crosshair>
      </FlexibleWidthXYPlot>
    );
  }
}
