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
        path: 'campus_members',
        loadComponent: () => import('./campus-members/campus-members.component').then(m => m.CampusMembersComponent),
        data: {
          title: 'Campus Members'
        }
      }
    ]
  }
];


