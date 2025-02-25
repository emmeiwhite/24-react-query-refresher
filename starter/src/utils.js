import axios from 'axios'

// creating a custom instance
const customFetch = axios.create({
  baseURL: 'http://localhost:3000/api/task'
})

export default customFetch
