import { expect } from 'chai';
import {
  isValidEmail,
  getById,
  getDifferenceById,
  formatterDate,
  getYearFromDate,
  getListBySingleField,
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
    let objects;
    let exclude;

    it('when have correct params', () => {
      objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
      exclude = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];

      getDifferenceById(objects, exclude).should.deep.equals([
        { id: 'a' },
        { id: 'b' }
      ]);
    });

    it('when not have objects values', () => {
      objects = null;
      exclude = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];

      expect(getDifferenceById(objects, exclude)).to.equals(null);
    });

    it('when not have exclude values', () => {
      objects = [{ id: 'c' }, { id: 'd' }, { id: 'e' }];
      exclude = null;

      getDifferenceById(objects, exclude).should.equals(objects);
    });
  });

  context('formatterDate', () => {
    let date;
    let formattedDate;

    it('when have correct params', () => {
      date = '2020-05-01T01:34:32.195Z';
      formattedDate = '01/05/2020 01:34:32';

      formatterDate(date).should.equals(formattedDate);
    });

    it('when have no data', () => {
      date = null;
      formattedDate = '';

      formatterDate(date).should.equals(formattedDate);
    });
  });

  context('getYearFromDate', () => {
    it('when have correct params', () => {
      const date = '2020-05-01T01:34:32.195Z';
      const year = '2020';

      getYearFromDate(date).should.equals(year);
    });
  });

  context('getListBySingleField', () => {
    let list;
    let getField;
    let expectedList;

    it('when have correct params', () => {
      list = [{ id: '1', a: '2' }, { id: '2', b: '3' }, { id: '3', c: '4' }];
      getField = ({ id }) => id;
      expectedList = ['1', '2', '3'];

      getListBySingleField(list, getField).should.deep.equals(expectedList);
    });

    it('when have default getField', () => {
      list = [
        { value: 'a', a: '2' },
        { value: 'b', b: '3' },
        { value: 'c', c: '4' }
      ];
      getField = undefined;
      expectedList = ['a', 'b', 'c'];

      getListBySingleField(list, getField).should.deep.equal(expectedList);
    });

    it('when have list its empty', () => {
      list = null;
      getField = undefined;
      expectedList = null;

      expect(getListBySingleField(list, getField)).to.equals(expectedList);
    });
  });

  context('getMonthTextFromNumber', () => {
    let months;

    it('should return all correct months', () => {
      months = [
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
