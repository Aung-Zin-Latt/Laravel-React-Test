import axios from 'axios'

const axiosClientApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// interceptors are special functions which'll be executed before request is sent or after the response is received
axiosClientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = `Bearer ${token}`

  return config;
});

axiosClientApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  try {
    const {response} = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  } catch (e) {
    console.error(e);
  }
  throw error;
}); // the first param is Result and 2nd is rejected

export default axiosClientApi;
