import apiClient from './apiClient.js'

export const login = (data) => apiClient.post('/auth/login', data)
export const register = (data) => apiClient.post('/auth/register', data)
export const getMe = () => apiClient.get('/auth/me')
export const logout = () => apiClient.post('/auth/logout')
