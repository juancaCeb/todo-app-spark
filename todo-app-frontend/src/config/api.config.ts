export const API_CONFIG = {
  BASE_URL: 'http://localhost:9090',
  ENDPOINTS: {
    METRICS: '/todos/metrics',
    TOKEN: '/token',
    CREATE: '/todos'
  },
  REFRESH_INTERVAL: 5000
} as const;