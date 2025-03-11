import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LogonComponent } from './pages/logon/logon.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent, canActivate: [AuthGuard]
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
