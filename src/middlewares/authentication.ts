import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
  sub: string
}

const SECRET_KEY = process.env.SECRET_KEY!

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  const publicRoutes = ['/signup', '/login']

  if (publicRoutes.includes(req.path)) return next()

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing token' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, SECRET_KEY) as Payload
    req.id_user = sub

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
