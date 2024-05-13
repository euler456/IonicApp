import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

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

  // Settings properties
  name: string = '';
  showNotifications: boolean = false;
  reminder: string = '';

  constructor(private storage: Storage, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
    });

    // Load values from storage
    this.loadSettings();
  }

  async loadSettings() {
    try {
      // Load settings from storage
      this.name = await this.storage.get('name') || '';
      this.showNotifications = await this.storage.get('showNotifications') || false;
      this.reminder = await this.storage.get('reminder') || '';
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async updateName() {
    try {
      await this.storage.set('name', this.name);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  async updateShowNotifications() {
    try {
      await this.storage.set('showNotifications', this.showNotifications);
    } catch (error) {
      console.error('Error updating showNotifications:', error);
    }
  }

  async updateReminder() {
    try {
      await this.storage.set('reminder', this.reminder);
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  }

  submitForm() {
    console.log('Form submitted');
    
  }
}
