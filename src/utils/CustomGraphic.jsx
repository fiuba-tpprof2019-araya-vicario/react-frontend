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
  Crosshair
} from 'react-vis';

export class CustomGraphic extends React.Component {
  static propTypes = {
    YAxis: PropTypes.string,
    desc1: PropTypes.string,
    desc2: PropTypes.string,
    data: PropTypes.array
  };

  state = { crosshairValues: [], w: null, z: null };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onMouseLeave = () => {
    this.setState({ crosshairValues: [], w: null, z: null });
  };

  onNearestX2 = (value) => {
    const w = value.x;
    const z = value.y;

    this.setState({ w, z });
  };

  onNearestX1 = (value) => {
    this.setState({ ...this.state, crosshairValues: [value] });
  };

  render() {
    return (
      <FlexibleWidthXYPlot
        onMouseLeave={this.onMouseLeave}
        xType="time"
        height={200}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Día" position="start" />
        <YAxis title={this.props.YAxis} />
        <LineSeries
          id="primeros"
          name="primeros"
          stroke="#449d44"
          onNearestX={this.onNearestX1}
          className="first-series"
          data={this.props.data}
        />
        {/* <LineSeries
          id="segundos"
          name="segundos"
          stroke="#d9534f"
          onNearestX={this._onNearestX2}
          className="first-series"
          data={this.props.pedidos.cancelados} /> */}
        <Crosshair values={this.state.crosshairValues}>
          <div>
            {this.state.crosshairValues.length > 0 && (
              <h4>
                <Label>
                  {moment(this.state.crosshairValues[0].x).format('YYYY/MM/DD')}
                  : {this.props.desc2}
                  {this.state.crosshairValues[0].y} {this.props.desc1}
                  {/* - {this.state.z} {this.props.desc2} */}
                </Label>
              </h4>
            )}
          </div>
        </Crosshair>
      </FlexibleWidthXYPlot>
    );
  }
}
