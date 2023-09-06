const setCachedData = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = (key: string) => {
  const cachedData = sessionStorage.getItem(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

const isCacheExpired = (timestamp: number, expiryMs: number) => {
  return Date.now() - timestamp > expiryMs;
};

export { setCachedData, getCachedData, isCacheExpired };
