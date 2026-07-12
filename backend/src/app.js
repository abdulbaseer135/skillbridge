import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import listingRoutes from './routes/listingRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import { notFound } from './middleware/notFoundMiddleware.js'

dotenv.config()

const app = express()

connectDB(process.env.MONGODB_URI)

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)
app.use(morgan('dev'))
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.get('/api/v1', (req, res) => {
  res.json({ status: 'ok', message: 'SkillBridge API is running' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/listings', listingRoutes)
app.use('/api/v1/matches', matchRoutes)
app.use('/api/v1/conversations', conversationRoutes)
app.use('/api/v1/reports', reportRoutes)
app.use('/api/v1/reviews', reviewRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
