const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonIMG = document.querySelector(".pokemon-img");

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // UTILIZADO O "await" PORQUE A FUNÇÃO ".json()" É UMA FUNÇÃO ASSÍNCRONO. É NECESSÁRIO AGUARDAR UMA RESPOSTA DA API
    const data = await APIResponse.json();
    return data;
};

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;

    //O ".src" ATRIBUI A URL DA IMAGEM QUE SERÁ RENDERIZADA

    //OS COLCHETES SERVE PARA PERCORRER O OBJETO RETORNADO E PEGAR A IMAGEM DO POKEMON. SE UTILIZAR O PONTO(.) IRÁ DAR ERRO, POIS, NÃO SERÁ RECONHECIDO O "generation-v" POR CAUSA DO CARACTER "-"
    pokemonIMG.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
}

renderPokemon('2');