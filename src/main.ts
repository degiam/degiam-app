import { bootstrapApplication } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { appConfig } from '@/app.config';
import { AppComponent } from '@/app.component';
import { routes } from '@/app.routes';

const platformApp = bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: 'AppConfig',
      useValue: appConfig
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideRouter(routes),
  ],
});

platformApp
  .catch((err) => console.error(err));