import { createReducer, on } from '@ngrx/store';
import { loadPokemon, loadPokemonSuccess, loadPokemonFailure } from '../actions/pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';

export interface PokemonState {
  pokemon: Pokemon[];
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  pokemon: [],
  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemon, state => ({ ...state, loading: true })),
  on(loadPokemonSuccess, (state, { pokemon }) => ({ ...state, loading: false, pokemon })),
  on(loadPokemonFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
