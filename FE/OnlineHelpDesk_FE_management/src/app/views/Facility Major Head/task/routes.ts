import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'My Tasks'
    },
    children: [
      {
        path: '',
        redirectTo: 'service_requests',
        pathMatch: 'full'
      },
      {
        path: 'task_assignments',
        loadComponent: () => import('./task-assignments/task-assignments.component').then(m => m.TaskAssignmentsComponent),
        data: {
          title: 'Task Assignments'
        }
      },
      {
        path: 'service_requests',
        loadComponent: () => import('./service-requests/service-requests.component').then(m => m.ServiceRequestsComponent),
        data: {
          title: 'Service Requests'
        }
      },
      {
        path: 'blacklist_requests',
        loadComponent: () => import('./blacklist-requests/blacklist-requests.component').then(m => m.BlacklistRequestsComponent),
        data: {
          title: 'BlackList Requests'
        }
      }
    ]
  }
];


