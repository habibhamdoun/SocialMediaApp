import axios from "axios";

const axiosJsonInstance = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosJsonInstance;
