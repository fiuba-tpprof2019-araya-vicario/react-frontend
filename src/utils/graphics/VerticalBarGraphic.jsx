import PropTypes from 'prop-types';
import React from 'react';
import 'react-vis/dist/style.css';
import { Label } from 'react-bootstrap';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
  Crosshair
} from 'react-vis';

export default class VerticalBarGraphic extends React.Component {
  static propTypes = {
    XAxisLabel: PropTypes.string,
    YAxisLabel: PropTypes.string,
    desc1: PropTypes.string,
    desc2: PropTypes.string,
    data: PropTypes.array
  };

  static defaultProps = { XAxisLabel: 'Mes' };

  state = { crosshair1: null, crosshair2: null };

  onMouseLeave = () => {
    this.setState((prevState) => ({
      ...prevState,
      crosshair1: null,
      crosshair2: null
    }));
  };

  onNearestX1 = (value) => {
    this.setState((prevState) => ({ ...prevState, crosshair1: value || null }));
  };

  onNearestX2 = (value) => {
    this.setState((prevState) => ({ ...prevState, crosshair2: value || null }));
  };

  render() {
    const { XAxisLabel, YAxisLabel, data } = this.props;

    return (
      <FlexibleWidthXYPlot
        onMouseLeave={this.onMouseLeave}
        xType="ordinal"
        height={250}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={XAxisLabel} position="start" />
        <YAxis title={YAxisLabel} />
        <VerticalBarSeries
          onNearestX={this.onNearestX1}
          className="first-series"
          barWidth={0.5}
          opacity={0.7}
          data={data[0]}
        />
        <VerticalBarSeries
          onNearestX={this.onNearestX2}
          className="first-series"
          barWidth={0.5}
          opacity={0.7}
          data={data[1]}
        />
        <Crosshair values={[this.state.crosshair1, this.state.crosshair2]}>
          <div>
            {this.state.crosshair1 && (
              <h4>
                <Label>
                  {`${this.state.crosshair1.x} - ${this.props.desc2}: ${
                    this.state.crosshair1.y
                  } | ${this.props.desc1}: ${this.state.crosshair2.y}`}
                </Label>
              </h4>
            )}
          </div>
        </Crosshair>
      </FlexibleWidthXYPlot>
    );
  }
}
