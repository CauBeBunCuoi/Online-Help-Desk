import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/logon/login.component';
import { FacilityMajorDetailComponent } from './pages/facility-major-detail/facility-major-detail.component';
import { FacilityMajorComponent } from './pages/facility-major/facility-major.component';
import { ServiceMajorComponent } from './pages/service-major/service-major.component';
import { ServiceMajorDetailComponent } from './pages/service-major-detail/service-major-detail.component';
import { ServiceRequestsComponent } from './pages/service-requests/service-requests.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        data: { breadcrumb: 'Home' }
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'facility-major',
        component: FacilityMajorComponent,
    },
    {
        path: 'facility-major-detail/:id',
        component: FacilityMajorDetailComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'service-major',
        component: ServiceMajorComponent,
    },
    {
        path: 'service-major-detail/:id',
        component: ServiceMajorDetailComponent,
    },
    {
        path: 'service-request',
        component: ServiceRequestsComponent,
    },
];
