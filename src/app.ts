import express from 'express'
import allRoutes from './routes'
import { authenticationMiddleware } from './middlewares/authentication'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(authenticationMiddleware)
  }

  private routes() {
    this.express.use(allRoutes)
  }
}

export default new App().express
