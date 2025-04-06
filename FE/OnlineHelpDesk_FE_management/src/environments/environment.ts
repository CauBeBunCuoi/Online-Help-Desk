export const environment = {
  production: false,
  BASE_API_URL: 'https://9be9-14-186-89-198.ngrok-free.app',
  DOCKER_API_URL: 'https://a6a1-115-78-236-124.ngrok-free.app',
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
