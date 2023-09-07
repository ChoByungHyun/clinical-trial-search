import { CACHE_EXPIRY_MS, STORAGE_KEY } from "constants/searchConst";

const setCachedData = (key: string, data: any) => {
  const cachedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  cachedData[key] = data;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cachedData));
};

const getCachedData = (key: string) => {
  const cachedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  if (cachedData[key]) {
    return cachedData[key];
  }
  return null;
};

const isCacheExpired = (timestamp: number) => {
  return Date.now() - timestamp > CACHE_EXPIRY_MS;
};
export { setCachedData, getCachedData, isCacheExpired };
