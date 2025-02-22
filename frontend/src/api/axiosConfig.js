import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstance;
