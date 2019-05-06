import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import  history  from './history';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native


const persistConfig = {
  key: 'root',
  storage,
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
export let persistor = persistStore(store);