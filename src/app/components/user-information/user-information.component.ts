import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

Products: any=[];
user= new User();
username: string;
password: string;
name: string;
email: string;

on: boolean = true;

constructor(
  private router: Router,
  private apiService:ApiService
) {}

ngOnInit(): void {
  this.getUser();
}

getUser(){
  if (this.apiService.getCurrentuser().userName== null){
    this.router.navigate(['/login']);
  }
  this.user=this.apiService.getCurrentuser();
  this.username= JSON.stringify(this.user.userName)
  this.email= JSON.stringify(this.user.email)
  this.password= JSON.stringify(this.user.password)
}

logout(){
  this.user= new User()
  this.apiService.setCurrentuser(this.user);
  this.router.navigate(['/login']);
}

toProductList(){
  this.router.navigate(['/product-list']);
}

displayPassword() {
  if(this.on){
  document.getElementById("secret").innerHTML = this.password;
  this.on=false;
  }
  else {
    document.getElementById("secret").innerHTML = "****";
    this.on=true;
  }
}
}