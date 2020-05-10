import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

export default class ScoreSlider extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = { value: 0, disabled: false };

  render() {
    const { value, onChange, disabled } = this.props;

    return (
      <Slider
        dots
        marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }}
        style={{ marginBottom: '15px' }}
        step={1}
        min={0}
        max={5}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    );
  }
}
