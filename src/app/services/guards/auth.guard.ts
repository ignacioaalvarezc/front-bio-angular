import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../login.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private loginService: LoginService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.loginService.isLoggedIn()) {
            const userType = this.loginService.getUserRole();

            switch (userType) {
                case 'ADMIN':
                    this.router.navigate(['/admin']);
                    break;
                case 'USER':
                    this.router.navigate(['/user-dashboard/user-welcome']);
                    break;
                case 'SUPERVISOR':
                default:
                    this.router.navigate(['/user-dashboard/user-welcome']);
                    break;
            }
            return false;
        }
        return true;
    }
}