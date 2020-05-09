/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import history from './history';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history),
      createLogger({ collapsed: true })
    )
  )
);

export default store;
export const persistor = persistStore(store);
