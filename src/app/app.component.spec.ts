import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Title, Meta } from '@angular/platform-browser';
import { GlobalService } from '@/services/global.service';
import { LinkService } from '@/services/link.service';
import { AnalyticsService } from '@/services/analytics.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      providers: [
        Title,
        Meta,
        { 
          provide: GlobalService, 
          useValue: { 
            getConfigBrand: () => 'Brand', 
            getConfigDesc: () => 'Description', 
            getConfigUrl: () => 'https://example.com', 
            getConfigLang: () => 'en',
            getConfigLocalStorage: () => JSON.stringify({ theme: 'dark' })
          } 
        },
        { provide: LinkService, useValue: { setCanonicalLink: () => {} } },
        { provide: AnalyticsService, useValue: { sendPageView: () => {} } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
