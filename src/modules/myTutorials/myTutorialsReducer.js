import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { myTutorialsMessages } from '../../utils/messages';
import {
  formatterDate,
  getDescriptionByRequestStatus
} from '../../utils/services/functions';
import {
  clearAlert,
  queryError,
  toggleLoading,
  hydrateAlert
} from '../login/authReducer';

const HYDRATE_MY_TUTORIALS = 'HYDRATE_MY_TUTORIALS';
const HYDRATE_MY_TUTORIAL = 'HYDRATE_MY_TUTORIAL';
const ACCEPTED_PROPOSAL = 'ACCEPTED_PROPOSAL';

const abandonedIdea = () =>
  hydrateAlert({
    message: myTutorialsMessages.ABANDON_SUCCESS,
    style: 'success',
    onDismiss: clearAlert
  });

const acceptedProposal = () => ({
  type: ACCEPTED_PROPOSAL
});

const hydrateMyTutorial = (data) => ({
  type: HYDRATE_MY_TUTORIAL,
  data
});

const hydrateMyTutorials = (data) => ({
  type: HYDRATE_MY_TUTORIALS,
  data
});

export const abandonIdea = (projectId, memberId, postAction = () => {}) => (
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
    .catch((error) => {
      dispatch(queryError(error));
      dispatch(toggleLoading({ loading: false }));
    });
};

const getActiveTutorial = (dispatch, projectId) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.project(projectId), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateMyTutorial(data));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const getMyTutorial = (projectId) => (dispatch) =>
  getActiveTutorial(dispatch, projectId);

export const acceptProposal = (requestId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    accepted_proposal: 'accepted'
  };

  axios
    .put(api.acceptProposalByTutor(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(acceptedProposal());
      getActiveTutorial(dispatch, projectId);
    })
    .catch((error) => {
      dispatch(queryError(error));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const enablePresentation = (projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = { project_id: projectId };

  axios
    .post(api.presentations, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      getActiveTutorial(dispatch, projectId);
    })
    .catch((error) => {
      dispatch(queryError(error));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const submitPresentation = (projectId, presentationId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .put(api.submitPresentation(presentationId), {}, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      getActiveTutorial(dispatch, projectId);
    })
    .catch((error) => {
      dispatch(queryError(error));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const getMyTutorials = (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.projectsTutor, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateMyTutorials(data));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const acceptRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'tutor',
    status: 'accepted'
  };

  axios
    .put(api.acceptTutorRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getMyTutorials(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const rejectRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'tutor',
    status: 'rejected'
  };

  axios
    .put(api.rejectTutorRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getMyTutorials(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const getInitialData = () => (dispatch) => {
  getMyTutorials(dispatch);
};

const fetchMyTutorialsTable = (data) =>
  data.map((project) => ({
    id: project.id,
    requestId: project.TutorRequests[0].id,
    name: project.name,
    description: project.description,
    type: project.Type.name,
    created_at: formatterDate(project.createdAt),
    status: project.State.name,
    requestStatusId: project.TutorRequests[0].status,
    requestStatus: getDescriptionByRequestStatus(
      project.TutorRequests[0].status
    )
  }));

export default (
  state = {
    myTutorials: [],
    myCoTutorials: [],
    project: {}
  },
  action
) => {
  switch (action.type) {
    case HYDRATE_MY_TUTORIALS:
      return {
        ...state,
        myTutorials: fetchMyTutorialsTable(action.data.Tutorials),
        myCoTutorials: fetchMyTutorialsTable(action.data.Cotutorials)
      };
    case HYDRATE_MY_TUTORIAL:
      return {
        ...state,
        project: action.data
      };
    default:
      return state;
  }
};
