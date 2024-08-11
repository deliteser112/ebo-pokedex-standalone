import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
      { path: 'pokemon-list', component: PokemonListComponent },
      { path: 'pokemon/:id', component: PokemonDetailComponent }
    ]
  }
];
