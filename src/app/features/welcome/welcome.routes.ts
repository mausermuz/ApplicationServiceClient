import { Routes } from "@angular/router"

export const ROUTES_WELCOME: Routes = [
    {
      path: '',
      loadComponent: () => import("./components/welcome/welcome.component").then(x => x.WelcomeComponent)
    },
  ]