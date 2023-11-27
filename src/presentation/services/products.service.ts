import { ProductModel } from '../../data/mongo/models/product.model'
import { type CreateProductDto } from '../../domain/dtos/products/create-product.dto'
import { type PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { CustomError } from '../../domain/errors/custom.error'

export class ProductsService {
  async createProduct (createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({ name: createProductDto.name })

    if (productExists) throw CustomError.badRequest('Product already exists')

    const { userId, categoryId, ...restOfProduct } = createProductDto

    try {
      const product = new ProductModel({
        ...restOfProduct,
        user: userId,
        category: categoryId
      })

      await product.save()

      return {
        id: product._id,
        name: product.name,
        available: product.available,
        price: product.price,
        description: product.description,
        user: product.user,
        category: product.category
      }
    } catch (error) {
      throw CustomError.internalServerError('Error creating product')
    }
  }

  async getProducts (paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    const [total, products] = await Promise.all([
      ProductModel.countDocuments(),
      ProductModel.find().skip((page - 1) * limit).limit(limit).populate('user').populate('category')
    ])

    return {
      products: products.map(product => ({
        id: product._id,
        name: product.name,
        available: product.available,
        price: product.price,
        description: product.description,
        user: product.user,
        category: product.category
      })),
      page,
      limit,
      total,
      next: (page + 1 <= Math.ceil(total / limit)) ? `/api/products?page=${page + 1}&limit=${limit}` : null,
      previous: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null
    }
  }
}
