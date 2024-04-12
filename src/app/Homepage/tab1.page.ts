import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class HomePage {
  products: any[] = [];

  constructor(private storage: Storage, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      await this.storage.create();
      const storedProducts = await this.storage.get('products');
      if (storedProducts) {
        this.products = storedProducts;
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  addToCart(product: any) {
    this.navCtrl.navigateForward('/tabs/tab3');
    this.storage.get('cart').then((cartItems: any[]) => {
      if (!cartItems) {
        cartItems = [];
      }
      const existingProduct = cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }
      this.storage.set('cart', cartItems);
    });
  }
}
