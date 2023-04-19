import 'dotenv/config'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { ConnectOptions } from 'mongoose'
import { initRoutesTodo } from './routes/todo'
import { DATABASE_NAME, HOST, MONGO_URL, PORT } from './config'
import { initRoutesDate } from './routes/date'
import { initRoutesDiary } from './routes/diary'
import { initRoutesTime } from './routes/time'
import { initRoutesSchedule } from './routes/schedule'
import { initRoutesSleep } from './routes/sleepHour'

class App {
  private app: Express

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    initRoutesDate(this.app)
    initRoutesTodo(this.app)
    initRoutesDiary(this.app)
    initRoutesTime(this.app)
    initRoutesSchedule(this.app)
    initRoutesSleep(this.app)
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

  private routes(): void {
    this.app.get('/', (req, res) => {
      res.send('Hello, world!')
    })
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
