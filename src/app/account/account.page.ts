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
    this.storage.get('username').then((username) => {
      this.username = username;
    }).catch(error => {
      console.error('Error retrieving username from storage:', error);
    });

  }

  submitForm() {
    console.log('Form submitted');
  }
}
