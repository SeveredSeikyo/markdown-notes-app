import axios from 'axios'

const baseURL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL || 'http://localhost:3000';

export default axios.create({
  baseURL,
})