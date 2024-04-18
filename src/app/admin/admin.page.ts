import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
  imagePreview: string = '';
  creationTime: string = '';
  showModal: boolean = false;
  products: any[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create(); 
    this.loadProducts(); 
  }

  async deleteProduct(productID: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            const index = this.products.findIndex(product => product.id === productID);
            if (index !== -1) {
              this.products.splice(index, 1);
              this.saveProducts();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  createProduct() {
    const existingProductIndex = this.products.findIndex(product => product.id === this.productID);
    if (existingProductIndex !== -1) {
      // If product with the same ID already exists, update its data
      this.products[existingProductIndex].name = this.productName;
      this.products[existingProductIndex].description = this.productDescription;
      this.products[existingProductIndex].price = this.price;
      this.products[existingProductIndex].image = this.imagePreview;
      this.products[existingProductIndex].creationTime = this.creationTime;
    } else {
      // If product with the same ID doesn't exist, create a new product
      const newProduct = {
        name: this.productName,
        id: this.productID,
        description: this.productDescription,
        price: this.price,
        image: this.imagePreview,
        creationTime: this.creationTime
      };
      this.products.push(newProduct);
    }

    this.saveProducts(); // Save updated products
    this.resetForm();
  }

  editProduct(product: any) {
    // Populate form fields with selected product's details for editing
    this.productName = product.name;
    this.productID = product.id;
    this.productDescription = product.description;
    this.price = product.price;
    this.imagePreview = product.image; // Display image preview of the selected product
    this.creationTime = product.creationTime; // Display creation time of the selected product
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

  private async loadProducts() {
    // Retrieve products from storage
    const storedProducts = await this.storage.get('products');
    if (storedProducts) {
      this.products = storedProducts;
    }
  }

  private saveProducts() {
    // Save products into storage
    this.storage.set('products', this.products);
  }

  async closeModal() {
    this.showModal = false;
  }

  async confirmDelete() {
    this.showModal = false;
  }

  private resetForm() {
    // Reset form fields and image preview
    this.productName = '';
    this.productID = '';
    this.productDescription = '';
    this.price = 0;
    this.imagePreview = '';
    this.creationTime = '';
  }
}
