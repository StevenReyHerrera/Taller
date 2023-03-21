const datos = [];
const cardContainer=document.getElementById("card-container")
const numeroAleatorio = Math.floor(Math.random() * 1008) + 1;
const boton = document.getElementById("boton_atrapa");

const inicio = () => {
  window.location.href = './index.html';
}


const showCard = () => {

  boton.classList.add("loader")
  
  
  const fetchPokemonData = new Promise((resolve, reject) => {
    setTimeout(() => {
      boton.classList.remove("loader")
      fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}/`)
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }, 3000);
  });
  
  fetchPokemonData.then(data => {
    const div = document.createElement('div');
    div.setAttribute("class","card")
    div.classList.add(`${data.types[0].type.name}`)
    const h1 = document.createElement('h1');
    h1.textContent = data.name;
    h1.style.fontSize="2.8rem"
    div.appendChild(h1);
    boton.classList.remove("loader")
    const img= document.createElement('img')
    img.setAttribute('src',data.sprites.other['official-artwork'].front_default )
    img.style.width="40%"
    div.appendChild(img)
    cardContainer.appendChild(div);

    console.log("Estadísticas de base:");
    data.stats.forEach((stat) => {
      const statDiv = document.createElement('div'); // Crear el nuevo div para cada stat
      statDiv.style.display="flex"
      statDiv.style.justifyContent="center"
      statDiv.style.alignItems="center"
      const h1 = document.createElement('h1');
      const barra = document.createElement('div');
      barra.style.width = `${stat.base_stat / 5}%`;
      barra.style.backgroundColor = "white"
      barra.style.height = '10px';
      barra.style.margin = "0 5%"
      h1.textContent = `${stat.stat.name}: ${stat.base_stat}`;
      statDiv.appendChild(h1); // Agregar el h1 y la barra al nuevo div
      statDiv.appendChild(barra);
      div.appendChild(statDiv); // Agregar el nuevo div al div principal
    });
    data.abilities.forEach(ability => {
      console.log(`- ${ability.ability.name}`);
    });
    boton.removeEventListener("click", showCard);
  })
  .catch(error => {
    console.error("Ocurrió un error al obtener los datos:", error);
  });
}


boton.addEventListener("click", showCard); // Agregar listener al botón