import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  brandName = 'Company CRM';
  userName = 'Login with your account';
  today = new Date();

  constructor() {}

  ngOnInit(): void {}
}
