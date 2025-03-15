import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LogonComponent } from './pages/logon/logon.component';
import { FacilityMajorDetailComponent } from './pages/facility-major-detail/facility-major-detail.component';
import { FacilityMajorComponent } from './pages/facility-major/facility-major.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
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
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'logon',
        component: LogonComponent,
    },
];
