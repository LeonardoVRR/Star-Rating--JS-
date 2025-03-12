//variaveis da area Star Rating
const stars = document.querySelectorAll('.star');
const starBackgrounds = document.querySelectorAll('.star_background');
const star_rating_txt = document.getElementById("star_rating_txt");
const rate_btn = document.getElementById("rate_btn");
const starContainer = document.getElementById("stars")

const loader = document.querySelector(".loading_container")

// configs. botão proximo filme e banner do filme

const img_movie = document.querySelector(".img_movie")
const nsfw_content = document.querySelector(".nsfw_content")
const show_content_nsfw_btn = document.querySelector(".show_content_nsfw")
const next_move_btn_container = document.querySelector(".next_movie_btn_container")
const next_move_btn = document.getElementById("next_move_btn")
const movie_name = document.querySelector(".movie_name")
const maximum_number_range = 10000

//variaveis da area Star Rating Score
const stars_ratings = document.querySelectorAll(".rating_score_container")
const total_star_rating_score_TXT = document.getElementById("total_rating")

let currentRating = 0;
let total_score = 0

// Atualiza o preenchimento das estrelas com base no movimento do mouse
function updateStars(event) {
  const targetStar = event.currentTarget;
  const boundingRect = targetStar.getBoundingClientRect();
  const offsetX = event.clientX - boundingRect.left;
  const width = boundingRect.width;
  
  const index_MouseStar = Array.from(stars).indexOf(targetStar);
  const fillPercentage = Math.max(0, Math.min((offsetX / width) * 100, 100));

  // Usar fillPercentage diretamente sem .toFixed()
  const rating = index_MouseStar + fillPercentage / 100;

  // Verificar se o rating está dentro do intervalo válido
  if (rating >= 0.0 && rating <= 5.0) {
    currentRating = rating.toFixed(1);
  }

  // Atualiza o preenchimento das estrelas
  stars.forEach((starElem, i) => {
    const bg = starElem.querySelector(".star_background");
    if (i < index_MouseStar) {
      bg.style.width = "100%";
    } else if (i === index_MouseStar) {
      bg.style.width = `${fillPercentage}%`;
    } else {
      bg.style.width = "0%";
    }
  });

  star_rating_txt.innerText = `${currentRating}`;
}

function handleMouseMove(event) {
  updateStars(event);
}

rate_btn.addEventListener("click", () => {

  starContainer.style.cursor = `url("img/color-pixels-pokeball-pointer.png"), pointer;`

  // Associa o evento de movimento às estrelas
  stars.forEach(star => {
    star.addEventListener('mousemove', handleMouseMove);
  });

  starContainer.addEventListener('click', () => {
    removeMouseEvents();
    starContainer.style.cursor = `url("img/color-pixels-pokeball-default\ \(1\).png"), auto;`
    //console.log(`Classificação final: ${currentRating} estrelas`);
  });

  starContainer.addEventListener('click', add_total_star_rating_score)


})

// Remove o evento de movimento após o clique
function removeMouseEvents() {
  stars.forEach(star => {
    star.removeEventListener('mousemove', handleMouseMove);
  });
}

// configurações da area pontuação de classificação por estrelas

function add_total_star_rating_score() {
  total_score += 1

  total_star_rating_score_TXT.innerText = total_score

  add_star_rating_score() 

  starContainer.removeEventListener('click', add_total_star_rating_score)
}

function add_star_rating_score() {
  let final_star_score = Number(currentRating.split(".")[0])  

  if (final_star_score < 1) {
    final_star_score = 1
  }

  const rating_star_level = stars_ratings[final_star_score - 1].querySelector(".number_reviews")

  let rating_star_level_score = Number(rating_star_level.textContent)

  rating_star_level.innerText = `${rating_star_level_score+=1}`

  //console.log(rating_star_level_width.getBoundingClientRect().width)

  star_level_rating_fill_level()
}

