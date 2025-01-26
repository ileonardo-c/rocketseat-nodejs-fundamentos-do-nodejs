import TasksController from './controllers/tasksController.js'
import { buildRoutePath } from './utils/server.js'

export const routes = [
  { method: 'POST', path: buildRoutePath('tasks'), handler: TasksController.createTask },
  { method: 'GET', path: buildRoutePath('/tasks'), handler: TasksController.getTasks },
  { method: 'PUT', path: buildRoutePath('/tasks/:id'), handler: TasksController.updateTask },
  { method: 'DELETE', path: buildRoutePath('/tasks/:id'), handler: TasksController.deleteTask },
  { method: 'PATCH', path: buildRoutePath('/tasks/:id/complete'), handler: TasksController.completeTask },
]
