import { prisma } from '../../database'

interface ToDo {
  id: number
  id_user: string
  description: string
  is_done: boolean
}

export class ToDoModelQueries {
  static async createNewToDo({
    id_user,
    description,
    is_done,
  }: Omit<ToDo, 'id'>) {
    return await prisma.toDos.create({
      data: { id_user, description, is_done },
    })
  }

  static async getAllToDos({ id_user }: Pick<ToDo, 'id_user'>) {
    return await prisma.toDos.findMany({
      where: { id_user },
    })
  }

  static async getToDoById({ id, id_user }: Pick<ToDo, 'id' | 'id_user'>) {
    return await prisma.toDos.findFirst({
      where: { id, id_user },
    })
  }

  static async updateToDoById({
    id,
    description,
    is_done,
  }: Omit<ToDo, 'id_user'>) {
    return await prisma.toDos.update({
      where: { id },
      data: { description, is_done },
    })
  }

  static async deleteToDoById({ id }: Pick<ToDo, 'id'>) {
    await prisma.toDos.delete({
      where: { id },
    })
  }
}
