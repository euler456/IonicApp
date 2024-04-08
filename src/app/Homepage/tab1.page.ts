import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class HomePage implements OnInit {
  products: any[] = [];

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      // Initialize Ionic Storage if not already initialized
      await this.storage.create();

      // Retrieve products from storage
      const storedProducts = await this.storage.get('products');
      if (storedProducts) {
        this.products = storedProducts;
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }
}
