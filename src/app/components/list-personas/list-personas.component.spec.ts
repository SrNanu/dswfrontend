import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonasComponent } from './list-personas.component';

describe('ListPersonasComponent', () => {
  let component: ListPersonasComponent;
  let fixture: ComponentFixture<ListPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPersonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
