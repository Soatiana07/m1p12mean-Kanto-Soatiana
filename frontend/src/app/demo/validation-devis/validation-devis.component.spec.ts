import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDevisComponent } from './validation-devis.component';

describe('ValidationDevisComponent', () => {
  let component: ValidationDevisComponent;
  let fixture: ComponentFixture<ValidationDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
