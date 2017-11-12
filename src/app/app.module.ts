import { OnlyLoggedInUserGuard } from './login-guard';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule}  from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { TodosComponent } from './todos/todos.component';
import { LoginComponent } from './login/login.component';
import { TodoService } from './todo.service';
import { LoginService } from './login.service';
import { AlbumsService } from './albums.service';
import { PostsService } from './posts.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    AlbumsComponent,
    TodosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, 
    BrowserAnimationsModule,MatProgressSpinnerModule
  ],
  providers: [TodoService, LoginService, AlbumsService, PostsService, OnlyLoggedInUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
