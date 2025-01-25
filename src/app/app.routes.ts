import { Routes } from '@angular/router'
import { ApiRoutes } from './shared/enums/routes'
import { AuthGuard } from './core/auth/guards/auth.guard'

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'welcome', 
        pathMatch: 'full' 
    },
    {  
        path: ApiRoutes.LOGIN, 
        loadChildren: () => import('./core/auth/auth.routes').then((c) => c.ROUTES_AUTH) 
    },
    {  
        path: ApiRoutes.WELCOME,
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/welcome/welcome.routes').then((c) => c.ROUTES_WELCOME) 
    },
    {  
        path: ApiRoutes.USERS,
        loadChildren: () => import('./features/users/users.routes').then((c) => c.ROUTES_USERS) 
    },
]

