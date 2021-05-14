//Easily the hardest project i have done so far 

//Array to store the national dex entries
let nationalDex = [];
const regEx = /^[a-z]\w{1,9}$/i;
const pokeForm = document.querySelector('form');

//See if form entry is valid
function validaton(field,regex) {
  return regex.test(field.value);
}

//runs a test on each key press
pokeForm.addEventListener('keyup', e => {
  if(validaton(pokeForm.pokemon,regEx)) {
    validForm();
  }
  else {
    invalidForm();
  }
});

//store the first 5 region entries in the array
getPokeDex('national')
  .then(data => nationalDex = data.slice(0,649))
  .catch(error => console.log(error));

//nationaldex number ranges correspond with regions 
const checkRegion = pokemonEntry => {
  let entryNumber = pokemonEntry.entry_number
  let region = " ";

  if(entryNumber <= 151) {
    region = "Kanto"
  }
  else if(entryNumber > 151 && entryNumber <= 251) {
    region = "Johto"
  }
  else if(entryNumber > 251 && entryNumber <= 386) {
    region = "Hoenn"
  }
  else if(entryNumber > 386 && entryNumber <= 493) {
    region = "Sinnoh"
  }
  else if(entryNumber > 493 && entryNumber <= 649) {
    region = "Unova"
  }
  return region;
}

pokeForm.addEventListener('submit', e => {
  let region = null;
  //gets the value entered by the user
  let query = pokeForm.pokemon.value.trim();

  //see if query is in the national dex and returns it
  let position = nationalDex.find(element => element.pokemon_species.name === query);
  
  //uses position to determine the region
  region = checkRegion(position);

  //needs adjustment
  if(position == null) {
    alert("No such pokemon listed in these regions");
  }
  //if pokemon is listed in the national dex
  else {
    //sends a request for pokemon data based on the query
    getPokemon(query)
    .then(data => {
      changeIdentity(position.entry_number,data.name);
      showSprites(data);
      editTable(data,region);
      clearEvolutions();
      clearAbilities();

      //uses the ability names to request corresponding descriptions
      data.abilities.forEach(item => {
        //loops through each ability 
        getAbility(item.ability.name)
          .then(data => {
            addAbility(data.name,data.flavor_text_entries[1].flavor_text )
          })
      });
      //returns a promise with a species 
      return getSpecies(query)
    }).then(data => {
        getEvolutionChain(data.url).then(data => {
          let line = data.chain;
          //if there are no evolutions
          if(line.evolves_to == null) {
            getPokemon(line.species.name)
            .then(data => {
              addEvolutions(data)
            })
          }
          //if the pokemon evolves
          else {
            getPokemon(line.species.name)
              .then(data => {
                addEvolutions(data)
              }).then(() => {
                //then loop through and grab the next evolutions
                line.evolves_to.forEach(pokemon => {
                  getPokemon(pokemon.species.name)
                    .then(data => {
                      addEvolutions(data)
                    }).then(() => {
                      if(pokemon.evolves_to) {
                        pokemon.evolves_to.forEach(pokemon => {
                          getPokemon(pokemon.species.name)
                            .then(data => {
                              addEvolutions(data)
                            })
                        })
                      }
                    })
                })
              })
          }
        })
    })
    .catch(error => console.log(error));
    showResults();
  }
  clearForm();
  e.preventDefault();
});

//hdes results when the page loads
document.addEventListener('DOMContentLoaded', e => {
  hideResults();
});