function star_level_rating_fill_level() {

  stars_ratings.forEach((rating_star_level, index) => {

    let rating_star_level_score = Number(rating_star_level.querySelector(".number_reviews").textContent)
    const rating_star_level_width = rating_star_level.querySelector(".rating_score_fill")

    let fillPercentage = Math.max(0, Math.min((rating_star_level_score / total_score) * 100, 100));

    //console.log(`star level: ${index+1}, score: ${rating_star_level_score}`)

    rating_star_level_width.style.width = `${fillPercentage}%`
  })

}

// Limpa o preenchimento ao sair das estrelas
function resetStars() {
  starBackgrounds.forEach(star => star.style.width = '0%');
  star_rating_txt.innerText = `0.0`;
}

function reset_star_rating_score() {
  stars_ratings.forEach((rating_star_level) => {

    let rating_star_level_score = rating_star_level.querySelector(".number_reviews")

    rating_star_level_score.innerText = "0"

    const rating_star_level_width = rating_star_level.querySelector(".rating_score_fill")
    rating_star_level_width.style.width = `0%`
  })

  total_score = 0
  total_star_rating_score_TXT.innerText = 0
}

//configs. quadro de avisos de erro

const error_modal_container = document.querySelector(".error_modal_container")

error_modal_container.addEventListener("click", (event) => {
  const clickMouse = event.target.className

  if (clickMouse === "error_modal_container" || clickMouse === "close_modal_btn") {
    error_modal_container.style.display = "none"
  }
})

next_move_btn.addEventListener("click", () => {

  loader.style.display = "flex"

  let numID = Math.floor(Math.random() * maximum_number_range) + 1;
  let url = `https://api.jikan.moe/v4/anime/${numID}/full`

  //console.log(`Dados do anime: ${url}`)

  getAnimeData(url, numID)

})

const invalid_id_numbers = []

// Função para obter os dados
async function getAnimeData(url, numID) {

  //console.log(`numeros de ID's invalidos: ${invalid_id_numbers}`)
  let invalid_id = invalid_id_numbers.indexOf(numID)

  if (invalid_id !== -1) {
    numID = Math.floor(Math.random() * maximum_number_range) + 1;
  }

  try {
      // Fazendo a requisição GET para a API
      const response = await fetch(url);
      
      // Verificando se a resposta foi bem-sucedida
      if (!response.ok) {

        let check_invalid_id = invalid_id_numbers.indexOf(numID)

        if (check_invalid_id === -1) {
          invalid_id_numbers.push(numID)
        }

        throw new Error(`${url}\nErro ao buscar dados da API\nlista de ID rejeitadas: ${invalid_id_numbers}`);
      }
      
      // Convertendo a resposta para JSON
      const data = await response.json();

      let anime_poster = data.data.images.jpg.image_url
      let anime_name = data.data.title
    
      movie_name.innerText = anime_name
      img_movie.style.backgroundImage = `url('${anime_poster}')`;

      if  (img_movie.classList.contains("blur")) {
        img_movie.classList.remove("blur")
      }
    
      nsfw_content.style.display = "none"

      console.log("Generos do anime:")

      const animeGenres = data.data.genres.forEach(item => {
        const genre = item.name.toLowerCase()

        console.log(genre)
        
        if (genre == "hentai") {
          img_movie.classList.add("blur")
          nsfw_content.style.display = "flex"
        }
      })

      resetStars()
      reset_star_rating_score()
      
  } catch (error) {
      console.error('Erro:', error);

      error_modal_container.style.display = "block"

      // let numID = Math.floor(Math.random() * maximum_number_range) + 1;
      // let url = `https://api.jikan.moe/v4/anime/${numID}/full`

      // getAnimeData(url, numID)
  }

  loader.style.display = "none"
  
}

show_content_nsfw_btn.addEventListener("click", () => {
  img_movie.classList.remove("blur")
  nsfw_content.style.display = "none"
})

// função para copiar o nome do anime
const animeName = document.querySelector(".movie_name");
animeName.addEventListener("click", function() {
  const animeName_txt = animeName.textContent
  
  // Copiar para a área de transferência
  navigator.clipboard.writeText(animeName_txt).then(function() {
    console.log("Texto copiado com sucesso!");
  }).catch(function(err) {
    console.error("Erro ao copiar o texto: ", err);
  });
});