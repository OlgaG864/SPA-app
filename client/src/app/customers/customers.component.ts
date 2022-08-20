import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Customer } from '../shared/types';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  showForm = false;
  number!: number;
  customer!: Customer;
  isEdit: boolean = false;

  customerForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
  });

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }

    this.apiService.addCustomer(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        alert(`customer added succesfully`);
        this.customerForm.reset();
        this.showForm = false;
      },
      error: (err) => console.log(err),
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete'),
    });
  }

  deleteCustomer(id: number) {
    this.apiService.deleteCustomer(id).subscribe((res) => {
      alert('Are you sure?');
      this.getCustomers();
    });
  }

  editCustomers(id: number, customer: Customer) {
    customer.isEdit = true;
    this.isEdit = !this.isEdit;
  }
  onUpdate(id: number, customer: Customer) {
    this.apiService.editCustomer(id, customer).subscribe((res) => {
      this.getCustomers();
    });
  }

  Logout() {
    this.authService.logout();
    this.router.navigate(['login-component']);
  }
}
