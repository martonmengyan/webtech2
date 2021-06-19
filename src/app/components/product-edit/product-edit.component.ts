import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

user= new User();
username: string;
email: string;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private ngZone: NgZone,
  private apiService: ApiService
) {
  this.mainForm();
  this.getUser();
}

get myForm() {
  return this.createForm.controls;
}

submitted = false;

createForm: FormGroup;

ngOnInit() {
}

mainForm() {
  this.createForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    cost: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  });
}

onSubmit() {
  this.submitted = true;
  if (!this.createForm.valid) {
    return false;
  } else {
    let id= this.router.url.toString();
    id=id.replace('/product-edit/:','');
    if(confirm("Biztosan frissíted?!")){
    this.apiService.updateProduct(id,this.createForm.value).subscribe(
      (res) => {
        console.log('Product updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/product-list'));
      }, (error) => {
        console.log(error);
      });
    }
  }
}

getUser(){
  if (this.apiService.getCurrentuser().userName== null){
    this.router.navigate(['/login']);
  }
  this.user=this.apiService.getCurrentuser();
  this.username= JSON.stringify(this.user.userName)
  this.email= JSON.stringify(this.user.email)
}

logout(){
  this.user= new User()
  this.apiService.setCurrentuser(this.user);
  this.router.navigate(['/login']);
}

toUserInformation(){
  this.router.navigate(['/user-information']);
}

toProductList(){
  this.router.navigate(['/product-list']);
}
}
