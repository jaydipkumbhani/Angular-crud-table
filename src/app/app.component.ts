import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail, UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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

