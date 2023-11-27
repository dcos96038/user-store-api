import { envs } from '../../../config/envs'
import { CategoryModel } from '../models/category.model'
import { ProductModel } from '../models/product.model'
import { UserModel } from '../models/user.model'
import { connect, disconnect } from '../mongo-database'
import { seedData } from './data'

void (async () => {
  await connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  await main()

  await disconnect()
})()

const randomBetween0AndX = (x: number) => Math.floor(Math.random() * x)

async function main () {
  await Promise.all([
    UserModel.deleteMany(),
    ProductModel.deleteMany(),
    CategoryModel.deleteMany()
  ])

  const users = await UserModel.insertMany(seedData.users)

  const categories = await CategoryModel.insertMany(
    seedData.categories.map(category => ({
      ...category,
      user: users[0]._id
    }))
  )

  await ProductModel.insertMany(
    seedData.products.map(product => ({
      ...product,
      user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
      category: categories[randomBetween0AndX(seedData.categories.length - 1)]._id
    }))
  )

  console.log('Seeding finished ✅ ')
}
