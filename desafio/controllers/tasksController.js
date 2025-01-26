import Database from '../database.js'
import { randomUUID } from 'node:crypto'

class TasksController {
  createTask(req, res) {
    const { title, description } = req.body

    if (!title) {
      return res.writeHead(400).end(
        JSON.stringify({ message: 'title is required' }),
      )
    }

    if (!description) {
      return res.writeHead(400).end(
        JSON.stringify({ message: 'description is required' })
      )
    }

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    Database.insert('tasks', task)

    return res.writeHead(201).end()
  }

  getTasks(req, res) {
    const { search } = req.query

    const tasks = Database.select('tasks', {
      title: search,
      description: search
    })

    return res.end(JSON.stringify(tasks))
  }

  updateTask(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    if (!title && !description) {
      return res.writeHead(400).end(
        JSON.stringify({ message: 'title or description are required' })
      )
    }

    const [task] = Database.select('tasks', { id })

    if (!task) {
      return res.writeHead(404).end()
    }

    Database.update('tasks', id, {
      title: title ?? task.title,
      description: description ?? task.description,
      updated_at: new Date()
    })

    return res.writeHead(204).end()
  }

  deleteTask(req, res) {
    const { id } = req.params

    const [task] = Database.select('tasks', { id })

    if (!task) {
      return res.writeHead(404).end()
    }

    Database.delete('tasks', id)

    return res.writeHead(204).end()
  }

  completeTask(req, res) {
    const { id } = req.params

    const [task] = Database.select('tasks', { id })

    if (!task) {
      return res.writeHead(404).end()
    }

    const isTaskCompleted = !!task.completed_at
    const completed_at = isTaskCompleted ? null : new Date()

    Database.update('tasks', id, { completed_at })

    return res.writeHead(204).end()
  }
}

export default new TasksController()
