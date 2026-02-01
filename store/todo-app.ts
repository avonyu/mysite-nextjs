import { create } from 'zustand'
import { User } from '@/generated/prisma/client'
import { persist } from 'zustand/middleware'
import { type todoSet } from '@/app/todo/config'

type State = {
  user: User | undefined
  currentSet?: todoSet
}

type Actions = {
  setUser: (user: User | undefined) => void
  setTodoSet: (currentSet: todoSet) => void
}

// Example usage
// export const useTodoAppStore = create<State & Actions>((set) => ({
//   user: undefined,
//   currentSet: "today",
//   setUser: (user) => set({ user }),
//   setTodoSet: (currentSet) => set({ currentSet: currentSet }),
// }))

export const useTodoAppStore = create<State & Actions>()(
  persist((set) => ({
    user: undefined,
    currentSet: undefined,
    setUser: (user) => set({ user }),
    setTodoSet: (currentSet) => set({ currentSet: currentSet }),
  }), {
    name: 'todo-app-store',
    partialize: (state) => ({
      currentSet: state.currentSet,
    })
  })
)