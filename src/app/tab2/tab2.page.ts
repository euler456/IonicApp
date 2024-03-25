import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  count: number = 0;
  username: string = ''; // Property to store username entered by the user

  constructor(private router: Router) {}

  incrementCounter() {
    this.count++;
  }

  login() {
    this.incrementCounter();
    // Pass username to AccountPage by appending it to the route
    this.router.navigateByUrl(`/account/${this.username}`);
  }
}
