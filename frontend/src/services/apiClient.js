import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => config, (error) => Promise.reject(error))
apiClient.interceptors.response.use((response) => response, (error) => Promise.reject(error))

export default apiClient
