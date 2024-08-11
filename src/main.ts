import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { pokemonReducer } from './app/store/reducers/pokemon.reducer';
import { PokemonEffects } from './app/store/effects/pokemon.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Use the router from your working setup
    importProvidersFrom(HttpClientModule),  // Include HttpClientModule
    provideStore({ pokemon: pokemonReducer }),  // Add store
    provideEffects([PokemonEffects]),  // Add effects
    provideStoreDevtools(),  // Add store devtools
  ],
}).catch(err => console.error(err));
