import axios from 'axios';
import Bluebird from 'bluebird';
import {
  getConfig,
  api,
  getConfigMultipart
} from '../../api/apiInterfaceProvider';
import { USER_TYPE } from '../../utils/services/references';
import {
  getSelectOption,
  getSelectOptions,
  getSelectOptionsWithIgnore,
  getStudentIsApproved,
  getOnlyField,
  getDescriptionByRequestStatus,
  formatterDate,
  getFullName
} from '../../utils/services/functions';
import { queryError, toggleLoading } from '../login/authReducer';

const GET_TUTORS = 'GET_TUTORS';
const GET_COAUTORS = 'GET_COAUTORS';
const GET_CAREERS = 'GET_CAREERS';
const GET_ACTIVE_PROJECT = 'GET_ACTIVE_PROJECT';
const GET_PROJECT_TYPES = 'GET_PROJECT_TYPES';
const POST_IDEA = 'POST_IDEA';
const HYDRATE_SIMILAR_STUDENTS = 'HYDRATE_SIMILAR_STUDENTS';
const HYDRATE_SIMILAR_TUTORS = 'HYDRATE_SIMILAR_TUTORS';
const ACCEPTED_PROPOSAL = 'ACCEPTED_PROPOSAL';
const HYDRATE_REQUESTS_STUDENT = 'HYDRATE_REQUESTS_STUDENT';

const initialState = {
  project: null,
  coautors: [],
  projectTypes: [],
  tutors: [],
  similarStudents: [],
  similarTutors: []
};

const ideaAsigned = (data) => ({
  type: POST_IDEA,
  data
});

const hydrateRequests = (data) => ({
  type: HYDRATE_REQUESTS_STUDENT,
  data
});

const hydrateSimilarUsers = (data, type) => ({
  type: `HYDRATE_SIMILAR_${type}`,
  data
});

const acceptedProposal = () => ({
  type: ACCEPTED_PROPOSAL
});

const projectTypesLoaded = (data) => ({
  type: GET_PROJECT_TYPES,
  data
});

const careersLoaded = (data) => ({
  type: GET_CAREERS,
  data
});

const activeProjectUploaded = (data) => ({
  type: GET_ACTIVE_PROJECT,
  data
});

const coautorsUploaded = (data, ignoreId) => ({
  type: GET_COAUTORS,
  data,
  ignoreId
});

const tutorsUploaded = (data, ignoreId) => ({
  type: GET_TUTORS,
  data,
  ignoreId
});

const getProjectTypes = (dispatch) => {
  dispatch(
    projectTypesLoaded([
      {
        value: 1,
        label: 'Trabajo Profesional'
      },
      {
        value: 2,
        label: 'Tesis'
      },
      {
        value: 3,
        label: 'Trabajo Práctico'
      }
    ])
  );
};

const getCareers = (dispatch) => {
  dispatch(
    careersLoaded([
      {
        value: 1,
        label: 'Ingeniería en Informática'
      },
      {
        value: 2,
        label: 'Ingeniería Civil'
      },
      {
        value: 3,
        label: 'Ingeniería Electrónica'
      },
      {
        value: 4,
        label: 'Ingeniería Química'
      },
      {
        value: 5,
        label: 'Ingeniería de Alimentos'
      },
      {
        value: 6,
        label: 'Ingeniería Electricista'
      },
      {
        value: 7,
        label: 'Ingeniería en Agrimensura'
      },
      {
        value: 8,
        label: 'Ingeniería en Petróleo'
      },
      {
        value: 9,
        label: 'Ingeniería Industrial'
      },
      {
        value: 10,
        label: 'Ingeniería Mecánica'
      },
      {
        value: 11,
        label: 'Ingeniería Naval y Mecánica'
      },
      {
        value: 12,
        label: 'Lic. en Análisis de Sistemas'
      }
    ])
  );
};

