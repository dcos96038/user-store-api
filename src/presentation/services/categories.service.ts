import { CategoryModel } from '../../data/mongo/models/category.model'
import { type CreateCategoryDto } from '../../domain/dtos/categories/create-category.dto'
import { type PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { type UserEntity } from '../../domain/entities/user.entity'
import { CustomError } from '../../domain/errors/custom.error'

export class CategoriesService {
  async createCategory (createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name, user: user.id })

    if (categoryExists) throw CustomError.badRequest('Category already exists')

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id
      })

      await category.save()

      return {
        id: category.id,
        name: category.name,
        available: category.available
      }
    } catch (error) {
      throw CustomError.internalServerError('Error creating category')
    }
  }

  async getCategories (paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find().skip((page - 1) * limit).limit(limit)
      ])

      return {
        page,
        limit,
        total,
        next: (page + 1 <= Math.ceil(total / limit)) ? `/api/categories?page=${page + 1}&limit=${limit}` : null,
        previous: (page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available
        }))
      }
    } catch (error) {
      throw CustomError.internalServerError('Error getting categories')
    }
  }
}
