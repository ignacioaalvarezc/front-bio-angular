import { Injectable } from "@angular/core";
import { LoginService } from "../login.service";
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private loginService:LoginService,
                private router:Router) {

                }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
            if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN') {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        }
}