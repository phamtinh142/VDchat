import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootSaga from './sagas';
import rootReducer from './reducers';

export const history = createBrowserHistory();

let store;
export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  store = createStore(
    rootReducer(history),
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default function getStore() {
  return store;
}