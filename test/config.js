const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');

configure({ adapter: new Adapter() });

chai.use(sinonChai);
chai.use(chaiEnzyme);
chai.should();

const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

// workaround for anypoint-components require
require.extensions['.css'] = () => {};

let unhandledRejection;

process.on('unhandledRejection', (err) => {
  unhandledRejection = err;
});

beforeEach(() => {
  global.sinon = sinon.createSandbox();
});

afterEach(() => {
  if (unhandledRejection) {
    // eslint-disable-next-line no-console
    console.error('>>', 'Enforced failure on UnhandledPromiseRejectionWarning');
    // eslint-disable-next-line no-console
    console.error(unhandledRejection);
    const error = unhandledRejection;

    unhandledRejection = undefined;
    throw error;
  }
});

afterEach(() => {
  global.sinon.restore();
});
