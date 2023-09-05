import React from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
export default axiosInstance;
