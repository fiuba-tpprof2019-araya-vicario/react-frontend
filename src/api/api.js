const PROTOCOL = process.env.REACT_APP_LOCAL === '1' ? 'http' : 'https';
const API_PORT = '3050';
const ROOT =
  process.env.REACT_APP_LOCAL === '1'
    ? `localhost:${API_PORT}`
    : 'apinodebackend.herokuapp.com';
const API_VERSION = 'v0';

export const BASE = `${PROTOCOL}://${ROOT}/${API_VERSION}/api/`;
