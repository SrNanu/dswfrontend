import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialtyComponent } from './list-specialty.component';

describe('ListSpecialtyComponent', () => {
  let component: ListSpecialtyComponent;
  let fixture: ComponentFixture<ListSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSpecialtyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
