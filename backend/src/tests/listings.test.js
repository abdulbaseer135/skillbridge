import request from 'supertest'
import app from '../app.js'

describe('Startup routes', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/v1/health')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ success: true, status: 'ok' })
  })
})
