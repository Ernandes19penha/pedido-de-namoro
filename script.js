const perguntaBtn = document.getElementById("perguntaBtn");
const popup = document.getElementById("popup");
const simBtn = document.querySelector(".sim");
const naoBtn = document.querySelector(".nao");
const confettiCanvas = document.getElementById("confetti");

// Mostrar pop-up
perguntaBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

// Fugir do botão "não"
naoBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 50);
  naoBtn.style.position = "absolute";
  naoBtn.style.left = `${x}px`;
  naoBtn.style.top = `${y}px`;
});

// Resposta SIM com confete
simBtn.addEventListener("click", () => {
  popup.innerHTML = "<h2>Eu sabia! Te amo, Ana Júlia! 💖💖💖</h2>";
  startConfetti();
});

// Corações caindo
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// Confetti 🎉
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c, i) => {
    c.tiltAngle += c.tiltAngleIncrement;
    c.y += Math.cos(c.d);
    c.tilt = Math.sin(c.tiltAngle) * 15;

    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });

  requestAnimationFrame(animateConfetti);
}
