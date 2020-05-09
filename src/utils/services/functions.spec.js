import { expect } from 'chai';
import {
  isValidEmail,
  getById,
  getDifferenceById,
  formatterDate,
  getMonthTextFromNumber
} from './functions';

describe('functions', () => {
  context('isValidEmail', () => {
    it('should accept all valid emails', () => {
      isValidEmail('pepe@gmail.com').should.equal(true);
      isValidEmail('pepe@tele.com.ar').should.equal(true);
      isValidEmail('p-e-p-e@pimba.com').should.equal(true);
      isValidEmail('pimba.pimba@pimba.com').should.equal(true);
    });

    it('should denied all invalid emails', () => {
      isValidEmail('pepe@gmail.com.').should.equal(false);
      isValidEmail('pepe-@tele.com.ar').should.equal(false);
      isValidEmail('@pimba.com').should.equal(false);
      isValidEmail('p').should.equal(false);
      isValidEmail().should.equal(false);
    });
  });

  context('getById', () => {
    it('when pass correct id', () => {
      const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

      getById(objects, 'b').should.deep.equals({ id: 'b' });
    });

    it('when pass incorrect id', () => {
      const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

      expect(getById(objects, 'e')).to.equals(null);
    });

    it('when object its null', () => {
      expect(getById(null, 'e')).to.equals(null);
    });
  });

  context('getDifferenceById', () => {
    it('when have correct params', () => {
      const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
      const exclude = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];

      getDifferenceById(objects, exclude).should.deep.equals([
        { id: 'a' },
        { id: 'b' }
      ]);
    });

    it('when not have objects values', () => {
      const objects = null;
      const exclude = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];

      expect(getDifferenceById(objects, exclude)).to.equals(null);
    });

    it('when not have exclude values', () => {
      const objects = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];
      const exclude = null;

      getDifferenceById(objects, exclude).should.equals(objects);
    });
  });

  context('formatterDate', () => {
    it('when have correct params', () => {
      const data = '2020-05-01T01:34:32.195Z';
      const expectedData = '01/05/2020 01:34:32';

      formatterDate(data).should.equals(expectedData);
    });

    it('when have no data', () => {
      const data = null;
      const expectedData = '';

      formatterDate(data).should.equals(expectedData);
    });
  });

  context('getMonthTextFromNumber', () => {
    it('should return all correct months', () => {
      const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ];

      months
        .every((month, index) => month === getMonthTextFromNumber(index + 1))
        .should.equals(true);
    });
  });
});
