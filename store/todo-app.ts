import { create } from 'zustand'
import { User } from '@/generated/prisma/client'
import { persist } from 'zustand/middleware'
import {} from '@/lib/actions/types'

type State = {
  user: User | undefined
  currentSet: string
}

type Actions = {
  setUser: (user: User | undefined) => void
  setTodoSet: (currentSet: string) => void
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
    currentSet: "today",
    setUser: (user) => set({ user }),
    setTodoSet: (currentSet) => set({ currentSet: currentSet }),
  }), {
    name: 'todo-app-store',
    partialize: (state) => ({
      currentSet: state.currentSet,
    })
  })
)