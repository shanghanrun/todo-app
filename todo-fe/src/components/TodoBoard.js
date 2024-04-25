import React from "react";
import TodoItem from './TodoItem'

const TodoBoard = ({todoList}) => {
  return (
    <div>
      <h2>Todo List</h2>
      { todoList?.map((item,i)=>(
        <TodoItem key={item._id} item={item} />
      ))}
      <h2>There is no Item to show</h2>
    </div>
  );
};

export default TodoBoard;
