import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcryptAdapter = {
  hash: async (value: string): Promise<string> => {
    const salt = genSaltSync(10)

    return hashSync(value, salt)
  },

  compare: async (value: string, hash: string): Promise<boolean> => {
    return compareSync(value, hash)
  }
}
