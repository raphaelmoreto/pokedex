const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonIMG = document.querySelector(".pokemon-img");
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let pokemonDefault = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        // UTILIZADO O "await" PORQUE A FUNÇÃO ".json()" É UMA FUNÇÃO ASSÍNCRONO. É NECESSÁRIO AGUARDAR UMA RESPOSTA DA API
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.textContent = "Carregando...";
    pokemonNumber.textContent = null;
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.id;
        pokemonDefault = data.id;

        //O ".src" ATRIBUI A URL DA IMAGEM QUE SERÁ RENDERIZADA

        //OS COLCHETES SERVE PARA PERCORRER O OBJETO RETORNADO E PEGAR A IMAGEM DO POKEMON. SE UTILIZAR O PONTO(.) IRÁ DAR ERRO, POIS, NÃO SERÁ RECONHECIDO O "generation-v" POR CAUSA DO CARACTER "-"
        pokemonIMG.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    } else {
        //FAZ COM QUE O A IMAGEM FIQUE ESCONDIDA
        pokemonIMG.style.display = "none";

        pokemonName.textContent = "Não encontrado!";
        pokemonNumber.textContent = null;
    }
    input.value = '';
};

form.addEventListener("submit", (event) => {
    //EVITANDO O COMPORTAMENTO PADRÃO DO FORMULÁRIO. O NAVEGADOR ENVIA OS DADOS DO FORMULÁRIO PARA O SERVIDOR E RECARREGA A PÁGINA. O ENVIO E O RECARREGAMENTO SÃO BLOQUEADOS, PERMITINDO QUE PROCESSE OS DADOS COM JS
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (pokemonDefault > 1) {
        pokemonDefault -= 1;
        renderPokemon(pokemonDefault);
    }
});

buttonNext.addEventListener("click", () => {
    pokemonDefault += 1;
    renderPokemon(pokemonDefault);
});

renderPokemon(pokemonDefault);