import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class OnlyLoggedInUserGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.isLoggedIn()) {
            return true;
        }
        window.alert('Please login first.');
        this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
        return false;
    }
}