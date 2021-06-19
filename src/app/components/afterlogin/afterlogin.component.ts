import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ApiService} from 'src/app/service/api.service';
import { Router} from '@angular/router';
import { User } from '../../models/user'

@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})

export class AfterSuccessLogin implements OnInit {

user= new User();
username: string;
name: string;
email: string;

constructor(
    private router: Router,
    private apiService:ApiService
){}

ngOnInit(): void {
    this.getUser();
}

toProductList(){
    this.router.navigate(['/product-list']);
}

toRegistration(){
    this.router.navigate(['/registration']);
}

toUserInformation(){
    this.router.navigate(['/user-information']);
  }

logout(){
    this.user= new User()
    this.apiService.setCurrentuser(this.user);
    this.router.navigate(['/login']);
}

getUser(){

    if (this.apiService.getCurrentuser().userName== null){
      this.router.navigate(['/login']);
    }
    this.user=this.apiService.getCurrentuser();
    this.username= JSON.stringify(this.user.userName)
    this.email= JSON.stringify(this.user.email)
  }

}
  