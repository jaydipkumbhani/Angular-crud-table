import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/list/user-list.component';
import { ManageUserComponent } from './users/manage/user.component';
import { ActivateGuard } from './activate.gaurd';

const routes: Routes = [
  {
    path: 'user-list', component: UserListComponent,
    children: [
      { path: 'add-user', component: ManageUserComponent, canActivate: [ActivateGuard] }
    ]
  },
  // { path: 'add-user', component: ManageUserComponent },
  { path: 'edit-user/:id', component: ManageUserComponent },
  { path: '', redirectTo: "user-list", pathMatch: "full" },
  { path: '**', redirectTo: "user-list" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
