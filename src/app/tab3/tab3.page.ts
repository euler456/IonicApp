import { Component, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import Chart, { ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  chartInstance: Chart<'pie', number[], unknown> | undefined;
  @ViewChild('pieChart') pieChart!: ElementRef;
  cart: any[] = [];
  totalPrice: number = 0;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    try {
      await this.storage.create();
      const storedCart = await this.storage.get('cart');
      if (storedCart) {
        this.cart = storedCart.map((item: any) => ({ ...item, selected: false }));
        this.calculateTotalPrice();
        this.createPieChart();
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, item) => total + (item.selected ? item.price * item.quantity : 0), 0);
  }

  createPieChart() {
    const selectedItems = this.cart.filter(item => item.selected);
    const labels = selectedItems.map(item => item.name);
    const prices = selectedItems.map(item => (item.price * item.quantity / this.totalPrice) * 100);

    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    // Destroy existing chart instance if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context');
      return;
    }

    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price Percentage',
          data: prices,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Price Percentage for Selected Products'
          }
        }
      }
    });
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
  updateChart() {
    console.log('updateChart() method called');
    this.calculateTotalPrice();
    this.createPieChart();
  }
}
