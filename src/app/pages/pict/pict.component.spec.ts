import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictComponent } from './pict.component';

describe('PictComponent', () => {
  let component: PictComponent;
  let fixture: ComponentFixture<PictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
