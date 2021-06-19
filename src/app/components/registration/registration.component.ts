import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

registrationForm= new FormGroup(
  {
    userName: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  }
);

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private ngZone: NgZone,
  private apiService: ApiService
) {
  this.mainForm();
}


get myForm() {
  return this.createForm.controls;
}

submitted = false;

createForm: FormGroup;

ngOnInit(): void {
}

mainForm() {
  this.createForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  });
}

onSubmit() {
  this.submitted = true;
  if (!this.createForm.valid) {
    alert("Sikertelen regisztráció!");
    return false;
  } else {
    this.apiService.createUser(this.createForm.value).subscribe(
      (res) => {
        alert("Sikeres regisztráció!");
        this.ngZone.run(() => this.router.navigateByUrl('/login'));
      }, (error) => {
        console.log(error);
      });
  }
}
}