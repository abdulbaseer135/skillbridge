import apiClient from './apiClient.js'

export const fetchConversations = () => apiClient.get('/conversations')
export const fetchMessages = (conversationId) => apiClient.get(`/messages/${conversationId}/messages`)
export const sendMessage = (conversationId, content) => apiClient.post(`/messages/${conversationId}/messages`, { content })
