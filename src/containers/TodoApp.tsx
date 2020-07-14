import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import TodoInsert from '../components/TodoInsert';
import TodoList from '../components/TodoList';
import { addTodo, toggleTodo, removeTodo } from '../modules/todos';

function TodoApp() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };
  const handleRemvoe = (id: number) => {
    dispatch(removeTodo(id));
  };
  const handleInsert = (text: string) => {
    dispatch(addTodo(text));
  };
  return (
    <>
      <TodoInsert onInsert={handleInsert} />
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemvoe} />
    </>
  );
}

export default TodoApp;
