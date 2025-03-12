import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'My Majors'
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
        path: 'services',
        loadComponent: () => import('./services/services.component').then(m => m.ServicesComponent),
        data: {
          title: 'Services'
        }
      },
      {
        path: 'feedbacks',
        loadComponent: () => import('./feedbacks/feedbacks.component').then(m => m.FeedbacksComponent),
        data: {
          title: 'SerFeedbacksvices'
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


