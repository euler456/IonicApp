import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage) {
    // Create the database on app initialization
    this.createDatabase();
  }

  async createDatabase() {
    try {
      // Create the database if it doesn't exist
      await this.storage.create();
    } catch (error) {
      console.error('Error creating database:', error);
    }
  }
}
