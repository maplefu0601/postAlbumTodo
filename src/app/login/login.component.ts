import { environment } from './../../environments/environment';
import { User } from './../user';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  defaultEmail = environment.DefaultEmail;
  email: string = this.defaultEmail;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    
  }

  getUser(email): void {
    this.loginService.authenticate()
      .subscribe((user:User)=> {
        if(user.email === email) {
          this.loginService.login();
          this.loginService.setUserInfo(user);
        }
      });
  }

  logout(): void {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

}
