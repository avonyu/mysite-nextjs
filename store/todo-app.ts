import { create } from 'zustand'
import type { TodoTask, TodoSet, User } from '@/generated/prisma/client'
import { getAllTodoTasks } from '@/lib/actions/todo/todo-actions'
import { getAllTodoSets } from '@/lib/actions/todo/todoset-actions'
import { defaultTodoSet } from '@/app/todo/config'

// 定义状态类型
type State = {
  user: User | undefined // 当前用户信息
  tasks: TodoTask[], // 当前用户的所有任务
  sets: TodoSet[], // 当前用户的所有自定义任务集合
  actions: Actions
}

// 定义操作类型
type Actions = {
  setUser: (user: User | undefined) => void
  fetchInitialData: (userId: string) => Promise<void>

  addTask: (newTask: TodoTask) => void
  deleteTask: (taskId: string) => void
  updateTask: (newTask: TodoTask) => void

  addSet: (newSet: TodoSet) => void
  deleteSet: (setId: string) => void
  updateSet: (newSet: TodoSet) => void
}

export const useTodoAppStore = create<State>()((set) => ({
  user: undefined,
  tasks: [],
  sets: [],
  actions: {
    setUser: (user) => set({ user: user }),
    fetchInitialData: async (userId: string) => {
      const [tasksRes, setsRes] = await Promise.all([
        getAllTodoTasks(userId),
        getAllTodoSets(userId)
      ])

      if (tasksRes.code === 200 && tasksRes.data) {
        set({ tasks: tasksRes.data })
      }

      if (setsRes.code === 200 && setsRes.data) {
        set({ sets: setsRes.data })
      }
    },

    addTask: (newTask: TodoTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
    deleteTask: (taskId: string) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
    updateTask: (newTask: TodoTask) => set((state) => ({ tasks: state.tasks.map((t) => t.id === newTask.id ? newTask : t) })),

    addSet: (newSet: TodoSet) => set((state) => ({ sets: [...state.sets, newSet] })),
    deleteSet: (setId: string) => set((state) => ({ sets: state.sets.filter((set) => set.id !== setId) })),
    updateSet: (newSet: TodoSet) => set((state) => ({ sets: state.sets.map((s) => s.id === newSet.id ? newSet : s) })),
  }
}
))

// Selectors
export const useTodoActions = () => useTodoAppStore((state) => state.actions);
export const useGetUser = () => useTodoAppStore((state) => state.user)

export const useGetTasks = () => useTodoAppStore((state) => state.tasks)
export const useGetTaskById = (taskId: string) => useTodoAppStore((state) => state.tasks.find((task) => task.id === taskId))
// export const useGetTasksByIMP = () => useTodoAppStore((state) => state.tasks.filter((task) => task.isImportant === true))
// export const useGetTasksByToday = () => useTodoAppStore((state) => state.tasks.filter((task) => task.isToday === true))
// export const useGetTasksByPlanned = () => useTodoAppStore((state) => state.tasks.filter((task) => task.dueDate !== null))

export const useGetTasksBySetId = (setId: string) => useTodoAppStore((state) => {
  switch (setId) {
    case "myday":
      return state.tasks.filter((t) => t.isToday);
    case "important":
      return state.tasks.filter((t) => t.isImportant);
    case "planned":
      return state.tasks.filter((t) => t.dueDate !== null);
    case "assigned_to_me":
      // TODO: 实现分配给我的逻辑
      return [];
    case "flagged":
      // TODO: 实现标记邮件逻辑
      return [];
    case "inbox":
      // 显示所有任务，或者没有 setId 的任务？通常 inbox 是默认列表
      // 这里假设 inbox 显示所有未归档的任务
      return state.tasks;
    default:
      return state.tasks.filter((t) => t.id === setId);
  }
})

export const useGetCountBySetId = (setId: string) => useTodoAppStore((state) => {
  switch (setId) {
    case "myday":
      return state.tasks.filter((t) => t.isToday).length;
    case "important":
      return state.tasks.filter((t) => t.isImportant).length;
    case "planned":
      return state.tasks.filter((t) => t.dueDate !== null).length;
    default:
      return state.tasks.filter((t) => t.id === setId).length;
  }
});

export const useGetSets = () => useTodoAppStore((state) => state.sets)

export const useGetTodoSetById = (setId: string) => useTodoAppStore((state) => {
  const defaultSet = defaultTodoSet.find(s => s.id === setId);
  if (defaultSet) return defaultSet;
  return state.sets.find(s => s.id === setId);
})
