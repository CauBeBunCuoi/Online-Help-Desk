import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./faq.component').then(m => m.FAQComponent),
    data: {
      title: `FAQ`
    }
  }
];

