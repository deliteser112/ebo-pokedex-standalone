import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { pokemonReducer } from '../store/reducers/pokemon.reducer';
import { SortService } from '../services/sort/sort.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonListComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({ pokemon: pokemonReducer }),
      ],
      providers: [
        provideMockStore(),
        SortService
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
