import apiClient from './apiClient.js'

export const fetchMatches = () => apiClient.get('/matches')
export const completeMatch = (id) => apiClient.post(`/matches/${id}/complete`)
