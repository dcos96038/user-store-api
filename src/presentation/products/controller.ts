import { type Request, type Response } from 'express'
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto'
import { type ProductsService } from '../services/products.service'
import { CustomError } from '../../domain/errors/custom.error'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'

export class ProductsController {
  constructor (private readonly productsService: ProductsService) {}

  private readonly handleError = (err: unknown, res: Response) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ message: err.message })
    }

    return res.status(500).send({ message: 'Internal server error' })
  }

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body)

    if (error) return this.handleError(error, res)

    this.productsService.createProduct(createProductDto)
      .then(product => res.status(201).json(product))
      .catch(error => this.handleError(error, res))
  }

  getProducts = (req: Request, res: Response) => {
    const [error, paginationDto] = PaginationDto.create(req.query)

    if (error) return this.handleError(error, res)

    this.productsService.getProducts(paginationDto)
      .then(products => res.json(products))
      .catch(error => this.handleError(error, res))
  }
}
