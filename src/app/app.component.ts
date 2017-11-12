import { environment } from './../environments/environment';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService, private router: Router) {};
  title = 'app';
  userInfo = this.loginService.getUserInfo();

  logout(): void {
    this.loginService.logout();
    this.userInfo = null;
    this.router.navigate(['/login'], {});
  }

  isLoggedIn(): boolean {
    this.userInfo = this.loginService.getUserInfo();
    
    return this.loginService.isLoggedIn();
  }
}
