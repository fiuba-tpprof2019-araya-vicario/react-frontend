import PropTypes from 'prop-types';
import React from 'react';
import { Label } from 'react-bootstrap';
import { DiscreteColorLegend, Hint, RadialChart } from 'react-vis';
import 'react-vis/dist/style.css';

export default class RadialGraphic extends React.Component {
  static propTypes = {
    data: PropTypes.array
  };

  state = {
    selected: false
  };

  getItems = () => {
    let total = 0;

    const items = this.props.data.map(({ angle, detail }) => {
      total += angle;

      return { title: `${detail}: ${angle}`, strokeWidth: 5 };
    });

    return [...items, { title: `Total: ${total}`, strokeWidth: null }];
  };

  render() {
    const { data } = this.props;
    const { selected } = this.state;

    if (!data.some(({ angle }) => angle)) {
      return null;
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <RadialChart
          className="donut-chart-example"
          onNearestX={this.onNearestX1}
          opacity={0.7}
          height={200}
          width={200}
          innerRadius={20}
          radius={70}
          labelsRadiusMultiplier={1.1}
          onValueMouseOver={(value) => {
            this.setState({ selected: value });
          }}
          onSeriesMouseOut={() => this.setState({ selected: false })}
          getAngle={(d) => d.angle}
          data={data}
          showLabels
          padAngle={0.01}
        >
          {selected !== false && (
            <Hint value={selected}>
              <div style={{}}>
                <h4>
                  <Label>{`${selected.detail}: ${selected.value}`} </Label>
                </h4>
              </div>
            </Hint>
          )}
        </RadialChart>
        <DiscreteColorLegend height={110} width={200} items={this.getItems()} />
      </div>
    );
  }
}
