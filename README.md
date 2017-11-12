# PostAlbumTodo

This project is to show Posts, Albums and Todos from free json server jsonplaceholder using Angular 4/5 and Angular Material Design. The mock JSON API was provided by: `https://jsonplaceholder.typicode.com/ `

## Development server

Run `npm install` and `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If it cannot find Material Module, run the following command.
`npm install --save @angular/material @angular/cdk`
`npm install --save @angular/animations`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Login

Here used email `Sincere@april.biz` as user to login to jsonplaceholder.

## Thoughts

1. `Router Guards`. The user can see the dashboard page only after login. The most typical use case for the `CanActivate` guard is some form of checking to see if the user has permissions to view a page. Normally in a Angular application we would have a service which held whether or not the current user is logged in or what permissions they have.
```
@Injectable()
class LoggedInUsersGuard implements CanActivate { 
  constructor(private loginService: LoginService) {}; 

  canActivate() {
    
    if (this.LoginService.isLoggedIn()) { 
      return true;
    } else {
      window.alert("You should login to view this page"); 
      return false;
    }
  }
}
```
2. `Observable`. According to Angular tutorial HeroService documentation, normally when we are fetching data using service, we must have an asynchronous signaure of some kind. In this project, I used an Observable in part because it will eventually use the Angular HttpClient.get mothod to fetch the todos and HttpClient.get() returns an Observable.
```
getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
}
```

3. `BehaviorSubject`. Here I used BehaviorSubject to monitor the value of checkbox changed.
```
Observable.merge( this.paginator.page, this.filterChange)
    .switchMap()
    .map((data)=>{getFilteredData(data);})
    .map(data)
    .subscribe((data)=>{this.dataSource.data = data; });
```

4. `DataSource` or `Dao` for Material Table. I was supposed to get todo list data using TodoDataSource which was extended from DataSource, but finally I found using Dao to return data and observe the events of paging index and checkbox changing is much easier.
```
export class TodoDao {
  constructor(private todoService: TodoService) {}

  getTodoObs(): Observable<Todo[]> {
    return this.todoService.getTodosObs();
  }
}
```
5. The Todo List checkboxes are not disabled. It could be clicked and set status to completed. Not required.

6. `Posts` and `Albums` will finish later.

7. Test script is not required.

![](./src/assets/demo.png)
