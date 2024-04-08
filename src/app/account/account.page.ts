import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username: string = '';
  email: string = '';
  address: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private storage: Storage) { }

  ngOnInit() {
    // Retrieve user information from storage
    this.storage.get('username').then((username) => {
      this.username = username;
    }).catch(error => {
      console.error('Error retrieving username from storage:', error);
    });

    // You can similarly retrieve other user information like email, address, etc. from storage
  }

  submitForm() {
    // Handle form submission here
    console.log('Form submitted');
    // You can perform validation and save/update user information
  }
}
