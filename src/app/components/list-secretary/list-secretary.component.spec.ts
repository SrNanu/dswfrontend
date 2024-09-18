import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSecretarysComponent } from './list-secretary.component';

describe('ListSecretarysComponent', () => {
  let component: ListSecretarysComponent;
  let fixture: ComponentFixture<ListSecretarysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSecretarysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSecretarysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
