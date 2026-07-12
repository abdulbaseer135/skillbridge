import http from 'http'
import app from './app.js'
import { initSocket } from './sockets/chatSocketHandler.js'
import { connectDB } from './config/db.js'
import env from './config/env.js'

connectDB(env.MONGODB_URI)

const PORT = env.PORT
const server = http.createServer(app)

initSocket(server)

server.listen(PORT, () => {
  console.log(`SkillBridge backend listening on port ${PORT}`)
})
