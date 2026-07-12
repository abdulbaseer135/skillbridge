import request from 'supertest'
import app from '../app.js'

describe('Listing routes', () => {
  it('should return active listings', async () => {
    const res = await request(app).get('/api/v1/listings')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
