import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarySearchComponent } from './beneficiary-search.component';

describe('BeneficiarySearchComponent', () => {
  let component: BeneficiarySearchComponent;
  let fixture: ComponentFixture<BeneficiarySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
