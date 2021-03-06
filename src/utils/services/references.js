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

export const PROJECT_STEPS = {
  CREATE_IDEA: 0,
  REVISION_IDEA: 1,
  PENDING_PROPOSAL: 2,
  PROPOSAL_UNDER_REVISION: 3,
  PENDING_PRESENTATION: 4,
  PENDING_PUBLICATION: 5,
  PUBLICATED_PROPOSAL: 6
};

export const USER_TYPE = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TUTOR: 'tutor',
  COMMISSION: 'commission',
  INTERESTED: 'interested'
};

export const PROJECT_TYPES = {
  TRABAJO_PROFESIONAL: 1,
  TESIS: 2,
  TRABAJO_PRACTICO: 3
};

export const STATES = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected'
};

export const REQUEST_STATES = {
  pending: 'Pendiente',
  accepted: 'Aceptada',
  rejected: 'Rechazada'
};

export const REQUIREMENT_STATES = {
  inactive: 'Inactivo',
  active: 'Activo',
  accepted: 'Aceptado',
  requested: 'Solicitado',
  implemented: 'Implementado',
  deleted: 'Borrado'
};
