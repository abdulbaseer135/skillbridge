import request from 'supertest'
import app from '../app.js'

describe('Message routes', () => {
  it('should require auth for conversations', async () => {
    const res = await request(app).get('/api/v1/conversations')
    expect(res.statusCode).toBe(401)
  })
})
