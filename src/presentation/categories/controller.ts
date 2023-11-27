import { type Request, type Response } from 'express'
import { CustomError } from '../../domain/errors/custom.error'
import { CreateCategoryDto } from '../../domain/dtos/categories/create-category.dto'
import { type CategoriesService } from '../services/categories.service'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'

export class CategoryController {
  constructor (private readonly categoriesService: CategoriesService) { }

  private readonly handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ message: err.message })
    }

    return res.status(500).send({ message: 'Internal server error' })
  }

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body)

    if (error) return this.handleError(error, res)

    this.categoriesService.createCategory(createCategoryDto, req.body.user).then((response) => {
      res.status(201).json(response)
    }
    ).catch((error) => {
      this.handleError(error, res)
    })
  }

  getCategories = (req: Request, res: Response) => {
    const [error, paginationDto] = PaginationDto.create(req.query)

    if (error) return this.handleError(error, res)

    this.categoriesService.getCategories(paginationDto).then((response) => {
      res.json(response)
    }
    ).catch((error) => {
      this.handleError(error, res)
    })
  }
}
