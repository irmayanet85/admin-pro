import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarImgComponent } from './cargar-img.component';

describe('CargarImgComponent', () => {
  let component: CargarImgComponent;
  let fixture: ComponentFixture<CargarImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
