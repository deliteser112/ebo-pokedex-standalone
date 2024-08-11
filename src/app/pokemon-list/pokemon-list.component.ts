import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { SortService } from '../sort.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, RouterModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonService], // Ensure service is provided
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  isLoading = true;
  skeletonArray = Array(20);
  limit = 20;
  offset = 0;
  count = 0;
  Math = Math;

  constructor(
    private pokemonService: PokemonService,
    private sortService: SortService
  ) { }

  ngOnInit(): void {
    this.sortService.sortOption$.subscribe((sortOption) => {
      this.sortPokemonList(sortOption);
    });

    this.sortService.searchQuery$.subscribe((query) => {
      this.filterPokemonList(query);
    });

    this.loadPokemon();
  }

  loadPokemon(): void {
    this.isLoading = true;
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe((response) => {
      this.count = response.count;
      this.pokemonList = response.results.map((pokemon: { name: string; url: string }) => {
        const id = pokemon.url.split('/').filter((part) => part).pop();
        return {
          name: pokemon.name,
          url: pokemon.url,
          id: Number(id),
          image: '',
          gameIndex: 0,
          baseExperience: 0,
          height: 0,
          weight: 0,
          types: [],
          abilities: [],
        };
      });

      this.pokemonList.forEach((pokemon) => {
        this.pokemonService.getPokemonDetails(pokemon.id).subscribe((details) => {
          pokemon.image = details.sprites.front_default;
          pokemon.gameIndex = details.game_indices[0]?.game_index || 0;
          pokemon.baseExperience = details.base_experience;
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.types = details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type);
          pokemon.abilities = details.abilities.map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability);
        });
      });

      this.sortPokemonList(this.sortService.getSortOption());
      this.filterPokemonList(this.sortService.getSearchQuery());
      this.isLoading = false;
    });
  }

  sortPokemonList(sortOption: string) {
    if (sortOption === 'default') {
      this.filteredPokemonList = this.pokemonList;
    } else if (sortOption === 'pokedex') {
      this.filteredPokemonList = [...this.pokemonList].sort((a, b) => a.gameIndex - b.gameIndex);
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
      this.loadPokemon();
    }
  }

  onPreviousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadPokemon();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.limit);
  }
}
