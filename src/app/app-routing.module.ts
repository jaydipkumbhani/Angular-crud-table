import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/list/user-list.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: '', pathMatch: 'full', redirectTo: '/user-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
