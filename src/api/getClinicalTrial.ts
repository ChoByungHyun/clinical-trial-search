import { CACHE_EXPIRY_MS } from "constants/searchConst";
import axiosInstance from "./axiosInstance";

const ENDPOINT_SICK = "/sick";

const getClinicalTrial = async (searchValue: string) => {
  try {
    const response = await axiosInstance.get(
      ENDPOINT_SICK + `?q=${searchValue}`
    );
    const data = response.data;
    const deadTime = Date.now();
    const responseData = { data, deadTime };
    console.info("calling api");

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getClinicalTrial;
