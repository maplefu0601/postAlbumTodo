import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  private baseUrl: string = environment.JsonPlaceHolder;
  private todosUrl: string = this.baseUrl + 'todos';
  constructor(private http: HttpClient) { }


  getTodos () {
    return this.http.get(this.todosUrl)
      .pipe(
        catchError(this.handleError('get user',[]))
      );
  }

  getTodosObs(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(error);
      console.log('failed: ', error.message);

      return of(result as T);
    }
  }
}
