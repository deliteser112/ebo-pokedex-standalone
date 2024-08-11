import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, NgChartsModule], // Import NgChartsModule
})
export class PokemonDetailComponent implements OnInit {
  isLoading: boolean = true;
  pokemon: any;
  radarChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };
  radarChartLabels: string[] = [];
  radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Stats',
      },
    ],
  };
  radarChartType: ChartType = 'radar';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(+id).subscribe(
        (pokemon) => {
          this.pokemon = pokemon;
          this.isLoading = false;
          this.setupRadarChart();
        },
        (error) => {
          console.error('Error fetching Pokémon details', error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  setupRadarChart(): void {
    if (this.pokemon && this.pokemon.stats) {
      this.radarChartLabels = this.pokemon.stats.map(
        (stat: any) => stat.stat.name
      );
      this.radarChartData = {
        labels: this.radarChartLabels,
        datasets: [
          {
            data: this.pokemon.stats.map((stat: any) => stat.base_stat),
            label: 'Stats',
          },
        ],
      };
    }
  }

  goBack(): void {
    this.router.navigate(['/pokemon-list']);
  }
}
