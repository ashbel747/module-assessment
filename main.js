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



document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatArea = document.getElementById('chatArea');
  const typingIndicator = document.getElementById('typingIndicator');

  function appendMessage(text, isUser = false, isError = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('mb-4', 'flex', isUser ? 'justify-end' : 'justify-start', 'gap-3');
    
    msgDiv.innerHTML = isUser
      ? `<div class="bg-white text-black px-4 py-2 rounded-[18px] max-w-[70%]">${text}</div>`
      : `
        <div class="flex items-center justify-center text-3xl flex-shrink-0 py-3">🍽️</div>
        <div class="bg-white text-black px-4 py-2 rounded-[18px] max-w-[70%] ${isError ? 'text-red-500' : ''}">
          ${text}
        </div>`;

    chatArea.insertBefore(msgDiv, typingIndicator);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, true);
    input.value = '';
    typingIndicator.classList.remove('hidden');

    try {
      const response = await fetch('https://module-assessment-1.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      appendMessage(data.reply || 'Sorry, no response received.');
    } catch (error) {
      appendMessage('Oops! Something went wrong.', false, true);
    } finally {
      typingIndicator.classList.add('hidden');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});

