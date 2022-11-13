import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-manage-user',
    templateUrl: 'user.component.html',
    styleUrls:['./user.component.css']
})

export class ManageUserComponent implements OnInit {
  userForm = this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.email, Validators.required]],
    phone:['',Validators.required],
    address:['',Validators.required],
    city:['',Validators.required],
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit() { }
  onSubmit(){
    console.log(this.userForm.value);
    console.log(this.userForm);
  }

  get nameControl(){
    return this.userForm.get("name")
  }

  get emailControl(){
    console.log(this.userForm.get("email"))
    return this.userForm.get("email")
  }

  get addressControl(){
    return this.userForm.get("address")
  }

  get phoneControl(){
    return this.userForm.get('phone')
  }

  get cityControl(){
    return this.userForm.get("city")
  }
}