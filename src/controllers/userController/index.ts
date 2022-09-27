import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModelQueries } from '../../models'
import { UserDTO } from '../../views'
import { AuthDTO } from '../../views'

const SECRET_KEY = process.env.SECRET_KEY!

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)

    const user = await UserModelQueries.getUserByEmail({ email })

    if (user) return res.status(409).json({ error: 'E-mail already registred' })

    const newUser = await UserModelQueries.createNewUser({
      name,
      email,
      password: passwordHashed,
    })

    return res.status(201).json(new UserDTO(newUser))
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const user = await UserModelQueries.getUserByEmail({ email })

    if (!user) {
      return res.status(403).json({ error: 'E-mail or password invalid' })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(403).json({ error: 'E-mail or password invalid' })
    }

    const jwtToken = jwt.sign({ UserEmail: user.email }, SECRET_KEY, {
      subject: user.id,
      expiresIn: '1h',
    })

    return res.json(new AuthDTO(jwtToken, user))
  }

  static async getUser(req: Request, res: Response) {
    const { id_user } = req

    const user = await UserModelQueries.getUserById({ id: id_user })

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.json(new UserDTO(user))
  }

  static async updateUser(req: Request, res: Response) {
    const { id_user } = req

    const user = await UserModelQueries.getUserById({ id: id_user })

    if (!user) return res.status(404).json({ error: 'User not found' })

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing data' })
    }

    const getUserByEmail = await UserModelQueries.getUserByEmail({ email })

    if (getUserByEmail && getUserByEmail.email !== user.email) {
      return res.status(409).json({ error: 'E-mail already registered' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)

    const updatedUser = await UserModelQueries.updateUserById({
      id: id_user,
      name,
      email,
      password: passwordHashed,
    })

    return res.json(new UserDTO(updatedUser))
  }

  static async deleteUser(req: Request, res: Response) {
    const { id_user } = req

    const user = await UserModelQueries.getUserById({ id: id_user })

    if (!user) return res.status(404).json({ error: 'User not found' })

    await UserModelQueries.deleteUserById({ id: id_user })

    return res.status(204).send()
  }
}
