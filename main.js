const stars = document.querySelectorAll('.star');
const starBackgrounds = document.querySelectorAll('.star_background');
const star_rating_txt = document.getElementById("star_rating_txt");
const rate_btn = document.getElementById("rate_btn");
const starContainer = document.getElementById("stars")

let currentRating = 0;

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

  star_rating_txt.innerText = `${currentRating} ★`;
}

// Limpa o preenchimento ao sair das estrelas
function resetStars() {
  starBackgrounds.forEach(star => star.style.width = '0%');
  star_rating_txt.innerText = `0.0 ★`;
}

function handleMouseMove(event) {
  updateStars(event);
}

rate_btn.addEventListener("click", () => {
  // Associa o evento de movimento às estrelas
  stars.forEach(star => {
    star.addEventListener('mousemove', handleMouseMove);
  });

  starContainer.addEventListener('click', () => {
    removeMouseEvents();
    rate_btn.style.display = "none"
    console.log(`Classificação final: ${currentRating} estrelas`);
  });
})

// Remove o evento de movimento após o clique
function removeMouseEvents() {
  stars.forEach(star => {
    star.removeEventListener('mousemove', handleMouseMove);
  });
}

starContainer.addEventListener("mouseenter", () => {
  rate_btn.style.display = "block"
})