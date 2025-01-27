import { Routes } from "@angular/router"

export const ROUTES_AUTH: Routes = [
    {
      path: '',
      loadComponent: () => import("./pages/login/login.component").then(x => x.LoginComponent)
    },
  ]