import { Routes } from "@angular/router";

export const ROUTES_USERS: Routes = [
    {
      path: '',
      loadComponent: () => import("./components/users/users.component").then(x => x.UsersComponent)
    },
  ]