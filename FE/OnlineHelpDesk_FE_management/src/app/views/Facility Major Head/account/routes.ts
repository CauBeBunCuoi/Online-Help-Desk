import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Accounts'
    },
    children: [
      {
        path: '',
        redirectTo: 'staffs',
        pathMatch: 'full'
      },
      {
        path: 'staffs',
        loadComponent: () => import('./staffs/staffs.component').then(m => m.StaffsComponent),
        data: {
          title: 'Staffs'
        }
      },
      {
        path: 'requesters',
        loadComponent: () => import('./requesters/requesters.component').then(m => m.RequestersComponent),
        data: {
          title: 'Requesters'
        }
      }
    ]
  }
];


