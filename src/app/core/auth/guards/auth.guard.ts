import { inject, Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router"
import { StorageService } from "../pages/login/services/storage.service"
import { AuthService } from "../pages/login/services/auth.service"
import { ApiRoutes } from "../../../shared/enums/routes"

@Injectable({ providedIn: 'root' })
export class JwtTokenService {
    private readonly authService = inject(AuthService)
    private readonly storageService = inject(StorageService)
    private readonly router = inject(Router)

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const isLoggedIn = this.storageService.isLoggedIn()
        const urlWelcome = '/' + ApiRoutes.WELCOME
        const currentRoute = state.url

        if (currentRoute === urlWelcome) {
            if (!isLoggedIn) {
                this.router.navigate([ApiRoutes.LOGIN])
                return false
            }
            return true
        } else {
            if (!isLoggedIn) {
                return true
            } else {
                this.router.navigate([urlWelcome])
                return false
            }
        }
    }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(JwtTokenService).canActivate(route, state)
}