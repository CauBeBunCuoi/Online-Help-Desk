import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Campus Majors'
    },
    children: [
      {
        path: '',
        redirectTo: 'majors',
        pathMatch: 'full'
      },
      {
        path: 'majors',
        loadComponent: () => import('./major-list/major-list.component').then(m => m.MajorListComponent),
        data: {
          title: 'Major List'
        }
      },
      {
        path: 'task_assignments',
        loadComponent: () => import('./task-assignments/task-assignments.component').then(m => m.TaskAssignmentsComponent),
        data: {
          title: 'Task Assignments'
        }
      },
      {
        path: 'feedbacks',
        loadComponent: () => import('./feedbacks/feedbacks.component').then(m => m.FeedbacksComponent),
        data: {
          title: 'Feedbacks'
        }
      },
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
        data: {
          title: 'Reports'
        }
      }
    ]
  }
];


