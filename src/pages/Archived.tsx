import { useState } from "react";
import { TodoCard } from "../components/TodoCard/TodoCard";
import { Habit, useHabits } from "../contexts/TodoContext";
import { TodoModal } from "../components/TodoModal/TodoModal";

export const Archived = () => {
  const { archive, openModal, editModal } = useHabits();
  const [editTodo, setEditTodo] = useState<Habit | undefined>(undefined);

  const findHabit = (habitToFind: number) => {
    return archive.find(({ id }) => id === habitToFind);
  };

  const handleEditTodo = (id: number) => {
    console.log("edit habit");
    const todo = findHabit(id);
    console.log(todo);
    setEditTodo(todo);

    openModal();
    editModal();
  };

  return (
    <div>
      <h1>Archived Todos</h1>
      {archive.map((todo) => {
        return <TodoCard {...todo} key={todo.id} handleEditTodo={handleEditTodo} />;
      })}
      <TodoModal todoToBeEdited={editTodo} />
    </div>
  );
};
