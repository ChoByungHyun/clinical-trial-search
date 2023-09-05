const setCachedData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = (key: string) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

const isCacheExpired = (timestamp: number, expiryMs: number) => {
  return Date.now() - timestamp > expiryMs;
};

export { setCachedData, getCachedData, isCacheExpired };
