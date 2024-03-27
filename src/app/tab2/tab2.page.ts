import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  count: number = 0;
  username: string = ''; // Property to store username entered by the user

  constructor(private router: Router, private storage: Storage) {
    // Initialize the database
    this.storage.create().then(() => {
      console.log('Database initialized');
    }).catch(error => {
      console.error('Error initializing database:', error);
    });
  }

  incrementCounter() {
    this.count++;
  }

  login() {
    this.incrementCounter();
    // Save username in storage
    this.storage.set('username', this.username).then(() => {
      // Navigate to AccountPage
      this.router.navigateByUrl('/tabs/account');
    }).catch(error => {
      console.error('Error saving username to storage:', error);
    });
  }
}
