import apiClient from './apiClient.js'

export const getProfile = () => apiClient.get('/auth/me')
export const updateProfile = (data) => apiClient.patch('/users/profile', data)
export const uploadAvatar = (formData) => apiClient.patch('/users/profile/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const blockUser = (userId) => apiClient.post(`/users/${userId}/block`)
export const unblockUser = (userId) => apiClient.delete(`/users/${userId}/block`)
