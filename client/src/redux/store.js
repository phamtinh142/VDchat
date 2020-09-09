import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootSaga from './sagas';
import rootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}