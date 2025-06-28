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
document.addEventListener("DOMContentLoaded", () => {
    const ctabtn = document.getElementById("ctaBtn");

    ctabtn.addEventListener("click", () => {
        alert("Thanks for showing interest. We'll reach you once we launch!");
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[placeholder="Write your Message"]');
  const sendBtn = input.nextElementSibling; // Assuming the first button after input is Send
  const chatArea = document.querySelector('.w-full.h-[400px].overflow-y-auto'); // Your messages container
  const typingIndicator = document.getElementById('typingIndicator');

  // Hide typing indicator initially
  typingIndicator.style.display = 'none';

  function appendMessage(text, isUser = false, isError = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('mb-8', 'flex', isUser ? 'justify-end' : 'justify-start', 'gap-3');
    if (isUser) {
      msgDiv.innerHTML = `
        <div class="max-w-[70%] px-2 py-3 rounded-[18px] bg-white text-black breakwords">${text}</div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="flex items-center justify-center text-3xl flex-shrink-0 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
            <path d="M360-400h80v-200h-80v200Zm-160-60q-46-23-73-66.5T100-621q0-75 51.5-127T278-800q12 0 24.5 2t24.5 5q25-41 65-64t88-23q48 0 88 23t65 64q12-3 24-5t25-2q75 0 126.5 52T860-621q0 51-27 94.5T760-460v220H200v-220Zm320 60h80v-200h-80v200Zm-240 80h400v-189l44-22q26-13 41-36.5t15-52.5q0-42-28.5-71T682-720q-11 0-20 2t-19 5l-47 13-31-52q-14-23-36.5-35.5T480-800q-26 0-48.5 12.5T395-752l-31 52-48-13q-10-2-19.5-4.5T277-720q-41 0-69 29t-28 71q0 29 15 52.5t41 36.5l44 22v189Zm-80 80h80v80h400v-80h80v160H200v-160Zm280-80Z"/>
          </svg>
        </div>
        <div class="max-w-[70%] px-2 py-3 rounded-[18px] bg-white text-black breakwords ${isError ? 'text-red-600' : ''}">
          ${text}
        </div>
      `;
    }
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, true); // User message
    input.value = '';

    typingIndicator.style.display = 'flex';

    try {
      const response = await fetch('https://module-assessment-1.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      appendMessage(data.reply || 'Sorry, no response from the bot.');

    } catch (err) {
      console.error(err);
      appendMessage('Oops! Something went wrong.', false, true);
    } finally {
      typingIndicator.style.display = 'none';
    }
  }

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
