import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    // data: {
    //   title: 'Campus Manager'
    // },
    children: [
      // Campus Manager
      // {
      //   path: '',
      //   redirectTo: 'facility_campus',
      //   pathMatch: 'full'
      // },
      {
        path: 'accounts_campus',
        loadChildren: () => import('./views/Campus Manager/account/routes').then((m) => m.routes)
      },
      {
        path: 'facility_campus',
        loadChildren: () => import('./views/Campus Manager/facility/routes').then((m) => m.routes)
      },
      {
        path: 'majors_campus',  
        loadChildren: () => import('./views/Campus Manager/major/routes').then((m) => m.routes)
      },
      {
        path: 'faq_campus',  
        loadChildren: () => import('./views/Campus Manager/faq/routes').then((m) => m.routes)
      },
      

      // Facility Major Head
      {
        path: 'account_major',
        loadChildren: () => import('./views/Facility Major Head/account/routes').then((m) => m.routes)
      },
      {
        path: 'my_majors',
        loadChildren: () => import('./views/Facility Major Head/major/routes').then((m) => m.routes)
      },
      {
        path: 'task_major',
        loadChildren: () => import('./views/Facility Major Head/task/routes').then((m) => m.routes)
      },

      // Assignee
      {
        path: 'task_assignee',
        loadChildren: () => import('./views/Assignee/task/routes').then((m) => m.routes)
      }
    ]
  },
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   data: {
  //     title: 'Homeee'
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () => import('./views/coreUi views/dashboard/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'theme',
  //       loadChildren: () => import('./views/coreUi views/theme/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'base',
  //       loadChildren: () => import('./views/coreUi views/base/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'buttons',
  //       loadChildren: () => import('./views/coreUi views/buttons/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'forms',
  //       loadChildren: () => import('./views/coreUi views/forms/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'icons',
  //       loadChildren: () => import('./views/coreUi views/icons/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'notifications',
  //       loadChildren: () => import('./views/coreUi views/notifications/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'widgets',
  //       loadChildren: () => import('./views/coreUi views/widgets/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'charts',
  //       loadChildren: () => import('./views/coreUi views/charts/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'pages',
  //       loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
  //     }
  //   ]
  // },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
