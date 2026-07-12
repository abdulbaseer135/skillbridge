import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../config/env.js'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
  })

  io.use(async (socket, next) => {
    const rawCookie = socket.handshake.headers.cookie || ''
    const cookies = Object.fromEntries(rawCookie.split(';').map((cookie) => {
      const [name, ...rest] = cookie.trim().split('=')
      return [name, rest.join('=')]
    }))
    const token = cookies.token
    if (!token) {
      return next(new Error('Authentication required'))
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      if (!user) return next(new Error('Unauthorized'))
      socket.user = user
      next()
    } catch (error) {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', (socket) => {
    socket.join(socket.user._id.toString())

    socket.on('send_message', async ({ conversationId, content }) => {
      if (!content || !conversationId) return
      const conversation = await Conversation.findById(conversationId)
      if (!conversation) return
      const message = await Message.create({
        conversation: conversation._id,
        sender: socket.user._id,
        content,
        readBy: [socket.user._id],
      })
      const populated = await message.populate('sender', 'name avatar')
      io.to(conversationId).emit('receive_message', populated)
    })

    socket.on('join_conversation', async ({ conversationId }) => {
      if (conversationId) socket.join(conversationId)
    })

    socket.on('typing_start', ({ conversationId }) => {
      if (conversationId) socket.to(conversationId).emit('typing_start', { userId: socket.user._id })
    })

    socket.on('typing_stop', ({ conversationId }) => {
      if (conversationId) socket.to(conversationId).emit('typing_stop', { userId: socket.user._id })
    })

    socket.on('message_read', async ({ conversationId }) => {
      if (!conversationId) return
      await Message.updateMany(
        { conversation: conversationId, readBy: { $ne: socket.user._id } },
        { $push: { readBy: socket.user._id } },
      )
      io.to(conversationId).emit('message_read', { userId: socket.user._id })
    })
  })
}
