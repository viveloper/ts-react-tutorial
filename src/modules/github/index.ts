import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { GithubProfile, getUserProfile } from '../../api/github';
import { AxiosError } from 'axios';
// import { Dispatch } from 'redux';

const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
)<string, GithubProfile, AxiosError>();

const actions = {
  ...getUserProfileAsync,
};
export type GithubAction = ActionType<typeof actions>;
export type GithubState = {
  userProfile: {
    loading: boolean;
    data: GithubProfile | null;
    error: Error | null;
  };
};

function* getUserProfileSaga(
  action: ActionType<typeof getUserProfileAsync.request>
) {
  try {
    const userProfile: GithubProfile = yield call(
      getUserProfile,
      action.payload
    );
    yield put(getUserProfileAsync.success(userProfile));
  } catch (e) {
    yield put(getUserProfileAsync.failure(e));
  }
}

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}

const initialState: GithubState = {
  userProfile: {
    loading: false,
    data: null,
    error: null,
  },
};

const github = createReducer<GithubState, GithubAction>(initialState, {
  [GET_USER_PROFILE]: (state) => ({
    ...state,
    userProfile: {
      loading: true,
      data: null,
      error: null,
    },
  }),
  [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    userProfile: {
      loading: false,
      data: action.payload,
      error: null,
    },
  }),
  [GET_USER_PROFILE_ERROR]: (state, action) => ({
    ...state,
    userProfile: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),
});

export default github;
