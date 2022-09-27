import { Router } from 'express'
import { ToDoController } from '../../controllers'

const todoRoutes = Router()

todoRoutes.post('/todo/new', ToDoController.createToDo)

todoRoutes.get('/todo/:id?', ToDoController.getToDos)

todoRoutes.put('/todo/update/:id', ToDoController.updateToDo)

todoRoutes.delete('/todo/delete/:id', ToDoController.deleteToDo)

export default todoRoutes
