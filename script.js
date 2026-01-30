document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if (
    key === "f12" ||
    e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key) ||
    e.ctrlKey && key === "u"
  )
  e.preventDefault();
});

let stage = "WELCOME";
let username = "";
let selectedAngpao = null;
const savedUser = localStorage.getItem("confirmedUser");
const savedCard = localStorage.getItem("confirmedCard");

const container = document.querySelector('.fireworks');

function createFirework() {
  const firework = document.createElement("div");
  firework.className = "firework";

  firework.style.left = Math.random() * 100 + "vw";
  firework.style.top = Math.random() * 100 + "vh";

  container.appendChild(firework);

  setTimeout (() => {
    firework.remove();
  }, 1500);
}

function renderWelcome() {
  return `
  <div class="container fade">
      <h2>🧧 List Hadiah 🧧</h2>
      <div class="prize-list" id="prize"></div>
      <button type="button" id="lihat">Lihat Hadiah</button>
      <button type="button" id="mulai">Mulai Main</button>
    </div>
  `;
}

function renderPrize() {
  return `
    <div class="prize-card">
          <div class="prize-icon">🧧💰</div>
          <div class="prize-tittle">ANGPAO 1 JUTA</div>
          <div class="prize-desc">
            Angpao Imlek <strong>1 JUTA</strong> langsung ditransfer ke rekening.
          </div>
          <div class="prize-chance">Peluang: 5%</div>
        </div>
        <div class="prize-card">
          <div class="prize-icon">🧧💰</div>
          <div class="prize-tittle">ANGPAO 500 RIBU</div>
          <div class="prize-desc">
            Angpao Imlek <strong>500 RIBU</strong> langsung ditransfer ke rekening.
          </div>
          <div class="prize-chance">Peluang: 10%</div>
        </div>
        <div class="prize-card">
          <div class="prize-icon">🧧💰</div>
          <div class="prize-tittle">ANGPAO 250 RIBU</div>
          <div class="prize-desc">
            Angpao Imlek <strong>250 RIBU</strong> langsung ditransfer ke rekening.
          </div>
          <div class="prize-chance">Peluang: 15%</div>
        </div>
        <div class="prize-card">
          <div class="prize-icon">🧧💰</div>
          <div class="prize-tittle">ANGPAO 100 RIBU</div>
          <div class="prize-desc">
            Angpao Imlek <strong>100 RIBU</strong> langsung ditransfer ke rekening.
          </div>
          <div class="prize-chance">Peluang: 20%</div>
        </div>
        <div class="prize-card">
          <div class="prize-icon">🧧💰</div>
          <div class="prize-tittle">BONUS SPESIAL IMLEK 20%</div>
          <div class="prize-desc">
            Dapatkan tambahan saldo edisi imlek <strong>20%</strong> setelah melakukan deposit.
          </div>
          <div class="prize-chance">Peluang: 50%</div>
        </div>
  `;
}

function renderLogin() {
  return `
    <div class="container fade">
      <h2>Masukkan Username Akun WASIAT4D2</h2>
      <input type="text" id="username" placeholder="Masukkan Username" autocomplete="off">
      <button type="button" id="login" disabled>Login</button>
      <button type="button" class="back-btn">Kembali</button>
    </div>
  `;
}

function renderGame() {
  return `
    <div class="container fade">
      <h2>Halo, <strong>${username}</strong> Silahkan Pilih Angpao Berhadiahnya</h2>
      <div class="wrapper">
        <div class="angpao" id="angpao1">
          <div class="angpao-wrap"><img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="angpao1"></div>
          <div class="angpao-descripstion">ANGPAO 1</div>
        </div>
        <div class="angpao" id="angpao2">
          <div class="angpao-wrap"><img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="angpao2"></div>
          <div class="angpao-descripstion">ANGPAO 2</div>
        </div>
        <div class="angpao" id="angpao3">
          <div class="angpao-wrap"><img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="angpao3"></div>
          <div class="angpao-descripstion">ANGPAO 3</div>
        </div>
        <div class="angpao" id="angpao4">
          <div class="angpao-wrap"><img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="angpao4"></div>
          <div class="angpao-descripstion">ANGPAO 4</div>
        </div>
        <div class="angpao" id="angpao5">
          <div class="angpao-wrap"><img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="angpao5"></div>
          <div class="angpao-descripstion">ANGPAO 5</div>
        </div>
      </div>
      <button type="button" class="back-btn">Kembali</button>
    </div>
    <div class="modal"id="modal"></div>
  `;
}

function renderModal() {
  return `
    <div class="modal-content fade">
      <div class="selected-angpao">
        <div class="image-wrap">
          <img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="Angpao Terpilih">
          <div class="selected-card">
            HADIAH : ???
          </div>
        </div>
      </div>
      <h3><strong>${username}</strong>, Kamu Yakin Ingin Memilih <strong>Angpao ${selectedAngpao.id.replace("angpao", "")}</strong>?</h3>
      <button type="button" id="yes">Yakin</button>
      <button type="button" id="no">Batal</button>
    </div>
  `;
}

