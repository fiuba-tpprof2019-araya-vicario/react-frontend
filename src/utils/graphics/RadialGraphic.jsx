/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import 'react-vis/dist/style.css';
import { Label } from 'react-bootstrap';
import { RadialChart, Hint } from 'react-vis';

export default class RadialGraphic extends React.Component {
  static propTypes = {
    data: PropTypes.array
  };
  state = {
    value: false
  };

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
    const { data } = this.props;
    const { value } = this.state;
    const hintValue = data.find((d) => value.label === d.label);

    return (
      <RadialChart
        className="donut-chart-example"
        onNearestX={this.onNearestX1}
        opacity={0.7}
        height={200}
        width={200}
        innerRadius={20}
        radius={70}
        labelsRadiusMultiplier={1.1}
        onValueMouseOver={(v) => {
          this.setState({ value: v });
        }}
        onSeriesMouseOut={() => this.setState({ value: false })}
        getAngle={(d) => d.angle}
        data={data}
        showLabels
        padAngle={0.01}
      >
        {value !== false && (
          <Hint value={value}>
            <div style={{ background: 'black' }}>
              <p>{`${hintValue.label}: ${hintValue.angle}`}</p>
            </div>
          </Hint>
        )}
      </RadialChart>
    );
  }
}
