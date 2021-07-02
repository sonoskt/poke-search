const showResults = () => {
  document.querySelector('#result').style.display = '';
};

const hideResults = () => {
  document.querySelector('#result').style.display = 'none';
};

//show pokemon name and national dex number
const changeIdentity = (dexNumber, pkmnName) => {
  document.querySelector('#identity').innerText = `#${dexNumber} ${pkmnName}`;
};

//takes pokemon object and shows the images to the user
const showSprites = pokemon => { 
  document.querySelector('#normal').setAttribute('src', `${pokemon.sprites.front_default}`);
  document.querySelector('#shiny').setAttribute('src', `${pokemon.sprites.front_shiny}`);
}; 

const editTable = (pokemon, region) => {
  document.querySelector('#region').innerText = `${region}`
  document.querySelector('#type').innerText = '';
  pokemon.types.forEach(type => {
    document.querySelector('#type').innerText += ` ${type.type.name},`;
  })
  pokemon.height /= 10;
  pokemon.weight /= 10;
  document.querySelector('#height').innerText = `${pokemon.height}m`;
  document.querySelector('#weight').innerText = `${pokemon.weight}kg`;
};

const addAbility = (ability, description)  => {
  const item = document.createElement('p');

  item.innerHTML = `${ability} <span class="fw-light fst-italic">${description}</span>`;
  document.querySelector('#ability').appendChild(item);
};

const clearEvolutions = () => {
  document.querySelector('#chain').innerHTML = ''
};

const clearAbilities = () => {
  document.querySelector('#ability').innerHTML = '';
}
const addEvolutions = pokemon => {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('class','mb-5');
  newDiv.innerHTML = `<h6>${pokemon.name}</h6>
                      <img class='rounded' src="${pokemon.sprites.front_default}"</img>`

  document.querySelector('#chain').appendChild(newDiv);
};

const validForm = () => {
  document.querySelector('form').pokemon.setAttribute('class','form-control border-success');
};

const invalidForm = () => {
  document.querySelector('form').pokemon.setAttribute('class','form-control border-danger');
};

const clearForm = () => {
  document.querySelector('form').pokemon.setAttribute('class','form-control');
  document.querySelector('form').reset();
};

export {
  showResults,
  hideResults,
  changeIdentity,
  showSprites,
  editTable,
  addAbility,
  clearEvolutions,
  clearAbilities,
  addEvolutions,
  validForm,
  invalidForm,
  clearForm
};