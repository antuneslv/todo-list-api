import { Request, Response } from 'express'
import { ToDoModelQueries } from '../../models'

export class ToDoController {
  static async createToDo(req: Request, res: Response) {
    const { id_user } = req
    const { description, is_done } = req.body

    if (!description || is_done === undefined) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const toDo = await ToDoModelQueries.createNewToDo({
      id_user,
      description,
      is_done,
    })

    return res.status(201).json(toDo)
  }

  static async getToDos(req: Request, res: Response) {
    const { id_user } = req
    const id = Number(req.params.id)

    if (id) {
      const toDo = await ToDoModelQueries.getToDoById({ id, id_user })

      if (!toDo) return res.status(404).json({ error: 'ToDo not found' })

      return res.json(toDo)
    }

    const toDos = await ToDoModelQueries.getAllToDos({ id_user })

    return res.json(toDos)
  }

  static async updateToDo(req: Request, res: Response) {
    const { id_user } = req
    const id = Number(req.params.id)
    const { description, is_done } = req.body

    const toDo = await ToDoModelQueries.getToDoById({ id, id_user })

    if (!toDo) return res.status(404).json({ error: 'ToDo not found' })

    if (!description || is_done === undefined) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const updatedToDo = await ToDoModelQueries.updateToDoById({
      id,
      description,
      is_done,
    })

    return res.json(updatedToDo)
  }

  static async deleteToDo(req: Request, res: Response) {
    const { id_user } = req
    const id = Number(req.params.id)

    const toDo = await ToDoModelQueries.getToDoById({ id, id_user })

    if (!toDo) return res.status(404).json({ error: 'ToDo not found' })

    await ToDoModelQueries.deleteToDoById({ id })

    return res.status(204).send()
  }
}
