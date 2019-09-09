const PROTOCOL = process.env.REACT_APP_LOCAL === '1' ? 'http' : 'https';
const API_PORT = '3050';
const ROOT =
  process.env.REACT_APP_LOCAL === '1'
    ? `localhost:${API_PORT}`
    : 'brain-search-api.herokuapp.com/';
const API_VERSION = 'v0';

export const CLIENT_ID =
  '942857236809-1mbatv1f1t1eanl1jqrl6qjdjb0lu174.apps.googleusercontent.com';
export const DEVELOPER_KEY = 'AIzaSyCf2kRvI-8OfaM58uNb-uk6Ko64PRCr2mI';
export const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];
export const BASE = `${PROTOCOL}://${ROOT}/${API_VERSION}/api/`;
