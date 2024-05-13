import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pin-info',
  templateUrl: './pin-info.page.html',
  styleUrls: ['./pin-info.page.scss'],
})
export class PinInfoPage implements OnInit {
  title: string = ''; 
  info: string = ''; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve the information from the route parameters
    this.route.params.subscribe(params => {
      this.title = params['title'] || ''; // Initialize with an empty string if parameter is not provided
      this.info = params['info'] || ''; // Initialize with an empty string if parameter is not provided
    });
  }
}
