import { getCachedData, isCacheExpired, setCachedData } from "util/storage";
import { CACHE_EXPIRY_MS } from "constants/searchConst";
import getClinicalTrial from "api/getClinicalTrial";

export async function fetchData(searchValue: string) {
  const cachedData = getCachedData(searchValue);

  if (!cachedData || isCacheExpired(cachedData.timestamp)) {
    try {
      const response = await getClinicalTrial(searchValue);
      const newData = response; // 응답에서 data 속성이 유효한지 확인

      if (newData.data.length > 0) {
        setCachedData(searchValue, newData);
        return newData.data;
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  } else {
    return cachedData.data;
  }
}
