import 'dotenv/config'
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { HOST, HTTPS_PORT, PORT } from './config'
import https from 'https'
import bodyParser from 'body-parser'
import cors from 'cors'
import initRoutes from './routes'
import connectDB from './db'
import typeDefs from './schemas/typeDefs'
import resolvers from './schemas/resolvers'
import cookieParser from 'cookie-parser'
import fs from 'fs'

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
    this.server.start().then(() => {
      const options = {
        key: fs.readFileSync('./rootca.key'),
        cert: fs.readFileSync('./rootca.crt'),
      }
      this.server.applyMiddleware({ app: this.app })
      const httpsServer = https.createServer(options, this.app)
      httpsServer.listen(HTTPS_PORT, () => {
        console.log(
          `⚡️[graphql]: Server is running at ${HOST}:${HTTPS_PORT}${this.server.graphqlPath}`
        )
      })
    })
    this.app.use(express.static('public'))
    this.app.listen(PORT, () => {
      console.log(`⚡️[express]: Server is running at ${HOST}:${PORT}`)
    })
  }

  private config(): void {
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors())
  }
}

const app = new App()
app.start()
