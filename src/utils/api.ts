import axios from "axios";

const baseURL: string = "https://gateway-dev.erkam.cronos.co.id/api";
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://gateway-dev.erkam.cronos.co.id/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Credentials": true,
  },
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth");
    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token).token;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// response interceptor
api.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      //response success : 0 bases
      throw Error(response.data.meta.success);
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
