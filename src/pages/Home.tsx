import { useState } from "react";
import { TodoCard } from "../components/TodoCard/TodoCard";
import { TodoModal } from "../components/TodoModal/TodoModal";
import { Habit, useHabits } from "../contexts/TodoContext";

export const Home = () => {
  const { habits, openModal, newModal, editModal } = useHabits();
  const [editTodo, setEditTodo] = useState<Habit | undefined>(undefined);

  const findHabit = (habitToFind: number) => {
    return habits.find(({ id }) => id === habitToFind);
  };

  const handleCreateTodo = () => {
    console.log("create todo");
    openModal();
    newModal();
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
    <div className="flex flex-wrap justify-start gap-6 m-4">
      {/*  */}
      {/*  */}
      <div
        className="flex flex-col justify-between px-3 py-6 bg-white cursor-pointer rounded-2xl align-center w-[162px] h-[168px]"
        onClick={handleCreateTodo}
      >
        <div className="name-container ">
          <p className="text-black">Create my own</p>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {habits.map((todo) => {
        return <TodoCard {...todo} key={todo.id} handleEditTodo={handleEditTodo} />;
      })}

      <TodoModal todoToBeEdited={editTodo} />
    </div>
  );
};
