export const CREDENTIALS = {
  CREATE_PROJECTS: 'CREATE_PROJECTS',
  EDIT_PROJECTS: 'EDIT_PROJECTS',
  GET_PROJECTS: 'GET_PROJECTS',
  EDIT_USERS: 'EDIT_USERS',
  GET_USERS: 'GET_USERS',
  EDIT_PROFILES: 'EDIT_PROFILES',
  GET_PROFILES: 'GET_PROFILES',
  EDIT_TUTOR_REQUESTS: 'EDIT_TUTOR_REQUESTS',
  APPROVE_PROJECTS: 'APPROVE_PROJECTS',
  EDIT_REQUIREMENTS: 'EDIT_REQUIREMENTS',
  GET_REQUIREMENTS: 'GET_REQUIREMENTS'
};

export const PROFILES = {
  ADMIN: 1,
  STUDENT: 2,
  TUTOR: 3,
  COMMISSION: 4,
  INTERESTED: 5
};

export const PROJECT_TYPES = {
  TRABAJO_PROFESIONAL: 1,
  TESIS: 2,
  TRABAJO_PRACTICO: 3
};

export const REQUEST_STATES = {
  pending: 'Pendiente',
  accepted: 'Aceptada',
  rejected: 'Rechazada'
};

export const REQUIREMENT_STATES = {
  inactive: 'Inactivo',
  accepted: 'Aceptado',
  requested: 'Solicitado',
  implemented: 'Implementado',
  deleted: 'Borrado'
};
