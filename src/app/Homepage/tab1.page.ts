import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, ModalController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class HomePage implements OnInit {
  products: any[] = [];
  isFirstLaunch: boolean = false;
  map: any;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.checkFirstLaunch();
    this.loadGoogleMaps(() => {
      this.loadMapAsync();
    });  }

  loadGoogleMaps(callback: () => void) {
      // Create a script element for the Google Maps API
      const script = document.createElement('script');
      script.src = 'https://maps.google.com/maps/api/js?key=';
      script.onload = callback; 
      document.body.appendChild(script); 
  }
  
  loadMapAsync() {
      this.loadMap();
  }

  loadMap() {
    try {
      const mapOptions = {
        center: { lat: -27.555264, lng: 153.033519 },
        zoom: 12
      };
  
      this.map = new google.maps.Map(document.getElementById('map_canvas') as HTMLElement, mapOptions);
  
      const locations = [
        { lat: -27.555264, lng: 153.033519, title: 'Griffith University Nathan Campus', info: 'Information about Griffith University Nathan Campus' }
      ];
  
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: location.title
        });
  
        // Add click event listener to the marker
        marker.addListener('click', () => {
          // Navigate to PinInfoPage and pass the information
          this.navCtrl.navigateForward(`/pin-info/${location.title}/${location.info}`);
        });
      });
    } catch (error) {
      console.error('Error loading map:', error);
    }
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

  async checkFirstLaunch() {
    try {
      const isFirstLaunch = await this.storage.get('firstLaunch');
      if (isFirstLaunch === null) {
        // First launch, set isFirstLaunch to true
        this.isFirstLaunch = true;
        // Set firstLaunch to true
        await this.storage.set('firstLaunch', true);
        // Show the welcome modal
        this.presentWelcomeModal();
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
    }
  }

  async presentWelcomeModal() {
    const modal = await this.modalController.create({
      component: HomePage,
      backdropDismiss: false
    });
    await modal.present();
  }

  dismissWelcome() {
    this.isFirstLaunch = false;
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
