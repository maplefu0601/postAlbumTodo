import { OnlyLoggedInUserGuard } from './login-guard';
import { TodosComponent } from './todos/todos.component';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';

const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'albums', component: AlbumsComponent, canActivate: [OnlyLoggedInUserGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [OnlyLoggedInUserGuard] },
  { path: 'todos', component: TodosComponent, canActivate: [OnlyLoggedInUserGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
