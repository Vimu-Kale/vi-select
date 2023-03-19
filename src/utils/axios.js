import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}//`,
});

axiosInstance.all = axios.all;
axiosInstance.spread = axios.spread;

axiosInstance.interceptors.request.use((request) => {
  request.headers[
    "Authorization"
  ] = `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`;
  return request;
});

export default axiosInstance;
