import { create } from 'zustand'
import { User } from '@/generated/prisma/client'
import { persist } from 'zustand/middleware'
import { allTodoSets, type TodoSet } from '@/app/todo/config'
import { type TodoItem } from "@/generated/prisma/client";

type State = {
  user: User | undefined
  tasks: TodoItem[],
  currentSetId: string
}

type Actions = {
  setTasks: (tasks: TodoItem[]) => void
  setUser: (user: User | undefined) => void
  setCurrentSetId: (id: string) => void
  getTodoSetById: (id: string) => TodoSet | undefined
}

export const useTodoAppStore = create<State & Actions>()(
  persist((set) => ({
    user: undefined,
    tasks: [],
    currentSetId: "today",
    setUser: (user) => set({ user }),
    setCurrentSetId: (currentSetId) => set({ currentSetId }),
    getTodoSetById: (id) => allTodoSets.find((set) => set.id === id),
    setTasks: (tasks) => set({ tasks }),
  }), {
    name: 'todo-app-store',
    partialize: (state) => ({
      currentSetId: state.currentSetId,
    })
  })
)