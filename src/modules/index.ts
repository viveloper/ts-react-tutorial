import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import github, { githubSaga } from './github';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  counter,
  todos,
  github,
});

export function* rootSaga() {
  yield all([githubSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
