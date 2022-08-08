import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'signup-component', component: SignupComponent },
  { path: '', component: LoginComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'customers-component', component: CustomersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
