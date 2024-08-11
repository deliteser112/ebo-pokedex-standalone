import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

// Update the loadPokemon action to accept limit and offset
export const loadPokemon = createAction(
  '[Pokemon] Load Pokemon',
  props<{ limit: number; offset: number }>()  // Accepts limit and offset
);

export const loadPokemonSuccess = createAction(
  '[Pokemon] Load Pokemon Success',
  props<{ pokemon: Pokemon[] }>()
);

export const loadPokemonFailure = createAction(
  '[Pokemon] Load Pokemon Failure',
  props<{ error: any }>()
);
