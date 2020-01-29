const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const handleError = err => {
    alert(`Oops! Pokémon no encontrado`);
    overlay.classList.remove("overlayOn");
    throw "Error, Pokémon no encontrado"
};

let pokemon= {};
const overlay = document.querySelector("#overlay");

const getPokemon = async id => {
    id=id.toLowerCase();
    overlay.classList.add("overlayOn"); //SET TIME OUT
    
    try {
        const res = await axios.get(`${baseUrl}${id}`);
        pokemon = res.data;
        mostrarPokemon();
    } catch (err) {
        handleError();
    }
    await setTimeout(()=>{
        
        overlay.classList.remove("overlayOn");
    }, 2000)
};

const imagenPokemon = () =>{
    let imgPos = document.querySelector("#poke-img");
    imgPos.innerHTML = "";
    let img = document.createElement("img");
    img.setAttribute("src",pokemon.sprites.front_default);
    img.setAttribute("width","200px");
    imgPos.appendChild(img);
}

const mostrarPalabra = (palabra) =>{
    let datos = palabra;
    datos = convertir(datos.toLowerCase());
    return datos;
}

const convertir=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const mostrarHabilidad = (lista)=>{
    let habilidades = document.querySelector("#poke-ability");
    habilidades.innerHTML = "";
    habilidades.appendChild(document.createTextNode("Abilities: "))
    for (let ability of lista){
        let habilidad = document.createElement("span")
        habilidad.appendChild(document.createTextNode(ability.ability.name));
        habilidades.appendChild(habilidad);
    }
}

const mostrarTipos = (tipos)=>{
    let lista = document.querySelector(".main-poke-type");
    lista.innerHTML = "";
    for (let tipo of tipos){
        let boton = document.createElement("button");
        boton.innerHTML = tipo.type.name;
        boton.classList.add(tipo.type.name);
        lista.appendChild(boton);
    }
}

const infoPokemon = () =>{
    let numero = document.querySelector("#poke-number");
    numero.innerHTML= pokemon.id;
    let nombre = document.querySelector("#poke-name");
    nombre.innerHTML = mostrarPalabra(pokemon.name);
    let altura = document.querySelector("#poke-height");
    altura.innerHTML = "Height: "+pokemon.height;
    let peso = document.querySelector("#poke-weight");
    peso.innerHTML = "Weight: "+pokemon.weight;
    let habilidades = mostrarHabilidad(pokemon.abilities);
    let type = mostrarTipos(pokemon.types)
}

const mostrarPokemon = () =>{
    imagenPokemon();
    infoPokemon();

};

let boton = document.querySelector("#search-button");
boton.addEventListener("click",()=>{
    getPokemon(document.querySelector("#finder").value);
    document.querySelector("#finder").value = "";
});

const inicio = ()=>{
    let pantallaInicio = document.querySelector("#start");
    pantallaInicio.classList.add("overlayOn");
}

const ocultarPantallaInicio= ()=>{
    let pantallaInicio = document.querySelector("#start");
    pantallaInicio.classList.remove("overlayOn");
}

let start = document.querySelector("#button-start");
start.addEventListener("click",ocultarPantallaInicio);

inicio();