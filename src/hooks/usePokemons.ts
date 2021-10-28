import Pokemon from "../types/Pokemon";
import { useQuery } from 'react-query';
import api from '../services/api';

type PokemonsDataHook = {
  pokemons: Pokemon[];
  loading: boolean;
}

type PokemonData = {
  name: string;
  url: string;
} 

type PokemonRequest = {
  results: PokemonData[];
}

type PokemonDetails = {
  name: string;
  sprites: {
    front_default: string;
  }
}

const usePokemons = (): PokemonsDataHook => {
  const { data: pokemons, isLoading } = useQuery<Pokemon[], Error>('pokemonsLoad', getPokemons, {
    initialData: []
  });

  async function loadPokemon(pokemon: PokemonData) {    
    const { data } = await api.get<PokemonDetails>(pokemon.url);
    return {
      nome: data.name,
      avatarUrl: data.sprites.front_default
    } as Pokemon;
  }

  async function getPokemons(): Promise<Pokemon[]> {
    const { data } = await api.get<PokemonRequest>('https://pokeapi.co/api/v2/pokemon');
    const pokemonList: Pokemon[] = [];

    for (let pokemonData of data.results) {
      const pokemon = await loadPokemon(pokemonData);
      pokemonList.push(pokemon);
    }

    return pokemonList;
  }

  return {
    pokemons,
    loading: isLoading
  } as PokemonsDataHook;
}

export default usePokemons;