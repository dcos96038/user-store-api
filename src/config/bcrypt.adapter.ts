import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcryptAdapter = {
  hash: (value: string) => {
    const salt = genSaltSync(10)

    return hashSync(value, salt)
  },

  compare: (value: string, hash: string) => {
    return compareSync(value, hash)
  }
}
