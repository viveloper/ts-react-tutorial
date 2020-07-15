import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import GithubUsernameForm from '../components/GithubUsernameForm';
import GithubProfileInfo from '../components/GithubProfileInfo';
import { getUserProfileThunk } from '../modules/github';

function GithubProfileLoader() {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.github.userProfile
  );
  const dispatch = useDispatch();

  const handleSubmitUsername = (username: string) => {
    dispatch(getUserProfileThunk(username));
  };

  return (
    <>
      <GithubUsernameForm onSubmitUsername={handleSubmitUsername} />
      {loading && <p style={{ textAlign: 'center' }}>loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>error!</p>}
      {data && (
        <GithubProfileInfo
          name={data.name}
          thumbnail={data.avatar_url}
          bio={data.bio}
          blog={data.blog}
        />
      )}
    </>
  );
}

export default GithubProfileLoader;