const getActiveProject = (projectId, dispatch) => {
  if (!projectId) {
    return Bluebird.resolve();
  }
  const config = getConfig();

  return axios
    .get(api.project(projectId), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(activeProjectUploaded(data));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const getTutors = (ignoreId, dispatch) => {
  const config = getConfig();

  return axios
    .get(`${api.users}?type=${USER_TYPE.TUTOR}`, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(tutorsUploaded(data, ignoreId));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const getCoautors = (ignoreId, dispatch) => {
  const config = getConfig();

  return axios
    .get(`${api.users}?type=${USER_TYPE.STUDENT}`, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(coautorsUploaded(data, ignoreId));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const uploadFile = (projectId, form, endpoint, dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfigMultipart();
  const formData = new FormData();

  formData.append('file', form.file);

  axios
    .put(endpoint, formData, config)
    .then((res) => res.data.data)
    .then(() => {
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const uploadProposal = (projectId, form) => (dispatch) => {
  uploadFile(projectId, form, api.proposal(projectId), dispatch);
};

export const uploadDocumentation = (projectId, presentationId, form) => (
  dispatch
) => {
  uploadFile(
    projectId,
    form,
    api.uploadDocumentation(presentationId),
    dispatch
  );
};

export const uploadPresentation = (projectId, presentationId, form) => (
  dispatch
) => {
  uploadFile(projectId, form, api.uploadPresentation(presentationId), dispatch);
};

export const editPresentationData = (
  projectId,
  presentationId,
  {
    description,
    documentation_visible: documentationVisible,
    presentation_visible: presentationViisible
  }
) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    description,
    documentation_visible: documentationVisible,
    presentation_visible: presentationViisible
  };

  axios
    .put(api.editPresentations(presentationId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const uploadIdea = (
  { title, careers, description, coautors, type, tutorId, requirementId },
  postAction = () => {}
) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    careers: getOnlyField(careers),
    description,
    tutor_id: tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type_id: type.value,
    proposalUrl: null,
    requirement_id: requirementId
  };

  axios
    .post(api.projects, body, config)
    .then((res) => res.data.data)
    .then((projectId) => {
      dispatch(ideaAsigned(projectId));
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      postAction();
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const getRequests = (dispatch) => {
  const config = getConfig();

  axios
    .get(api.requestsStudents, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(hydrateRequests(data));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const getSimilarUsers = (dispatch, type) => {
  const config = getConfig();

  axios
    .get(api.similarUsers(type), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(hydrateSimilarUsers(data, type.toUpperCase()));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const acceptProposal = (requestId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    accepted_proposal: 'accepted'
  };

  axios
    .put(api.acceptProposalByStudent(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(acceptedProposal());
      getActiveProject(projectId, dispatch);
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const acceptRequest = (requestId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    status: 'accepted'
  };

  axios
    .put(api.acceptStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaAsigned(projectId));
      getActiveProject(projectId, dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const rejectRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    status: 'rejected'
  };

  axios
    .put(api.rejectStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getRequests(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const getInitialData = (ignoreId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(
    getTutors(ignoreId, dispatch),
    getActiveProject(projectId, dispatch),
    getProjectTypes(dispatch),
    getCareers(dispatch),
    getRequests(dispatch),
    getCoautors(ignoreId, dispatch),
    getSimilarUsers(dispatch, 'students'),
    getSimilarUsers(dispatch, 'tutors')
  )
    .then(() => dispatch(toggleLoading({ loading: false })))
    .catch(() => {
      dispatch(toggleLoading({ loading: false }));
    });
};

export const editIdea = (
  projectId,
  { title, description, coautors, type, autor, tutorId, careers }
) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    careers: getOnlyField(careers),
    description,
    autor,
    tutor_id: tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type_id: type.value,
    proposal_url: null
  };

  axios
    .put(api.project(projectId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaAsigned(projectId));
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const abandonIdea = (projectId, memberId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.abandonStudentProject(projectId, memberId), config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaAsigned(null));
      getActiveProject(null, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

const getFormattedProject = (project) => ({
  ...project,
  cotutors: getSelectOptions(project.Cotutors, { getLabel: getFullName }),
  students: getSelectOptions(project.Students, {
    getLabel: getFullName,
    getFixed: getStudentIsApproved
  }),
  careers: getSelectOptions(project.ProjectCareers, {
    getValue: (projectCareers) => projectCareers.Career.id,
    getLabel: (projectCareers) => projectCareers.Career.name
  }),
  tutor: {
    ...project.Tutor,
    ...getSelectOption(project.Tutor, { getLabel: getFullName })
  },
  creator: {
    ...project.Creator,
    ...getSelectOption(project.Creator, { getLabel: getFullName })
  },
  type: getSelectOption(project.Type, {})
});

const fetchRequestTable = (data) => {
  const returnValue = [];

  data.forEach((rowObject) => {
    returnValue.push({
      id: rowObject.id,
      type: rowObject.Project.Type.name,
      projectId: rowObject.Project.id,
      creator: `${rowObject.Project.Creator.name} ${
        rowObject.Project.Creator.surname
      }`,
      name: rowObject.Project.name,
      description: rowObject.Project.description,
      created_at: formatterDate(rowObject.createdAt),
      updated_at: formatterDate(rowObject.updatedAt),
      status: getDescriptionByRequestStatus(rowObject.status)
    });
  });

  return returnValue;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COAUTORS:
      return {
        ...state,
        coautors: getSelectOptionsWithIgnore(action.data, action.ignoreId)
      };
    case GET_ACTIVE_PROJECT:
      return {
        ...state,
        project: getFormattedProject(action.data)
      };
    case GET_PROJECT_TYPES:
      return {
        ...state,
        projectTypes: action.data
      };
    case HYDRATE_REQUESTS_STUDENT:
      return {
        ...state,
        requests: fetchRequestTable(action.data)
      };
    case GET_CAREERS:
      return {
        ...state,
        careers: action.data
      };
    case HYDRATE_SIMILAR_STUDENTS:
      return {
        ...state,
        similarStudents: getSelectOptionsWithIgnore(action.data, null, {
          color: '#0196dc'
        })
      };
    case HYDRATE_SIMILAR_TUTORS:
      return {
        ...state,
        similarTutors: getSelectOptionsWithIgnore(action.data, null, {
          color: '#0196dc'
        })
      };
    case GET_TUTORS:
      return {
        ...state,
        tutors: getSelectOptionsWithIgnore(action.data, action.ignoreId)
      };
    default:
      return state;
  }
};
