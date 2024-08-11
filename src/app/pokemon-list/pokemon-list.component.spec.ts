import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SortService } from '../sort.service';
import { PokemonService } from '../pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { selectAllPokemon, selectPokemonLoading } from '../store/selectors/pokemon.selectors';
import { of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let store: MockStore;
  let sortService: SortService;
  let initialState = {
    pokemon: {
      entities: {},
      loading: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        SortService,
        PokemonService,
      ],
      schemas: [NO_ERRORS_SCHEMA], // Avoids errors with unknown elements
    }).compileComponents();

    store = TestBed.inject(MockStore);
    sortService = TestBed.inject(SortService);
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display pokemon list', () => {
    const mockPokemon: Pokemon[] = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'image-url' },
        game_indices: [{ game_index: 1 }],
        base_experience: 64,
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    ];

    spyOn(store, 'select').and.callFake((selector) => {
      if (selector === selectAllPokemon) {
        return of({ results: mockPokemon });
      } else if (selector === selectPokemonLoading) {
        return of(false);
      }
      return of([]);
    });

    fixture.detectChanges();

    expect(component.pokemonList.length).toBe(1);
    expect(component.filteredPokemonList.length).toBe(1);
    expect(component.filteredPokemonList[0].name).toBe('bulbasaur');
  });

  it('should handle search input', () => {
    component.pokemonList = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'image-url' },
        game_indices: [{ game_index: 1 }],
        base_experience: 64,
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      },
    ];
    component.filterPokemonList('bulba');
    expect(component.filteredPokemonList.length).toBe(1);
    expect(component.filteredPokemonList[0].name).toBe('bulbasaur');

    component.filterPokemonList('charmander');
    expect(component.filteredPokemonList.length).toBe(0);
  });

  it('should navigate to next page', () => {
    component.count = 40;
    component.limit = 20;
    component.offset = 0;
    component.onNextPage();
    expect(component.offset).toBe(20);
  });

  it('should navigate to previous page', () => {
    component.count = 40;
    component.limit = 20;
    component.offset = 20;
    component.onPreviousPage();
    expect(component.offset).toBe(0);
  });

  it('should sort pokemon by pokedex order', () => {
    component.pokemonList = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'image-url' },
        game_indices: [{ game_index: 1 }],
        base_experience: 64,
        height: 7,
        weight: 69,
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      },
      {
        id: 4,
        name: 'charmander',
        sprites: { front_default: 'image-url' },
        game_indices: [{ game_index: 4 }],
        base_experience: 62,
        height: 6,
        weight: 85,
        types: [{ type: { name: 'fire' } }],
        abilities: [{ ability: { name: 'blaze' } }],
      },
    ];

    component.sortPokemonList('pokedex');
    expect(component.filteredPokemonList[0].name).toBe('bulbasaur');
    expect(component.filteredPokemonList[1].name).toBe('charmander');
  });
});
