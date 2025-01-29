import { Routes } from '@angular/router'
import { ApiRoutes } from './shared/enums/routes'
import { AuthGuard } from './core/auth/guards/auth.guard'
import { inject } from '@angular/core'
import { StorageService } from './core/auth/pages/login/services/storage.service'

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'welcome', 
        pathMatch: 'full' 
    },
    {  
        path: ApiRoutes.LOGIN,
        canActivate: [()=> !inject(StorageService).isLoggedIn()],
        loadComponent: () => import('./core/auth/pages/login/login.component').then(x => x.LoginComponent)  
    },
    {  
        path: ApiRoutes.WELCOME,
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/welcome/components/welcome/welcome.component').then((c) => c.WelcomeComponent)
    },
    {  
        path: ApiRoutes.USERS,
        loadComponent: () => import('./features/users/components/users/users.component').then((c) => c.UsersComponent)  
    },
]

