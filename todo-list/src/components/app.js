import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import TodoList from '../containers/TodoList';

export default () => (
  <div>
    <AddTodo />
    <TodoList />
    <Footer />
  </div>
);
