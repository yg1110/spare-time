import 'dotenv/config'
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { HOST, PORT } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
import initRoutes from './routes'
import connectDB from './db'
import typeDefs from './schemas/typeDefs'
import resolvers from './schemas/resolvers'

class App {
  server: ApolloServer
  app: Application

  constructor() {
    this.server = new ApolloServer({ typeDefs, resolvers })
    this.app = express()
    this.config()
    initRoutes(this.app)
  }

  public async start(): Promise<void> {
    await connectDB()
    await this.server.start()
    this.server.applyMiddleware({ app: this.app })
    this.app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`)
    })
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors())
  }
}

const app = new App()
app.start()
