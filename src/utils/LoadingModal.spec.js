import { shallow } from 'enzyme';
import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import Center from 'react-center';
import LoadingModal from './LoadingModal';

describe('LoadingModal', () => {
  let modalLoading;

  context('when showing loading', () => {
    before(() => {
      modalLoading = shallow(<LoadingModal show />).find(Modal);
    });

    it('should render the modal', () => {
      modalLoading.exists().should.equal(true);
    });

    it('should modal have correct props', () => {
      modalLoading.prop('show').should.equals(true);
      modalLoading
        .prop('dialogClassName')
        .should.equals('custom-modal loadingModal');
    });

    it('should render the modal body', () => {
      modalLoading
        .find(Modal.Body)
        .exists()
        .should.equal(true);
    });

    it('should render the modal row', () => {
      modalLoading
        .find(Row)
        .exists()
        .should.equal(true);
    });

    it('should render the modal body', () => {
      modalLoading
        .find(Row)
        .prop('className')
        .should.equals('expandedRow');
    });

    it('should center all the content', () => {
      modalLoading
        .find(Center)
        .prop('children')
        .should.have.lengthOf(2);
    });

    it('should render the loading icon', () => {
      modalLoading
        .find('[data-test-id="loading-icon"]')
        .prop('children')
        .should.deep.equals(
          <i className="fa fa-spinner fa-lg fa-spin">&nbsp;</i>
        );
    });

    it('should render the loading text', () => {
      modalLoading
        .find('[data-test-id="loading-text"]')
        .text()
        .should.equals('Cargando');
    });
  });
});
