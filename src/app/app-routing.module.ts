import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AfterSuccessLogin } from './components/afterlogin/afterlogin.component';
import { UserInformationComponent } from './components/user-information/user-information.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'login'},
  {path: 'product-create', component:ProductCreateComponent},
  {path: 'product-edit/:id', component:ProductEditComponent},
  {path: 'product-list', component:ProductListComponent},
  {path: 'afterlogin', component:AfterSuccessLogin},
  {path: 'login', component:LoginComponent},
  {path: 'user-information', component:UserInformationComponent},
  {path: 'registration', component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
