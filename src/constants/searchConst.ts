const TITLE = "국내 모든 임상시험 검색하고 온라인으로 참여하기";
const TEN_MINUTE = 1000 * 60 * 10; // 10min
const CACHE_EXPIRY_MS = TEN_MINUTE; // 캐시 만료 시간: 10분 (밀리초 단위)
const STORAGE_KEY = "clinicalTrialData";
const DEBOUNCE_INTERVAL = 400;

export { TITLE, CACHE_EXPIRY_MS, STORAGE_KEY, DEBOUNCE_INTERVAL };
