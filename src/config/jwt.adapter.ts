import jwt from 'jsonwebtoken'
import { envs } from './envs'

export const jwtAdapter = {
  sign: async (payload: string | object | Buffer): Promise<string | null> => {
    return await new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SECRET, {
        expiresIn: '30d'
      }, (err, token) => {
        if (err) resolve(null)

        resolve(token ?? null)
      })
    })
  },
  verify: async <T> (token: string): Promise<T | null> => {
    return await new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) resolve(null)

        resolve(decoded as T ?? null)
      })
    })
  }
}
