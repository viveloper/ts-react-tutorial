import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 400px;
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 48px;
  input {
    flex: 1;
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    font-size: 21px;
    height: 100%;
    margin-right: 16px;
  }
  button {
    background: black;
    color: white;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 16px;
    height: 100%;
    font-weight: bold;
    &:hover {
      background: #495057;
    }
  }
`;

type GithubUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
};

function GithubUsernameForm({ onSubmitUsername }: GithubUsernameFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitUsername(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={input}
        placeholder="Github 계정명을 입력하세요"
      />
      <button type="submit">조회</button>
    </StyledForm>
  );
}

export default GithubUsernameForm;
