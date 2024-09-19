import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastComponent } from './shared/toast/toast.component';
import { JwtModule } from "@auth0/angular-jwt";
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";

export function tokenGetter() {
  return localStorage.getItem("token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    ToastComponent,
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["localhost:5004"]
          },
      }),
  ),
  provideHttpClient(
      withInterceptorsFromDi(),
      // withFetch()
  ),
  ]
};
