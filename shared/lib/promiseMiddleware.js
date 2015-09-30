export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;

    const setLoading = action.setLoading || true;

    if (!promise)
      return next(action);

    if (setLoading)
      next({ type: 'SET_LOADING', loading: true });

    const SUCCESS = type;

    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        next({ ...rest, res, type: SUCCESS });

        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });

        console.log(FAILURE + ':\n', error);

        return false;
      })
      .finally(() => {
          next({ type: 'SET_LOADING', loading: false });
      })
  };
}
