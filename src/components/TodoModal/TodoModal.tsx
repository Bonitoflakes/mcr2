import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Habit, useHabits } from "../../contexts/TodoContext";

const initalState = {
  id: 0,
  name: "",
  category: "work",
  time: "",
  date: "",
  goal: "",
  repeat: "",
};

export const TodoModal = ({ todoToBeEdited }: { todoToBeEdited: Habit | undefined }) => {
  const { isModalOpen, closeModal, addHabit, modalType, editHabit, archiveHabit, deleteHabit } = useHabits();

  console.log("todoToBeEdited", todoToBeEdited);
  const [habit, setHabit] = useState(todoToBeEdited || initalState);

  useEffect(() => {
    setHabit(todoToBeEdited || initalState);
  }, [todoToBeEdited]);

  const isNew = modalType === "new";

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    isNew ? saveHabit() : handleEdit();
  };

  const saveHabit = () => {
    console.log("saving new habit..");
    addHabit(habit);

    closeModal();
    setHabit(initalState);
  };

  const handleEdit = () => {
    console.log("editing habit..");
    editHabit(habit);
    closeModal();
    setHabit(initalState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.target.name, e.target.value);
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const archiveTodo = () => {
    console.log("archive todo");
    archiveHabit(habit.id);
    closeModal();
    setHabit(initalState);
  };

  const deleteTodo = () => {
    console.log("delete todo");
    deleteHabit(habit.id);
    closeModal();
    setHabit(initalState);
  };

  return (
    <>
      {isModalOpen && (
        <div className="absolute top-0 flex items-center justify-center w-full h-full modal-wrapper backdrop-blur-sm">
          <div className="p-8 bg-gray-800 w-[600px] rounded-3xl">
            <div className="flex justify-between header">
              <h1 className="text-4xl font-bold">{isNew ? "New" : "Edit"} Habit</h1>

              <div className="button-container">
                <button
                  className="px-4 py-2 border border-red-400 rounded-full border-red hover:bg-red-600 hover:text-white "
                  onClick={deleteTodo}
                >
                  Delete
                </button>
                {isNew ? null : (
                  <button className="px-4 py-2 rounded-full hover:bg-yellow-600" onClick={archiveTodo}>
                    Archive
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label className="py-2 text-xs uppercase" htmlFor="habitName">
                  name
                </label>
                <input
                  type="text"
                  id="habitName"
                  placeholder="What do you want to do?"
                  className="p-2 rounded-lg"
                  required
                  value={habit.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col w-full options-container">
                <div className="flex gap-8 option-child">
                  {/*  */}
                  <div className="flex flex-col flex-1">
                    <label className="py-2 text-xs uppercase" htmlFor="selectRepeat">
                      Repeat
                    </label>
                    <select
                      id="selectRepeat"
                      className="p-2 rounded-lg"
                      value={habit.repeat}
                      onChange={handleChange}
                      name="repeat"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="flex flex-col flex-1 ">
                    <label className="py-2 text-xs uppercase" htmlFor="selectGoal">
                      Repeat
                    </label>
                    <select
                      id="selectGoal"
                      className="p-2 pr-2 rounded-lg"
                      value={habit.goal}
                      onChange={handleChange}
                      name="goal"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-8 option-child">
                  <div className="flex flex-col flex-1">
                    <label className="py-2 text-xs uppercase" htmlFor="selectTime">
                      Time of day
                    </label>
                    <input
                      type="time"
                      className="p-2 rounded-lg"
                      value={habit.time}
                      onChange={handleChange}
                      name="time"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label className="py-2 text-xs uppercase" htmlFor="selectDate">
                      date
                    </label>
                    <input
                      type="date"
                      className="p-2 rounded-lg"
                      value={habit.date}
                      onChange={handleChange}
                      name="date"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full gap-4 my-4 button-container">
                <button
                  className="p-2 text-sm rounded-lg hover:bg-red-600 hover:text-white"
                  onClick={closeModal}
                >
                  Discard
                </button>

                <button className="p-2 text-sm bg-blue-500 rounded-lg" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
