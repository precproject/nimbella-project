import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDeleteComponent } from './shop-delete.component';

describe('ShopDeleteComponent', () => {
  let component: ShopDeleteComponent;
  let fixture: ComponentFixture<ShopDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
