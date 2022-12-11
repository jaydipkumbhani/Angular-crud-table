import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { UserListComponent } from '../list/user-list.component';

@Component({
    selector: 'app-manage-user',
    templateUrl: 'user.component.html',
    styleUrls:['./user.component.css']
})

export class ManageUserComponent implements OnInit, OnChanges {
  userForm = this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.email, Validators.required]],
    phone:['',Validators.required],
    street:['',Validators.required],
    city:['',Validators.required],
  });

  selectedUerId: number = 0;

  showErrorMessage:boolean=false;

  showUpdateButton: boolean = false;

  showForm: boolean = true;

  @Input() userData: any = null;

  constructor(
    private fb:FormBuilder, 
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private userservice: UserService
              ) { 
                // super()
               }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("current value: ", changes);
    if (changes && changes['userData'] && changes['userData'].currentValue) {
      this.setUserData(changes['userData'].currentValue);
      this.selectedUerId=changes['userData'].currentValue.id;
      this.showUpdateButton=true;
    }
  }

   ngOnInit() {
    if (this.userData) {
      this.setUserData(this.userData);
      console.log(this.userData)  
    }
    this.activatedRoute.params.subscribe((params) => {
      this.selectedUerId = params['id'];
      // console.log("selected user id is ", this.selectedUerId);
      let user = this.userservice.getUserById(this.selectedUerId);
      // console.log("user: ", user);
      if(user) {
        this.setUserData(user);
      } else if (this.selectedUerId) {
       this.showErrorMessage = true;
       this.showForm = false;
      }

      // if (this.selectedUerId) { // Edit
      //   if (user) {
      //     this.setUserData(user);
      //   } else {
      //     this.showErrorMessage = true;
      //     this.showForm = false;
      //   }
      // } else { // Add
      // }
    });
  }

  get nameControl(){
    return this.userForm.get("name")
  }
  
  get emailControl(){
    return this.userForm.get("email")
  }
  
  get streetControl(){
    return this.userForm.get("street")
  }
  
  get phoneControl(){
    return this.userForm.get('phone')
  }
  
  get cityControl(){
    return this.userForm.get("city")
  }

  onSubmit() {
    if(!this.userForm.valid) return;
    
    const data = this.userForm.value;
    console.log(data)
    let updatedData = {
      id: 0,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.street,
        city: data.city
      }
    }

    if (this.selectedUerId) { // Edit
      console.log(this.selectedUerId)
      updatedData['id'] = this.selectedUerId;
      this.editUser(updatedData);
      this.showUpdateButton=false;
      // console.log(this.selectedUerId)
      this.selectedUerId=0;
    } else { // Add
      this.addUser(updatedData);
      // this.userForm.reset()
      // this.showUpdateButton=false;
    }
    this.userForm.reset()
  }

 editUser(data: any) {
    this.userservice.editUser(data, this.selectedUerId);
    this.router.navigateByUrl('user-list');
  }

  addUser(data: any) {
    this.userservice.adduser(data);
    this.router.navigateByUrl('user-list');
  }
  
  setUserData(user: any) {
    console.log("user is -> ", user)
    this.userForm.controls['name'].patchValue (user.name);
    this.userForm.controls['email'].patchValue(user.email);
    this.userForm.controls['phone'].patchValue(user.phone);
    this.userForm.controls['city'].patchValue(user.address.city);
    this.userForm.controls['street'].patchValue(user.address.street);
  }

}