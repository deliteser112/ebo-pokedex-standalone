import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  isLoading: boolean = true;
  pokemon: any;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(+id).subscribe(pokemon => {
        this.pokemon = pokemon;
        this.isLoading = false;
      }, error => {
        console.error('Error fetching Pokémon details', error);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
