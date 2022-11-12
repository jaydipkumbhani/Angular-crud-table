import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {
  
  title: string;
  msg: any = [];

  constructor(private userservice: UserService) { }

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
}