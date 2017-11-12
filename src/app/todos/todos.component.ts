
import { TodoService } from './../todo.service';
import { Todo } from './../todo';

import {Component, AfterViewInit, AfterContentInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

/**
 * @title Table retrieving todo data through HTTP
 */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements AfterContentInit  {

  todosList = [];
  displayedColumns = ['Completed','title'];
  todoDatabase: TodoDao | null;
  dataSource = new MatTableDataSource();
  filterChange = new BehaviorSubject<boolean>(false);

  resultsLength = 0;
  showCompleted = false;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private todoService: TodoService) {}

  applyFilter(completed: boolean): void {
    //if filter changed, set page index to 0
    this.showCompleted = completed;
    this.paginator.pageIndex = 0;
    this.filterChange.next(completed);
  }

  getFilteredData(data): Todo[] {
  
    if(this.showCompleted) {
      return data;
    }
    return data.filter((item:Todo)=>{
      return item.completed !== true;
    });
  }

  ngAfterContentInit () {
    this.todoDatabase = new TodoDao(this.todoService);

    // If the user changes the sort order, reset back to the first page.
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    Observable.merge( this.paginator.page, this.filterChange)
        .startWith(null)
        .switchMap(() => {
          this.isLoadingResults = true;
          return this.todoDatabase!.getTodoObs();
        })
        .map(data => {
          console.log('something changed:', this.filterChange);
          this.isLoadingResults = false;
          
          this.todosList = data;
          return data;
        })
        .catch((err) => {
          console.log('error',err);
          this.isLoadingResults = false;
          return Observable.of([]);
        })
        .subscribe((data) => {

          this.dataSource.data = this.getFilteredData(data);
          
          this.resultsLength = this.dataSource.data.length;
          let startIndex = this.paginator.pageIndex*this.paginator.pageSize;
          this.dataSource.data = this.dataSource.data.slice(
            startIndex, 
            this.paginator.pageSize + startIndex
          );
          
        });
  }
}

/**
 * get observable to do list from server
 */
export class TodoDao {
  constructor(private todoService: TodoService) {}

  getTodoObs(): Observable<Todo[]> {
    return this.todoService.getTodosObs();
  }
}
