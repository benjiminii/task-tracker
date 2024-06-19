import { create } from "zustand";
import uniqid from "uniqid";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  email: string;
  date: string;
};

type TaskState = {
  tasks: Task[];
  createTask: (title: string, email: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
};

const taskStore = create<TaskState>()(
  // persist allows us to automatically save the state to localStorage
  persist(
    (set) => ({
      tasks: [],
      createTask: (title, email) => {
        const newTask: Task = {
          id: uniqid(),
          title,
          completed: false,
          email,
          date: dayjs().toISOString(),
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },
      toggleTaskCompletion: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        }));
      },
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },
    }),
    {
      name: "task-storage",
    }
  )
);

export default taskStore;
