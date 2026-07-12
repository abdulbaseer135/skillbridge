import request from 'supertest'
import app from '../app.js'

describe('Auth routes', () => {
  it('should fail register with missing data', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({ email: 'test@example.com' })
    expect(res.statusCode).toBe(400)
  })
})
