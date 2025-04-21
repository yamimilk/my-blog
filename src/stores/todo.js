import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  // 待办事项列表
  const todos = ref([
    { 
      id: 1, 
      title: '完成博客系统开发', 
      description: '实现基本的博客功能，包括文章列表、详情页和评论系统', 
      completed: false, 
      priority: 'high', 
      createdAt: '2023-10-01', 
      dueDate: '2023-10-30'
    },
    { 
      id: 2, 
      title: '学习Vue 3新特性', 
      description: '深入学习Composition API、Suspense等新功能', 
      completed: true, 
      priority: 'medium', 
      createdAt: '2023-09-15', 
      dueDate: '2023-09-25'
    },
    { 
      id: 3, 
      title: '优化网站性能', 
      description: '分析并优化网站加载速度，提升用户体验', 
      completed: false, 
      priority: 'medium', 
      createdAt: '2023-10-05', 
      dueDate: '2023-10-15'
    },
    { 
      id: 4, 
      title: '准备技术分享', 
      description: '准备关于Vue 3和Element Plus的技术分享材料', 
      completed: false, 
      priority: 'low', 
      createdAt: '2023-10-10', 
      dueDate: '2023-11-10'
    }
  ])

  // 获取下一个ID
  const getNextId = () => {
    const ids = todos.value.map(todo => todo.id)
    return ids.length > 0 ? Math.max(...ids) + 1 : 1
  }

  // 添加待办事项
  const addTodo = (todo) => {
    const newTodo = {
      id: getNextId(),
      title: todo.title,
      description: todo.description || '',
      completed: false,
      priority: todo.priority || 'medium',
      createdAt: new Date().toISOString().substring(0, 10),
      dueDate: todo.dueDate || ''
    }
    todos.value.push(newTodo)
    saveTodos()
  }

  // 删除待办事项
  const removeTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
    saveTodos()
  }

  // 更新待办事项
  const updateTodo = (id, updates) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates }
      saveTodos()
    }
  }

  // 切换完成状态
  const toggleComplete = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos()
    }
  }

  // 保存到本地存储
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  // 从本地存储加载
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }

  // 按优先级排序
  const sortedTodos = () => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return [...todos.value].sort((a, b) => {
      // 先按优先级排序
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
      if (priorityDiff !== 0) return priorityDiff
      
      // 如果优先级相同，按截止日期排序
      return new Date(a.dueDate) - new Date(b.dueDate)
    })
  }

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    toggleComplete,
    loadTodos,
    sortedTodos
  }
}) 