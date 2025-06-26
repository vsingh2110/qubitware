export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
    },
    JOBS: {
        GET_ALL: '/api/jobs',
        GET_BY_ID: (id: string) => `/api/jobs/${id}`,
        CREATE: '/api/jobs',
        UPDATE: (id: string) => `/api/jobs/${id}`,
        DELETE: (id: string) => `/api/jobs/${id}`,
    },
    APPLICANTS: {
        GET_ALL: '/api/applicants',
        GET_BY_ID: (id: string) => `/api/applicants/${id}`,
        CREATE: '/api/applicants',
        UPDATE: (id: string) => `/api/applicants/${id}`,
        DELETE: (id: string) => `/api/applicants/${id}`,
    },
    INTERVIEWS: {
        GET_ALL: '/api/interviews',
        GET_BY_ID: (id: string) => `/api/interviews/${id}`,
        SCHEDULE: '/api/interviews',
        UPDATE: (id: string) => `/api/interviews/${id}`,
        CANCEL: (id: string) => `/api/interviews/${id}`,
    },
    ANALYTICS: {
        GET_STATS: '/api/analytics/stats',
        GET_REPORTS: '/api/analytics/reports',
    },
};