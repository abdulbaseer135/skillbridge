import apiClient from './apiClient.js'

export const fetchListings = (params) => apiClient.get(`/listings/search?${new URLSearchParams(params).toString()}`)
export const fetchListing = (id) => apiClient.get(`/listings/${id}`)
export const createListing = (data) => apiClient.post('/listings', data)
export const updateListing = (id, data) => apiClient.patch(`/listings/${id}`, data)
export const deleteListing = (id) => apiClient.delete(`/listings/${id}`)
export const fetchMyListings = () => apiClient.get('/listings/me')
