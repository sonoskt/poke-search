/*Grabs the list of every pokemon in order so 
  entry can be verified and region determined
*/
const getPokeDex = async (dex) => {
  const dexBase = `https://pokeapi.co/api/v2/pokedex/`
  const query = `${dex}/`

  const response = await fetch(dexBase + query);
  const data = await response.json();

  return data.pokemon_entries;
};


//Gets relavant pokemon data as well as the sprites
const getPokemon = async (pokemon) => {
  const pokeBase = `https://pokeapi.co/api/v2/pokemon/`
  const query = `${pokemon}/`

  const response = await fetch(pokeBase + query);
  const data = await response.json();

  return data;
};

//Gets relavant ability data as well as the sprites
const getAbility = async (ability) => {
  const abilityBase = `https://pokeapi.co/api/v2/ability/`
  const query = `${ability}`

  const response = await fetch(abilityBase + query);
  const data = await response.json();

  return data;
};

//Show to pokemon species needed to for evolution chain
const getSpecies = async (pokemon) => {
  const speciesBase = `https://pokeapi.co/api/v2/pokemon-species/`;
  const query = `${pokemon}/`;

  const response = await fetch(speciesBase + query);
  const data = await response.json();

  return data.evolution_chain;
};

const getEvolutionChain = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export { getPokeDex, getPokemon, getAbility, getSpecies, getEvolutionChain };