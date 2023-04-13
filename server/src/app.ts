import 'dotenv/config'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose, { ConnectOptions } from 'mongoose'
import { initRoutesTodo } from './routes/todo'

class App {
  private app: Express

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    initRoutesTodo(this.app)
    this.connectDB()
  }

  public start(): void {
    const port = process.env.PORT || 3000
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
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
    const mongoUrl = 'mongodb://localhost:27017/todos'
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
