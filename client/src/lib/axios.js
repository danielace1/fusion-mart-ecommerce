import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, // to send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
