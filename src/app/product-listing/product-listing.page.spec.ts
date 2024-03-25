import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListingPage } from './product-listing.page';

describe('ProductListingPage', () => {
  let component: ProductListingPage;
  let fixture: ComponentFixture<ProductListingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
