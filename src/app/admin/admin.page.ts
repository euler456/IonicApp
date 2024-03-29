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
  imagePreview: string=''; // Variable to store image preview URL

  products: any[] = [];

  constructor() { }

  createProduct() {
    const newProduct = {
      name: this.productName,
      id: this.productID,
      description: this.productDescription,
      price: this.price,
      image: this.imagePreview // Assign image preview URL to product
    };

    this.products.push(newProduct);

    console.log('New Product:', newProduct);

    // Reset form fields and image preview
    this.resetForm();
  }

  editProduct(product: any) {
    // Populate form fields with selected product's details for editing
    this.productName = product.name;
    this.productID = product.id;
    this.productDescription = product.description;
    this.price = product.price;
    this.imagePreview = product.image; // Display image preview of the selected product
  }

  deleteProduct(productID: string) {
    // Find index of product with given productID
    const index = this.products.findIndex(product => product.id === productID);

    if (index !== -1) {
      // If product with given productID exists, remove it from the array
      this.products.splice(index, 1);
    }
  }

  onFileChange(event: any) {
    // Get selected file
    const file = event.target.files[0];

    if (file) {
      // Read file as data URL for image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  private resetForm() {
    // Reset form fields and image preview
    this.productName = '';
    this.productID = '';
    this.productDescription = '';
    this.price = 0;
    this.imagePreview = '';
  }
}
