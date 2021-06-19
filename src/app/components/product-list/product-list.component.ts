import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import { User } from '../../models/user'
import { Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

Products: any=[];
user= new User();
username: string;
name: string;
email: string;

constructor(
  private router: Router,
  private apiService:ApiService
) {}

ngOnInit(): void {
  this.getUser();
  this.readProduct();
}

readProduct() {
  this.apiService.getProducts().subscribe((data) =>{
    this.Products=data;
  });
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

changeToId(index){
  let id=this.Products[index]._id;
  this.router.navigate(['/product-edit/:'+ id]);
}

toUserInformation(){
  this.router.navigate(['/user-information']);
}

toProductCreate(){
  this.router.navigate(['/product-create']);
}

delete(index) {
  let id=this.Products[index]._id;
  if(confirm("Biztosan törlöd?!")){
  this.apiService.deleteProduct(id).subscribe(() => {
    alert("Sikeresen töröltük!");
    this.readProduct();
  }, (err) => {
    alert(err.message);
    this.readProduct();
  });
  }
}
}


