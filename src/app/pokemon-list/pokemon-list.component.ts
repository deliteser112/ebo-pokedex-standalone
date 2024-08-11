import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PokemonState } from '../store/reducers/pokemon.reducer';
import { loadPokemon } from '../store/actions/pokemon.actions';
import { selectAllPokemon, selectPokemonLoading } from '../store/selectors/pokemon.selectors';
import { SortService } from '../services/sort/sort.service';
import { PokemonService } from '../services/pokemon/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  isLoading = true;
  skeletonArray = Array(20);
  limit = 20;
  offset = 0;
  count = 0;
  Math = Math;
  currentPage = 1;  // Track the current page number

  constructor(
    private store: Store<PokemonState>,
    private sortService: SortService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.loadPokemonData();

    this.store.select(selectAllPokemon).subscribe((response: any) => {
      if (response && response.results) {
        this.count = response.count || 0; // Default to 0 if undefined
        this.pokemonList = response.results.map((pokemon: { name: string; url: string }) => {
          const id = pokemon.url.split('/').filter((part) => part).pop();
          return {
            id: Number(id),
            name: pokemon.name,
            sprites: {
              front_default: ''
            },
            game_indices: [],
            base_experience: 0,
            height: 0,
            weight: 0,
            types: [],
            abilities: []
          };
        });

        this.pokemonList.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon.id).subscribe((details: Pokemon) => {
            pokemon.sprites.front_default = details.sprites.front_default;
            pokemon.game_indices = details.game_indices || [];
            pokemon.base_experience = details.base_experience;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = details.types;
            pokemon.abilities = details.abilities;
          });
        });

        this.sortPokemonList(this.sortService.getSortOption());
        this.filterPokemonList(this.sortService.getSearchQuery());
        this.isLoading = false;
      } else {
        this.pokemonList = [];
        this.filteredPokemonList = [];
        this.isLoading = false;
      }
    });

    this.store.select(selectPokemonLoading).subscribe((loading) => {
      this.isLoading = loading;
    });

    this.sortService.sortOption$.subscribe((sortOption) => {
      this.sortPokemonList(sortOption);
    });

    this.sortService.searchQuery$.subscribe((query) => {
      this.filterPokemonList(query);
    });
  }
  loadPokemonData(): void {
    this.store.dispatch(loadPokemon({ limit: this.limit, offset: this.offset }));
  }

  sortPokemonList(sortOption: string) {
    if (sortOption === 'default') {
      this.filteredPokemonList = this.pokemonList;
    } else if (sortOption === 'pokedex') {
      this.filteredPokemonList = [...this.pokemonList].sort((a, b) => {
        const gameIndexA = a.game_indices?.[0]?.game_index ?? 0;
        const gameIndexB = b.game_indices?.[0]?.game_index ?? 0;
        return gameIndexA - gameIndexB;
      });
    }
  }

  filterPokemonList(query: string) {
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  onNextPage(): void {
    if (this.offset + this.limit < this.count) {
      this.offset += this.limit;
      this.currentPage++;
      this.loadPokemonData();
    }
  }

  onPreviousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.currentPage--;
      this.loadPokemonData();
    }
  }

  onPageNumberChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let page = Number(input.value);

    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.currentPage = page;
    this.offset = (this.currentPage - 1) * this.limit;
    this.loadPokemonData();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.limit);
  }
}
