import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { ManageUserComponent } from '../manage/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

  title: string;
  p: any;
  msg: any = [];

  searchForm = this.fb.group({
    search: ['', Validators.required],
  });

  selectedUser = null;

  constructor(private userservice: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.setTitle();
    this.getUserList();
  }

  setTitle() {
    this.title = this.userservice.title;
  }

  getUserList() {
    this.userservice.getUserList().subscribe((data) => {
      this.msg = data;
      console.log(data)
    });
  }


  onDelete(i: number) {
    this.userservice.deleteUser(i)
    console.log(i)
  }

  onSearch() {
    console.log("a", this.searchForm.value);
    const text = this.searchForm.value?.search;

    if (text) {
      this.msg = this.userservice.filterUserByText(text);
    }
  }

  onEdit(user: any) {
    this.selectedUser = user;
  }

  onAdd() {
    this.router.navigate(['./add-user'], { relativeTo: this.route });
  }
}