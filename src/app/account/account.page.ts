import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve username parameter from route
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }
}
