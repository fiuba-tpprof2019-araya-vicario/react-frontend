export const thunk = (spy = () => {}) => ({ dispatch, getState }) => (next) => (
  action
) => {
  if (typeof action === 'function') {
    let promise = action(dispatch, getState);

    if (promise && promise.catch) {
      promise = promise.catch((error) => Promise.reject(error));
    }

    if (promise) {
      spy(promise);
    }

    return promise;
  }

  return next(action);
};
