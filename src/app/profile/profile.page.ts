import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';
  email: string = '';
  address: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor() { }

  ngOnInit() {
    // Fetch user profile data here and assign to variables like username, email, address, etc.
  }

  updateProfile() {
    // Implement the logic to update the user's profile
    console.log("Username: ", this.username);
    console.log("Email: ", this.email);
    console.log("Address: ", this.address);
    console.log("New Password: ", this.newPassword);
    console.log("Confirm Password: ", this.confirmPassword);
    // You can send this data to your backend API for updating the user's profile
  }
}
