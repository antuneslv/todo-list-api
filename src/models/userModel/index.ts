import { prisma } from '../../database'

interface User {
  id: string
  name: string
  email: string
  password: string
}

export class UserModelQueries {
  static async createNewUser({ name, email, password }: Omit<User, 'id'>) {
    return await prisma.users.create({
      data: { name, email, password },
    })
  }

  static async getUserByEmail({ email }: Pick<User, 'email'>) {
    return await prisma.users.findUnique({
      where: { email },
    })
  }

  static async getUserById({ id }: Pick<User, 'id'>) {
    return await prisma.users.findUnique({
      where: { id },
    })
  }

  static async updateUserById({ id, name, email, password }: User) {
    return await prisma.users.update({
      where: { id },
      data: { name, email, password },
    })
  }

  static async deleteUserById({ id }: Pick<User, 'id'>) {
    await prisma.users.delete({
      where: { id },
    })
  }
}
