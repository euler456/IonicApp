import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cart: any[] = [];

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    try {
      await this.storage.create();
      const storedCart = await this.storage.get('cart');
      if (storedCart) {
        // Initialize 'selected' property for each item
        this.cart = storedCart.map((item: any) => ({ ...item, selected: false }));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.saveCart();
  }

  removeItem(item: any) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  saveCart() {
    this.storage.set('cart', this.cart);
  }
}
