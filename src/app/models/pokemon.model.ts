export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  game_indices?: Array<{
    game_index: number;
  }>;
  base_experience: number;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
}
