import { ReactNode, createContext, useContext, useState } from "react";

type HabitContextType = {
  habits: Habit[];
  archive: Habit[];
  addHabit: (Habit: Habit) => void;
  archiveHabit: (habitId: number) => void;
  isModalOpen: boolean;
  modalType: string;
  closeModal: () => void;
  openModal: () => void;
  newModal: () => void;
  editModal: () => void;
  editHabit: (newHabitData: Habit) => void;
  deleteHabit: (habitId: number) => void;
};

const SampleTodos = [
  {
    id: 1,
    name: "Some random todo one",
    category: "study",
    time: "01:01",
    date: "2002-01-01",
    goal: "1",
    repeat: "monthly",
  },
  {
    id: 2,
    name: "Some random todo two",
    category: "study",
    time: "01:01",
    date: "2002-01-01",
    goal: "1",
    repeat: "daily",
  },
  {
    id: 3,
    name: "Manage Budget",
    category: "finance",
    time: "01:01",
    date: "2002-01-01",
    goal: "4",
    repeat: "weekly",
  },
  {
    id: 4,
    name: "Bake Cakes",
    category: "work",
    time: "01:01",
    date: "2002-01-01",
    goal: "2",
    repeat: "monthly",
  },
  {
    id: 5,
    name: "Some random todo one",
    category: "study",
    time: "01:01",
    date: "2002-01-01",
    goal: "1",
    repeat: "monthly",
  },
  {
    id: 6,
    name: "Some random todo two",
    category: "study",
    time: "01:01",
    date: "2002-01-01",
    goal: "1",
    repeat: "daily",
  },
  {
    id: 7,
    name: "Manage Budget",
    category: "finance",
    time: "01:01",
    date: "2002-01-01",
    goal: "4",
    repeat: "weekly",
  },
  {
    id: 8,
    name: "Bake Cakes",
    category: "work",
    time: "01:01",
    date: "2002-01-01",
    goal: "2",
    repeat: "monthly",
  },
];

export type Habit = {
  id: number;
  name: string;
  category: string;
  time: string;
  date: string;
  goal: string;
  repeat: string;
};

const HabitContext = createContext<HabitContextType | null>(null);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>(SampleTodos);
  const [archive, setArchive] = useState<Habit[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const newModal = () => setModalType("new");
  const editModal = () => setModalType("edit");

  const addHabit = (habit: Habit) => {
    return setHabits((prev) => [...prev, habit]);
  };

  const editHabit = (newHabitData: Habit) => {
    return setHabits((prev) => {
      const updatedHabits = prev.map((habit) => {
        if (habit.id === newHabitData.id) {
          return newHabitData;
        }
        return habit;
      });
      return updatedHabits;
    });
  };

  const deleteHabit = (habitId: number) => {
    const updatedHabits = habits.filter(({ id }) => id !== habitId);
    return setHabits(updatedHabits);
  };

  const archiveHabit = (habitId: number) => {
    const updatedHabits = habits.filter(({ id }) => id !== habitId);
    const archivedHabit = habits.find(({ id }) => id === habitId);
    if (archivedHabit) {
      setArchive((prev) => [...prev, archivedHabit]);
    }
    setHabits(updatedHabits);
  };

  const value = {
    habits,
    archive,
    isModalOpen,
    modalType,
    archiveHabit,
    addHabit,
    closeModal,
    openModal,
    newModal,
    editModal,
    deleteHabit,
    editHabit,
  };
  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }

  return context;
};
