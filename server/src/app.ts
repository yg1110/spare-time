import 'dotenv/config'
import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { HOST, PORT } from './config'
import https from 'https'
import bodyParser from 'body-parser'
import cors from 'cors'
import initRoutes from './routes'
import connectDB from './db'
import typeDefs from './schemas/typeDefs'
import resolvers from './schemas/resolvers'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import fs from 'fs'

const FileStore = require('session-file-store')(session)
const HTTPS_PORT = 4000

class App {
  server: ApolloServer
  app: Application

  constructor() {
    this.server = new ApolloServer({ typeDefs, resolvers })
    this.app = express()
    this.config()
    this.storageInit()
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
          `Server running on ${HOST}:${HTTPS_PORT}${this.server.graphqlPath}`
        )
      })
    })
    this.app.use(express.static('public'))
    this.app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`)
    })
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors())
  }

  private storageInit(): void {
    this.app.use(cookieParser())
    this.app.use(
      session({
        secret: 'session-cookie', // 암호화하는 데 쓰일 키
        resave: false, // 세션을 언제나 저장할지 설정함
        saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
        store: new FileStore(), // 데이터를 저장하는 형식
      })
    )
  }
}

const app = new App()
app.start()
