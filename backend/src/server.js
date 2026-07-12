import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'
import { initSocket } from './sockets/chatSocketHandler.js'
import { connectDB } from './config/db.js'

dotenv.config()

connectDB(process.env.MONGODB_URI)

const PORT = process.env.PORT || 5000
const server = http.createServer(app)

initSocket(server)

server.listen(PORT, () => {
  console.log(`SkillBridge backend listening on port ${PORT}`)
})
