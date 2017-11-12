
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  private userLoggedInText: string = environment.UserLoggedIn;
  private userInfoText: string = environment.UserInfo;
  private baseUrl: string = environment.JsonPlaceHolder;
  private userUrl: string = this.baseUrl + 'users/1';
  constructor(private http: HttpClient) { }


  authenticate () {
    return this.http.get(this.userUrl)
      .pipe(
        catchError(this.handleError('get user',[]))
      );
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem(this.userLoggedInText));
  }

  login(): void {
    localStorage.setItem(this.userLoggedInText, JSON.stringify(true));
  }

  logout(): void {
    localStorage.setItem(this.userLoggedInText, JSON.stringify(false));
  }

  setUserInfo(user): void {
    localStorage.setItem(this.userInfoText, JSON.stringify(user));
  }

  getUserInfo(): object {
    return JSON.parse(localStorage.getItem(this.userInfoText));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(error);
      console.log('failed: ', error.message);

      return of(result as T);
    }
  }
}
