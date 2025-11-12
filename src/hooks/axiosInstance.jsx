import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bwm-cityfix.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
