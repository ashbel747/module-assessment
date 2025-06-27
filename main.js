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

const themeBtn = document.getElementById('themeBtn');

function iconChange() {
  if (document.documentElement.classList.contains('dark')){
    themeBtn.textContent = '☀️'
  } else {
    themeBtn.textContent = '🌙'
  }
}

themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');

  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }

  iconChange();
});

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
iconChange();

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your feedback!');
      this.reset();
    });

// Mobile menu toggle
    document.getElementById('footerMenuBtn').addEventListener('click', function() {
      const menu = document.getElementById('footerMenu');
      menu.classList.toggle('hidden');
    });

//reserve a seat button    
document.getElementById('ctaBtn').addEventListener('click', function(f) {
      f.preventDefault();
      alert("Thank you for your interest. We'll reach once we launch!");
    });