//variaveis da area Star Rating
const stars = document.querySelectorAll('.star');
const starBackgrounds = document.querySelectorAll('.star_background');
const star_rating_txt = document.getElementById("star_rating_txt");
const rate_btn = document.getElementById("rate_btn");
const starContainer = document.getElementById("stars")

let currentRating = 0;

//variaveis da area Star Rating Score
const stars_ratings = document.querySelectorAll(".rating_score_container")
const total_star_rating_score_TXT = document.getElementById("total_rating")

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

  starContainer.style.cursor = "pointer"

  // Associa o evento de movimento às estrelas
  stars.forEach(star => {
    star.addEventListener('mousemove', handleMouseMove);
  });

  starContainer.addEventListener('click', () => {
    removeMouseEvents();
    starContainer.style.cursor = "auto"
    console.log(`Classificação final: ${currentRating} estrelas`);
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

    console.log(`star level: ${index+1}, score: ${rating_star_level_score}`)

    rating_star_level_width.style.width = `${fillPercentage}%`
  })

}

// Limpa o preenchimento ao sair das estrelas
function resetStars() {
  starBackgrounds.forEach(star => star.style.width = '0%');
  star_rating_txt.innerText = `0.0`;
}

function reset_star_rating_score() {
  stars_ratings.forEach((rating_star_level, index) => {

    let rating_star_level_score = rating_star_level.querySelector(".number_reviews")

    rating_star_level_score.innerText = "0"

    const rating_star_level_width = rating_star_level.querySelector(".rating_score_fill")
    rating_star_level_width.style.width = `0%`
  })
}

// configs. botão proximo filme e banner do filme

const img_movie = document.querySelector(".img_movie")
const next_move_btn_container = document.querySelector(".next_movie_btn_container")
const next_move_btn = document.getElementById("next_move_btn")

next_move_btn.addEventListener("click", () => {

  

  setTimeout(()=>{
    console.log("Botão invisivel")
    next_move_btn_container.style.display = "none"
  }, 0)

  resetStars()
  reset_star_rating_score()

  img_movie.style.backgroundImage = `url('img/sonic\ 3\ banner.jpg')`;
})

img_movie.addEventListener("click", () => {
  next_move_btn_container.style.display = "block"
})