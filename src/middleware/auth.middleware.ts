import { type NextFunction, type Request, type Response } from 'express'
import { jwtAdapter } from '../config/jwt.adapter'
import { UserModel } from '../data/mongo/models/user.model'
import { UserEntity } from '../domain/entities/user.entity'

export const AuthMiddleware = {
  validateJWT: async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).send({ message: 'No token provided' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2) return res.status(401).send({ message: 'Token error' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token malformatted' })

    try {
      const payload = await jwtAdapter.verify<{ id: string }>(token)
      if (!payload) return res.status(401).send({ message: 'Invalid token' })

      const user = await UserModel.findById(payload.id)
      if (!user) return res.status(401).send({ message: 'Invalid token' })

      req.body.user = UserEntity.fromObject(user)
      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
