import { createAsyncAction, ActionType, createReducer } from 'typesafe-actions';
import { GithubProfile, getUserProfile } from '../../api/github';
import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
)<undefined, GithubProfile, AxiosError>();

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

export const getUserProfileThunk = (username: string) => async (
  dispatch: Dispatch
) => {
  const { request, success, failure } = getUserProfileAsync;
  dispatch(request());
  try {
    const userProfile = await getUserProfile(username);
    dispatch(success(userProfile));
  } catch (e) {
    dispatch(failure(e));
  }
};

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
