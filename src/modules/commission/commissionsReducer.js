import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { commissionsMessages } from '../../utils/messages';
import {
  formatterDate,
  getStudentsNames,
  getTutorsNames
} from '../../utils/services/functions';
import {
  clearAlert,
  queryError,
  toggleLoading,
  hydrateAlert
} from '../login/authReducer';

const HYDRATE_APPROVED_COMMISSIONS = 'HYDRATE_APPROVED_COMMISSIONS';
const HYDRATE_TERMINATED_COMMISSIONS = 'HYDRATE_TERMINATED_COMMISSIONS';
const HYDRATE_PENDING_COMMISSIONS = 'HYDRATE_PENDING_COMMISSIONS';
const HYDRATE_COMMISSION = 'HYDRATE_COMMISSION';

const abandonedIdea = () =>
  hydrateAlert({
    message: commissionsMessages.ABANDON_SUCCESS,
    style: 'success',
    onDismiss: clearAlert
  });

const hydratePendingProjects = (data) => ({
  type: HYDRATE_PENDING_COMMISSIONS,
  data
});

const hydrateApprovedProjects = (data) => ({
  type: HYDRATE_APPROVED_COMMISSIONS,
  data
});

const hydrateTerminatedProjects = (data) => ({
  type: HYDRATE_TERMINATED_COMMISSIONS,
  data
});

const hydrateProject = (data) => ({
  type: HYDRATE_COMMISSION,
  data
});

export const rejectIdea = (projectId, memberId, postAction = () => {}) => (
  dispatch
) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.abandonTutorProject(projectId, memberId), config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(abandonedIdea());
      postAction();
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const getActiveProject = (projectId, dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.project(projectId), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateProject(data));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const getProject = (projectId) => (dispatch) => {
  getActiveProject(projectId, dispatch);
};

export const getProjects = (approved, terminated, career, dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const projectUrl = `${api.projectsForCommissions}?1=1${
    approved ? '&approved=1' : ''
  }${terminated ? '&terminated=1' : ''}${career ? `&career=${career}` : ''}`;

  axios
    .get(projectUrl, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      if (approved) {
        dispatch(hydrateApprovedProjects(data));
      } else if (terminated) {
        dispatch(hydrateTerminatedProjects(data));
      } else {
        dispatch(hydratePendingProjects(data));
      }
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
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

export const approve = (projectId, careerId, postAction) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    career: careerId,
    status: 'accepted'
  };

  axios
    .put(api.assessment(projectId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getActiveProject(projectId, dispatch);
      postAction();
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const reprobate = (projectId, careerId, rejectionReason, postAction) => (
  dispatch
) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    career: careerId,
    status: 'rejected',
    reject_reason: rejectionReason
  };

  axios
    .put(api.assessment(projectId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getActiveProject(projectId, dispatch);
      postAction();
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const getInitialData = (approved, terminated, career) => (dispatch) => {
  getProjects(approved, terminated, career, dispatch);
};

const fetchProjectsTable = (data) =>
  data.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    students: getStudentsNames(project.Creator, project.Students),
    tutors: getTutorsNames(project.Tutor, project.Cotutors),
    careers: project.ProjectCareers.map(
      (projectCareer) => projectCareer.Career.name
    ).join(', '),
    type: project.Type.name,
    created_at: formatterDate(project.createdAt)
  }));

export default (
  state = {
    approvedProjects: [],
    pendingProjects: [],
    terminatedProjects: [],
    project: {}
  },
  action
) => {
  switch (action.type) {
    case HYDRATE_PENDING_COMMISSIONS:
      return {
        ...state,
        pendingProjects: fetchProjectsTable(action.data)
      };
    case HYDRATE_APPROVED_COMMISSIONS:
      return {
        ...state,
        approvedProjects: fetchProjectsTable(action.data)
      };
    case HYDRATE_TERMINATED_COMMISSIONS:
      return {
        ...state,
        terminatedProjects: fetchProjectsTable(action.data)
      };
    case HYDRATE_COMMISSION:
      return {
        ...state,
        project: action.data
      };
    default:
      return state;
  }
};