function renderResult() {
  return `
    <div class="container fade">
      <div class="top">Selamat! <strong>${username}</strong> mendapatkan Hadiah <strong>BONUS SPESIAL IMLEK 20%</strong> dari <strong>ANGPAO ${selectedAngpao.id.replace("angpao", "")}</strong></div>
      <div class="selected-angpao">
        <div class="image-wrap">
          <img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="Angpao Terpilih">
          <div class="selected-card">
            BONUS SPESIAL IMLEK 20%
          </div>
        </div>
      </div>
      <div class="bot">
        📸 Silakan <strong>Screenshot</strong> halaman ini lalu
        <br>
        Claim hadiah melalui:
        <br>
        👉 <strong><a href="https://shorthe.link/loginwasiat4d2" target="_blank">Live Chat</a></strong><br>
        👉 <strong><a href="https://shorthe.link/wa-wasiat4d2" target="_blank">WhatsApp</a></strong>
      </div>
      <button type="button" id="home">Kembali Ke Halaman Utama</button>
    </div>
  `;
}

function renderClaimed(user, card) {
  return `
    <div class="container fade">
      <div class="top">User <strong>${user}</strong> Sudah Pernah Bermain dan Mendapat Hadiah <strong>BONUS SPESIAL IMLEK 20%</strong> dari <strong>ANGPAO ${card.replace("angpao", "")}</strong></div>
      <div class="selected-angpao">
        <div class="image-wrap">
          <img src="https://i.postimg.cc/CMQyBn0D/angpao.png" alt="Angpao Terpilih">
          <div class="selected-card">
            BONUS SPESIAL IMLEK 20%
          </div>
        </div>
      </div>
      <div class="bot">
        📸 Silakan <strong>Screenshot</strong> halaman ini lalu
        <br>
        Claim hadiah melalui:
        <br>
        👉 <strong><a href="https://shorthe.link/loginwasiat4d2" target="_blank" rel="noopener">Live Chat</a></strong><br>
        👉 <strong><a href="https://shorthe.link/wa-wasiat4d2" target="_blank">WhatsApp</a></strong>
      </div>
      <button type="button" id="home">Kembali Ke Halaman Utama</button>
    </div>
  `;
}

function reStage() {
  const backBtn = document.querySelector(".back-btn");
  if (!backBtn) return;
  
  backBtn.addEventListener("click", () => {
    if (stage === "LOGIN") {
      stage = "WELCOME";
      render();
    }
    if (stage === "PLAYING") {
      stage = "LOGIN";
      render();
    }
  });
}

function launchConfetti() {
  const colors = ["#ffd700", "#00ffd5", "#ff5252", "#ffffff"];
  const total = 80;
  
  for (let i = 0; i < total; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);
  
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

function render() {
  const app = document.getElementById("app");
  if (stage === "WELCOME") {
    app.innerHTML = renderWelcome();
    const savedUserNow = localStorage.getItem("confirmedUser");
    const savedCardNow = localStorage.getItem("confirmedCard");
    const prizeList = document.getElementById("prize");
    const seePrize = document.getElementById("lihat");
    const startGame = document.getElementById("mulai");
    seePrize.addEventListener("click", () => {
      prizeList.innerHTML = renderPrize();
      prizeList.classList.toggle("active");

      if (prizeList.classList.contains("active")) {
        seePrize.innerHTML = "Tutup";
      } else {
        seePrize.innerHTML = "Lihat Hadiah";
        setTimeout(() => { prizeList.innerHTML = ""; }, 500);
      }
    });

    startGame.addEventListener("click", () => {
      if (savedUserNow && savedCardNow) {
        app.innerHTML = renderClaimed(savedUserNow, savedCardNow);
        launchConfetti();
        const homeBtn = document.getElementById("home");
        homeBtn.addEventListener("click", () => {
          render();
        });
      }
      else {
        stage = "LOGIN";
        render();
      }
    });
  }

  if(stage === "LOGIN") {
    app.innerHTML = renderLogin();
    reStage();
    const usernameInput = document.getElementById("username");
    const login = document.getElementById("login");
    usernameInput.addEventListener("input", () => {
      usernameInput.value = usernameInput.value.replace(/[^a-zA-Z0-9]/g, "");
      login.disabled = usernameInput.value.length < 6 || usernameInput.value.length > 16;
    })
    usernameInput.addEventListener("keydown", e => {
      if (e.key === "Enter" && !login.disabled) {
        login.click();
      }
      if (e.key === "Enter" && usernameInput.value === "") {
        alert("Harap Masukkan Username Terlebih Dahulu!");
      }
      if (e.key === "Enter" && usernameInput.value.length < 6) {
        alert("Minimal 6 Karakter!");
      }
      if (e.key === "Enter" && usernameInput.value.length > 16) {
        alert("Maksimal 16 Karakter!");
      }
    });
    login.addEventListener("click", () => {
      username = usernameInput.value;
      stage = "PLAYING";
      render();
    });
  }

  if (stage === "PLAYING") {
    app.innerHTML = renderGame();
    reStage();
    const angpao = document.querySelectorAll(".angpao");
    const modal = document.getElementById("modal");
    angpao.forEach(pao => {
      pao.addEventListener("click", () => {
        selectedAngpao = pao;
        modal.style.display = "flex";
        modal.innerHTML = renderModal();
        const yesBtn = document.getElementById("yes");
        const noBtn = document.getElementById("no");
        noBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
        
        yesBtn.addEventListener("click", () => {
          localStorage.setItem("confirmedUser", username);
          localStorage.setItem("confirmedCard", selectedAngpao.id);
          stage = "RESULT";
          render();
        });
      });
    });
  }

  if (stage === "RESULT") {
    app.innerHTML = renderResult();
    launchConfetti();
    const homeBtn = document.getElementById("home");
    homeBtn.addEventListener("click", () => {
      stage = "WELCOME";
      render();
    });
  }
}

setInterval(createFirework, 300);
render();
