export const environment = {
  production: false,
  BASE_API_URL : 'http://localhost:5080',
  // BASE_API_URL : 'http://localhost:5137'

  ROLES: {
    CAMPUS_MANAGER: {
      BASE_URL: '/facility_campus/facilities',
    },
    FACILITY_MAJOR_HEAD: {
      BASE_URL: '/my_majors/majors',
    },
    ASSIGNEE: {
      BASE_URL: '/task_assignee/service_requests',
    },
  },
};
