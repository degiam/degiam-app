import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { GlobalService } from '@/services/global.service';
import { LoadingService } from '@/services/loading.service';
import { SwipeService } from '@/services/swipe.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, CommonModule, RouterTestingModule],
      providers: [
        { provide: GlobalService, useValue: { getConfigLocalStorage: () => 'theme' } },
        { provide: LoadingService, useValue: { setLoadingStatus: () => {} } },
        { provide: SwipeService, useValue: { navigateOnSwipeLeft: () => {}, navigateOnSwipeRight: () => {} } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
