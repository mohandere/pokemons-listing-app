import { POKEMON_BASE_URL } from "../constants";
async function getPokemons() {
  try {
    const result = await fetch(`${POKEMON_BASE_URL}/pokemon`);
    return result.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

async function getPokemonDetails(url) {
  try {
    // const result = await fetch(`${POKEMON_BASE_URL}/pokemon/${id}`);
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

export { getPokemons, getPokemonDetails };
