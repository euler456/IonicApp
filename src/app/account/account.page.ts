import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username: string = '';

  constructor(private storage: Storage) { }

  ngOnInit() {
    // Retrieve username from storage
    this.storage.get('username').then((username) => {
      this.username = username;
    }).catch(error => {
      console.error('Error retrieving username from storage:', error);
    });
  }
}
