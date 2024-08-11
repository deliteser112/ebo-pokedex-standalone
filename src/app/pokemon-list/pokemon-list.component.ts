// src/app/pokemon-list/pokemon-list.component.ts
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
  sortedPokemonList: any[] = [];
  sortOption: string = 'default';
  isLoading = true;
  skeletonArray = Array(12); // Adjust the number based on the grid size

  constructor(private pokemonService: PokemonService, private sortService: SortService) {}

  ngOnInit(): void {
    this.sortService.sortOption$.subscribe((sortOption) => {
      this.sortOption = sortOption;
      this.sortPokemonList();
    });

    this.pokemonService.getPokemonList().subscribe((response) => {
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

      this.sortPokemonList();
      this.isLoading = false;
    });
  }

  sortPokemonList() {
    if (this.sortOption === 'default') {
      this.sortedPokemonList = this.pokemonList;
    } else if (this.sortOption === 'pokedex') {
      this.sortedPokemonList = [...this.pokemonList].sort((a, b) => a.gameIndex - b.gameIndex);
    }
  }
}
