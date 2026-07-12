import request from 'supertest'
import app from '../app.js'

describe('Startup routes', () => {
  it('should return API root status', async () => {
    const res = await request(app).get('/api/v1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ status: 'ok' })
  })
})
