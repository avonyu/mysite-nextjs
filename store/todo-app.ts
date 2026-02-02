import { create } from 'zustand'
import { User } from '@/generated/prisma/client'
import { persist } from 'zustand/middleware'
import { allTodoSets, type TodoSet } from '@/app/todo/config'

type State = {
  test: number,
  user: User | undefined
  currentSetId: string
}

type Actions = {
  setTest: (test: number) => void
  setUser: (user: User | undefined) => void
  setCurrentSetId: (id: string) => void
  getTodoSetById: (id: string) => TodoSet | undefined
}

export const useTodoAppStore = create<State & Actions>()(
  persist((set) => ({
    test: 0,
    user: undefined,
    currentSetId: "today",
    setUser: (user) => set({ user }),
    setCurrentSetId: (currentSetId) => set({ currentSetId }),
    setTest: (test) => set({ test }),
    getTodoSetById: (id) => allTodoSets.find((set) => set.id === id),
  }), {
    name: 'todo-app-store',
    partialize: (state) => ({
      currentSetId: state.currentSetId,
      test: state.test,
    })
  })
)