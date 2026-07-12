import apiClient from './apiClient.js'

export const submitReport = (data) => apiClient.post('/reports', data)
