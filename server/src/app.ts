import 'dotenv/config'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { ConnectOptions } from 'mongoose'
import { DATABASE_NAME, HOST, MONGO_URL, PORT } from './config'
import { initRoutes } from './routes'

class App {
  private app: Express

  constructor() {
    this.app = express()
    this.config()
    initRoutes(this.app)
    this.connectDB()
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at ${HOST}:${PORT}`)
    })
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors())
  }

  private async connectDB(): Promise<void> {
    const mongoUrl = `${MONGO_URL}/${DATABASE_NAME}`
    try {
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB', error)
    }
  }
}

const app = new App()
app.start()
