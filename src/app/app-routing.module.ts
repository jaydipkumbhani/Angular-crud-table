import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/list/user-list.component';
import { ManageUserComponent } from './users/manage/user.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user', component: ManageUserComponent },
  { path: '', redirectTo: "user-list", pathMatch: "full" },
  { path: '**', redirectTo: "user-list" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
