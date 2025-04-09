import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Campus Facilities'
    },
    children: [
      {
        path: '',
        redirectTo: 'facilities',
        pathMatch: 'full'
      },
      {
        path: 'facilities',
        loadComponent: () => import('./facility-list/facility-list.component').then(m => m.FacilityListComponent),
        data: {
          title: 'Facility List'
        }
      },
      {
        path: 'facility_items',
        loadComponent: () => import('./facility-items/facility-items.component').then(m => m.FacilityItemsComponent),
        data: {
          title: 'Facility Items'
        }
      }
    ]
  }
];


