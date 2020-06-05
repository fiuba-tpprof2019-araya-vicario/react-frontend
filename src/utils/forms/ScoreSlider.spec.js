import { shallow } from 'enzyme';
import React from 'react';
import ScoreSlider from './ScoreSlider';

describe('ScoreSlider', () => {
  let value;
  let onChange;
  let disabled;
  let wrapper;

  context('when having all props assigned', () => {
    before(() => {
      value = 1;
      onChange = sinon.spy();
      disabled = true;

      wrapper = shallow(
        <ScoreSlider value={value} onChange={onChange} disabled={disabled} />
      );
    });

    it('should have correct props', () => {
      wrapper.prop('disabled').should.equal(disabled);
      wrapper.prop('value').should.equal(value);
      wrapper.prop('dots').should.equal(true);
      wrapper.prop('step').should.equal(1);
      wrapper.prop('min').should.equal(0);
      wrapper.prop('max').should.equal(5);
      wrapper
        .prop('marks')
        .should.deep.equal({ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
      wrapper.prop('style').should.deep.equal({ marginBottom: '15px' });
    });

    context('when making a change', () => {
      before(() => {
        wrapper.simulate('change', { value: 2 });
      });

      it('should call onChange function', () =>
        onChange.should.have.been.calledOnce);
    });
  });
});
