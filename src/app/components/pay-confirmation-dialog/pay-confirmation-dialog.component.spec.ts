import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayConfirmationDialogComponent } from './pay-confirmation-dialog.component';

describe('PayConfirmationDialogComponent', () => {
  let component: PayConfirmationDialogComponent;
  let fixture: ComponentFixture<PayConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
