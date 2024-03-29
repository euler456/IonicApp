import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  productName: string = '';
  productID: string = '';
  productDescription: string = '';
  price: number = 0;

  products: any[] = [];

  constructor() { }

  createProduct() {
    const newProduct = {
      name: this.productName,
      id: this.productID,
      description: this.productDescription,
      price: this.price
    };

    // Check if a product with the same productID already exists
    const existingProductIndex = this.products.findIndex(product => product.id === this.productID);

    if (existingProductIndex !== -1) {
      // If product with the same productID exists, replace it with the new product
      this.products.splice(existingProductIndex, 1, newProduct);
    } else {
      // If product with the same productID doesn't exist, add the new product
      this.products.push(newProduct);
    }

    console.log('New Product:', newProduct);

    // Reset form fields
    this.resetForm();
  }

  editProduct(product: any) {
    // Populate form fields with selected product's details for editing
    this.productName = product.name;
    this.productID = product.id;
    this.productDescription = product.description;
    this.price = product.price;
  }

  deleteProduct(productID: string) {
    // Find index of product with given productID
    const index = this.products.findIndex(product => product.id === productID);
  
    if (index !== -1) {
      // If product with given productID exists, remove it from the array
      this.products.splice(index, 1);
    }
  }  

  private resetForm() {
    // Reset form fields
    this.productName = '';
    this.productID = '';
    this.productDescription = '';
    this.price = 0;
  }
}
