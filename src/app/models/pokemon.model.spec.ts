import { Pokemon } from './pokemon.model';

describe('Pokemon Model', () => {
  it('should create a valid Pokemon object', () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        front_default: 'https://example.com/sprite.png',
      },
      game_indices: [{ game_index: 1 }],
      base_experience: 64,
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
    };

    expect(mockPokemon).toBeTruthy();
    expect(mockPokemon.id).toBe(1);
    expect(mockPokemon.name).toBe('bulbasaur');
    expect(mockPokemon.sprites.front_default).toBe('https://example.com/sprite.png');
    expect(mockPokemon.game_indices?.[0].game_index).toBe(1);
    expect(mockPokemon.base_experience).toBe(64);
    expect(mockPokemon.height).toBe(7);
    expect(mockPokemon.weight).toBe(69);
    expect(mockPokemon.types[0].type.name).toBe('grass');
    expect(mockPokemon.abilities[0].ability.name).toBe('overgrow');
  });

  it('should allow a Pokemon object without optional fields', () => {
    const mockPokemon: Pokemon = {
      id: 4,
      name: 'charmander',
      sprites: {
        front_default: 'https://example.com/sprite.png',
      },
      base_experience: 62,
      height: 6,
      weight: 85,
      types: [{ type: { name: 'fire' } }],
      abilities: [{ ability: { name: 'blaze' } }],
    };

    expect(mockPokemon).toBeTruthy();
    expect(mockPokemon.id).toBe(4);
    expect(mockPokemon.name).toBe('charmander');
    expect(mockPokemon.sprites.front_default).toBe('https://example.com/sprite.png');
    expect(mockPokemon.game_indices).toBeUndefined();
    expect(mockPokemon.base_experience).toBe(62);
    expect(mockPokemon.height).toBe(6);
    expect(mockPokemon.weight).toBe(85);
    expect(mockPokemon.types[0].type.name).toBe('fire');
    expect(mockPokemon.abilities[0].ability.name).toBe('blaze');
  });
});
