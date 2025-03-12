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
        path: 'students',
        loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
        data: {
          title: 'Students'
        }
      }
    ]
  }
];


