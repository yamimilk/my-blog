<template>
  <div class="todo-container">
    <div class="todo-header">
      <h1 class="todo-title">待办日程</h1>
      <p class="todo-description">管理您的任务和日程安排</p>
    </div>

    <!-- 添加待办事项表单 -->
    <el-card class="todo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="header-icon"><EditPen /></el-icon>
          <span>添加新任务</span>
        </div>
      </template>

      <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="任务标题" prop="title">
              <el-input v-model="form.title" placeholder="输入任务标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <el-form-item label="截止日期" prop="dueDate">
              <el-date-picker v-model="form.dueDate" type="date" placeholder="选择截止日期" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="任务描述">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="输入任务详细描述"></el-input>
        </el-form-item>

        <el-form-item label="优先级">
          <el-radio-group v-model="form.priority">
            <el-radio-button label="high">高</el-radio-button>
            <el-radio-button label="medium">中</el-radio-button>
            <el-radio-button label="low">低</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">添加任务</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 待办事项列表 -->
    <el-card class="todo-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon class="header-icon"><List /></el-icon>
          <span>任务列表</span>
          <el-radio-group v-model="filter" class="filter-group" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="active">未完成</el-radio-button>
            <el-radio-button label="completed">已完成</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <div v-if="filteredTodos.length === 0" class="empty-list">
        <el-empty description="没有待办事项"></el-empty>
      </div>

      <el-table v-else :data="filteredTodos" style="width: 100%" row-key="id" border
        @row-click="handleRowClick"
        :row-class-name="getRowClass"
      >
        <el-table-column width="50">
          <template #default="scope">
            <div class="checkbox-cell" @click.stop="toggleComplete(scope.row.id)">
              <el-checkbox 
                v-model="scope.row.completed" 
                @change.stop="toggleComplete(scope.row.id)"
                :onClick="(event) => event.stopPropagation()"
              ></el-checkbox>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="任务" min-width="180">
          <template #default="scope">
            <div class="todo-info">
              <div :class="['todo-title', scope.row.completed ? 'completed' : '']">{{ scope.row.title }}</div>
              <div class="todo-description">{{ scope.row.description }}</div>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="优先级" width="100">
          <template #default="scope">
            <el-tag :type="priorityType(scope.row.priority)" size="small">
              {{ priorityLabel(scope.row.priority) }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="截止日期" width="120" sortable>
          <template #default="scope">
            {{ scope.row.dueDate }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button 
              size="small" 
              type="primary" 
              plain 
              @click.stop="editTodo(scope.row)"
              :disabled="scope.row.completed"
            >
              编辑
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              plain 
              @click.stop="confirmDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑任务" width="50%">
      <el-form :model="editForm" label-position="top">
        <el-form-item label="任务标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        
        <el-form-item label="任务描述">
          <el-input v-model="editForm.description" type="textarea" :rows="3"></el-input>
        </el-form-item>
        
        <el-form-item label="优先级">
          <el-radio-group v-model="editForm.priority">
            <el-radio-button label="high">高</el-radio-button>
            <el-radio-button label="medium">中</el-radio-button>
            <el-radio-button label="low">低</el-radio-button>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="截止日期">
          <el-date-picker v-model="editForm.dueDate" type="date" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { EditPen, List, Delete } from '@element-plus/icons-vue'
import { useTodoStore } from '../stores/todo'
import { ElMessage, ElMessageBox } from 'element-plus'

const todoStore = useTodoStore()
const formRef = ref(null)
const editDialogVisible = ref(false)
const filter = ref('all') // 过滤选项：all, active, completed

// 加载待办事项
onMounted(() => {
  todoStore.loadTodos()
})

// 表单数据
const form = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

// 编辑表单数据
const editForm = ref({
  id: null,
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入任务标题', trigger: 'blur' },
    { min: 2, max: 100, message: '标题长度在2到100个字符之间', trigger: 'blur' }
  ],
  dueDate: [
    { required: true, message: '请选择截止日期', trigger: 'change' }
  ]
}

// 根据过滤条件获取待办事项
const filteredTodos = computed(() => {
  const sorted = todoStore.sortedTodos()
  if (filter.value === 'all') {
    return sorted
  } else if (filter.value === 'active') {
    return sorted.filter(todo => !todo.completed)
  } else {
    return sorted.filter(todo => todo.completed)
  }
})

// 添加待办事项
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      todoStore.addTodo({
        title: form.value.title,
        description: form.value.description,
        priority: form.value.priority,
        dueDate: form.value.dueDate ? form.value.dueDate.toISOString().substring(0, 10) : ''
      })
      ElMessage.success('已添加新任务')
      resetForm()
    } else {
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
}

// 切换完成状态
const toggleComplete = (id) => {
  todoStore.toggleComplete(id)
}

// 处理行点击
const handleRowClick = (row) => {
  // 只有点击非按钮区域才会触发状态切换
  toggleComplete(row.id)
}

// 获取行的类名
const getRowClass = (row) => {
  return row.completed ? 'completed-row' : ''
}

// 打开编辑对话框
const editTodo = (todo) => {
  editForm.value = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.dueDate
  }
  editDialogVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  todoStore.updateTodo(editForm.value.id, {
    title: editForm.value.title,
    description: editForm.value.description,
    priority: editForm.value.priority,
    dueDate: editForm.value.dueDate instanceof Date 
      ? editForm.value.dueDate.toISOString().substring(0, 10) 
      : editForm.value.dueDate
  })
  ElMessage.success('任务已更新')
  editDialogVisible.value = false
}

// 确认删除对话框
const confirmDelete = (id) => {
  ElMessageBox.confirm(
    '确定要删除这个任务吗？此操作不可撤销。',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    todoStore.removeTodo(id)
    ElMessage.success('任务已删除')
  }).catch(() => {
    // 取消删除
  })
}

// 优先级标签
const priorityLabel = (priority) => {
  const labels = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return labels[priority] || priority
}

// 优先级对应的标签类型
const priorityType = (priority) => {
  const types = {
    high: 'danger',
    medium: 'warning',
    low: 'info'
  }
  return types[priority] || ''
}
</script>

<style scoped>
.todo-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.todo-header {
  margin-bottom: 30px;
}

.todo-title {
  font-size: 24px;
  color: var(--text-color);
  margin: 0 0 8px 0;
}

.todo-description {
  font-size: 14px;
  color: var(--info-color);
  margin: 0;
}

.todo-card {
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: var(--card-background);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.header-icon {
  margin-right: 8px;
  color: var(--primary-color);
}

.filter-group {
  margin-left: auto;
}

.todo-info {
  display: flex;
  flex-direction: column;
}

.todo-info .todo-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.todo-info .todo-description {
  font-size: 12px;
  color: var(--info-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.todo-info .completed {
  text-decoration: line-through;
  color: var(--info-color);
}

.empty-list {
  padding: 20px;
  text-align: center;
}

.checkbox-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

/* 自定义表格样式 */
:deep(.el-table__row) {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

:deep(.el-table__row:hover) {
  background-color: var(--hover-background) !important;
}

:deep(.el-table__row.completed-row) {
  background-color: rgba(var(--success-color-rgb), 0.05);
}
</style> 