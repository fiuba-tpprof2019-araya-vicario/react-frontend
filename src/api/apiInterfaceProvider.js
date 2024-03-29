import { BASE } from './api';

// Api routes phrases
const LOGIN = 'auth';
const PROJECTS = 'projects';
const USERS = 'users';
const PROFIlES = 'profiles';
const REQUESTS = 'requests';
const PRESENTATIONS = 'presentations';
const REQUIREMENTS = 'requirements';
const CONTACT = 'contacts';
const CAREERS = 'careers';
const DASHBOARD = 'dashboard';
const INTERESTS = 'interests';

export const api = {
  base: BASE,
  login: BASE + LOGIN,
  contact: BASE + CONTACT,
  dashboard: BASE + DASHBOARD,
  projects: BASE + PROJECTS,
  projectsCreated: `${BASE + PROJECTS}?state=1`,
  projectsPublicated: `${BASE + PROJECTS}/portal`,
  projectsInAppreciation: `${BASE + PROJECTS}?state=3`,
  projectsForCommissions: `${BASE + PROJECTS}/commissions`,
  projectsTutor: `${BASE + PROJECTS}/tutors`,
  users: BASE + USERS,
  interests: BASE + INTERESTS,
  presentations: BASE + PRESENTATIONS,
  editPresentations: (projectId) => `${BASE + PRESENTATIONS}/${projectId}`,
  submitPresentation: (projectId) =>
    `${BASE + PRESENTATIONS}/${projectId}/submit`,
  uploadPresentation: (projectId) =>
    `${BASE + PRESENTATIONS}/${projectId}/presentation`,
  uploadDocumentation: (projectId) =>
    `${BASE + PRESENTATIONS}/${projectId}/documentation`,
  userInterests: `${BASE + INTERESTS}/${USERS}`,
  similarUsers: (type) => `${BASE + INTERESTS}/${USERS}/similar?type=${type}`,
  profiles: BASE + PROFIlES,
  careers: BASE + CAREERS,
  requestsTutors: `${BASE + REQUESTS}/tutors`,
  requestsStudents: `${BASE + REQUESTS}/students`,
  requirements: BASE + REQUIREMENTS,
  requirement: (id) => `${BASE + REQUIREMENTS}/${id}`,
  project: (id) => `${BASE + PROJECTS}/${id}`,
  proposal: (id) => `${BASE + PROJECTS}/${id}/proposal`,
  assessment: (id) => `${BASE + PROJECTS}/${id}/assessments`,
  abandonStudentProject: (projectId, memberId) =>
    `${BASE + PROJECTS}/${projectId}/students/${memberId}`,
  abandonTutorProject: (projectId, memberId) =>
    `${BASE + PROJECTS}/${projectId}/tutors/${memberId}`,
  acceptProposalByTutor: (requestId) =>
    `${BASE + REQUESTS}/tutors/${requestId}`,
  acceptProposalByStudent: (requestId) =>
    `${BASE + REQUESTS}/students/${requestId}`,
  acceptTutorRequest: (id) => `${BASE + REQUESTS}/tutors/${id}`,
  rejectTutorRequest: (id) => `${BASE + REQUESTS}/tutors/${id}`,
  acceptStudentRequest: (id) => `${BASE + REQUESTS}/students/${id}`,
  rejectStudentRequest: (id) => `${BASE + REQUESTS}/students/${id}`
};

const getStoredToken = () => localStorage.getItem('token');

export const getConfig = () => ({
  headers: {
    Authorization: getStoredToken(),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
  }
});

export const getConfigMultipart = () => ({
  headers: {
    Authorization: getStoredToken(),
    'content-type': 'multipart/form-data'
  }
});
