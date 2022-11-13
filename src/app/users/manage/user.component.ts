import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-manage-user',
    templateUrl: 'user.component.html',
    styleUrls:['user.component.css']
})

export class ManageUserComponent implements OnInit {
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('Sammy'),
      email: new FormControl(''),
      message: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }
}