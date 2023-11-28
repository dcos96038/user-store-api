import express, { type Router } from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

interface Options {
  port: number
  routes: Router
  publicPath?: string
}

export class Server {
  public readonly app = express()
  private serverListener?: any
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor (options: Options) {
    const { port, routes, publicPath } = options

    this.port = port
    this.routes = routes
    this.publicPath = publicPath ?? path.join(__dirname, 'public')
  }

  async start () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 }
    }))

    this.app.use(express.static(this.publicPath))

    this.app.use(this.routes)

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`)
    })
  }

  public close () {
    this.serverListener.close()
  }
}
