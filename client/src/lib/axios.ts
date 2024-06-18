import axios from "axios";
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

