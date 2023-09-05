import React from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const ENDPOINT_SICK = "/sick";

const getClinicalTrial = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT_SICK);
    const data = response.data;
    const timestamp = Date.now();
    const responseData = { data, timestamp };
    console.info("calling api");

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getClinicalTrial;
