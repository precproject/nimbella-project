import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreComponent } from './update-store.component';

describe('UpdateStoreComponent', () => {
  let component: UpdateStoreComponent;
  let fixture: ComponentFixture<UpdateStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
