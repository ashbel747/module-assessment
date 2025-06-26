const carousel = document.getElementById('carousel');
const slides = carousel.children;
let index = 0;

setInterval(() => {
    index = (index + 1) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }, 8000);

const text = "Paradiso Afrique";
  const typeanimation = document.getElementById("typeWriter");
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typeanimation.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    }
  }

  document.addEventListener("DOMContentLoaded", typeWriter);