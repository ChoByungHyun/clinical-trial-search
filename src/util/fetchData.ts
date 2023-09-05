import {
  getCachedData,
  isCacheExpired,
  setCachedData,
} from "util/localStorage";
import { CACHE_EXPIRY_MS, LOCALSTORAGE_KEY } from "constants/searchConst";
import getClinicalTrial from "api/getClinicalTrial";

export async function fetchData() {
  const cachedData = getCachedData(LOCALSTORAGE_KEY);

  if (!cachedData || isCacheExpired(cachedData.timestamp, CACHE_EXPIRY_MS)) {
    try {
      const response = await getClinicalTrial();
      const newData = response; // 응답에서 data 속성이 유효한지 확인

      if (newData.data.length > 0) {
        setCachedData(LOCALSTORAGE_KEY, newData);
        return newData.data;
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  } else {
    return cachedData.data;
  }
}
