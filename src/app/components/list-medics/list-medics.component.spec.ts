import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicsComponent } from './list-medics.component';




describe('ListMedicsComponent', () => {
  let component: ListMedicsComponent;
  let fixture: ComponentFixture<ListMedicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMedicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMedicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
