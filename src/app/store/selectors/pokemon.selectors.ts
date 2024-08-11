import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from '../reducers/pokemon.reducer';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectAllPokemon = createSelector(selectPokemonState, (state) => state.pokemon);
export const selectPokemonLoading = createSelector(selectPokemonState, (state) => state.loading);
export const selectPokemonError = createSelector(selectPokemonState, (state) => state.error);
