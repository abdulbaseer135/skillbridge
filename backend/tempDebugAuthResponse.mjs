import request from 'supertest'
import app from './src/app.js'

const res = await request(app).post('/api/v1/auth/register').send({ email: 'test@example.com' })
console.log('status', res.status)
console.log('headers', res.headers['content-type'])
console.log('body', JSON.stringify(res.body, null, 2))
