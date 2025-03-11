import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { metaReducers } from './store/metaReducers';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { rootReducers } from './store/rootReducers';
import { AccountEffects } from './store/accounts/account.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideStore(
      rootReducers,
      { metaReducers }
    ),
    provideEffects(
      [
        AccountEffects,
      ]
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
