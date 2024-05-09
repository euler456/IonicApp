import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, ModalController } from '@ionic/angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class HomePage implements OnInit {
  products: any[] = [];
  isFirstLaunch: boolean = false;
  map: GoogleMap | undefined;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.checkFirstLaunch();
    this.loadMapAsync();
  }
  async loadMapAsync() {
    await this.loadMap(); 
  }
  async loadMap() {
    try {
      const mapOptions = {
        camera: {
          target: new LatLng(40.7128, -74.0060),
          zoom: 12,
        },
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      // Add pins representing locations
      const locations = [
        { lat: 40.7128, lng: -74.0060, title: 'New York City' },
        // Add more locations as needed
      ];

      locations.forEach((location) => {
        const markerOptions = {
          position: location,
          title: location.title,
        };

        this.map?.addMarker(markerOptions).then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            // Navigate to a different screen when a pin is clicked
            // You can implement this logic here
            console.log('Marker clicked:', location.title);
          });
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
