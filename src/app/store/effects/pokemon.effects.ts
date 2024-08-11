import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../../pokemon.service';
import { loadPokemon, loadPokemonSuccess, loadPokemonFailure } from '../actions/pokemon.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PokemonEffects {
  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemon),
      mergeMap(({ limit, offset }) =>  // Destructure the parameters from the action
        this.pokemonService.getPokemonList(limit, offset).pipe(  // Pass them to the service
          map(pokemon => loadPokemonSuccess({ pokemon })),
          catchError(error => of(loadPokemonFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private pokemonService: PokemonService) {}
}
