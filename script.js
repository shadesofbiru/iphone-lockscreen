
const clock = document.getElementById("clock");
const statusTime = document.getElementById("statusTime");
const dateLabel = document.getElementById("date");

const lockScreen = document.getElementById("lockScreen");
const passcodeScreen = document.getElementById("passcodeScreen");

const swipeButton = document.getElementById("swipeButton");
const cancelButton = document.getElementById("cancel");
const dots = [...document.querySelectorAll("#dots span")];
const errorMessage = document.getElementById("errorMessage");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");

let enteredCode = "";
let toastTimeout;
let touchStartY = null;

// Jam dan tanggal mengikuti waktu perangkat.
function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  clock.textContent = time;
  statusTime.textContent = time;

  dateLabel.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
}

updateClock();
setInterval(updateClock, 1000);

// Pindah dari lock screen ke layar passcode.
function openPasscode() {
  lockScreen.classList.add("dismissed");
  passcodeScreen.classList.add("visible");

  enteredCode = "";
  renderDots();
  errorMessage.textContent = "";
}

function closePasscode() {
  passcodeScreen.classList.remove("visible");
  lockScreen.classList.remove("dismissed");

  enteredCode = "";
  renderDots();
  errorMessage.textContent = "";
}

swipeButton.addEventListener("click", openPasscode);

cancelButton.addEventListener("click", closePasscode);

// Deteksi gesture swipe pada layar ponsel.
const phone = document.getElementById("phone");

phone.addEventListener("touchstart", event => {
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

phone.addEventListener("touchend", event => {
  if (touchStartY === null) return;

  const difference =
    touchStartY - event.changedTouches[0].clientY;

  if (
    difference > 45 &&
    !passcodeScreen.classList.contains("visible")
  ) {
    openPasscode();
  } else if (
    difference < -70 &&
    passcodeScreen.classList.contains("visible")
  ) {
    closePasscode();
  }

  touchStartY = null;
}, { passive: true });

// Mengisi empat titik passcode.
function renderDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("filled", index < enteredCode.length);
  });
}

function pressNumber(number) {
  if (enteredCode.length >= 4) return;

  enteredCode += number;
  renderDots();

  if (enteredCode.length === 4) {
    // Simulasi: tidak memverifikasi atau mengunci perangkat.
    setTimeout(() => {
      errorMessage.textContent = "Incorrect Passcode";
      enteredCode = "";
      renderDots();

      setTimeout(() => {
        errorMessage.textContent = "";
      }, 1400);
    }, 300);
  }
}

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () => {
    pressNumber(button.dataset.number);
  });
});

// Bisa juga mengetik angka dari keyboard komputer.
document.addEventListener("keydown", event => {
  if (!passcodeScreen.classList.contains("visible")) return;

  if (/^\d$/.test(event.key)) {
    pressNumber(event.key);
  }

  if (event.key === "Escape") {
    closePasscode();
  }
});

// Popup notifikasi otomatis.
const notifications = [
  {
    title: "Pesan baru",
    message: "Seseorang mengirimkan pesan untukmu ♡"
  },
  {
    title: "Ms Jeanne",
    message: "sayang, jgn kaget!."
  },
  {
    title: "Ms Jeanne",
    message: "aku mau ke jakarta."
  }
];

let notificationIndex = 0;

function showPopup() {
  const item =
    notifications[notificationIndex % notifications.length];

  notificationIndex++;

  popupTitle.textContent = item.title;
  popupMessage.textContent = item.message;

  popup.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    popup.classList.remove("show");
  }, 4500);
}

// Popup pertama setelah 8 detik,
// lalu notifikasi berikutnya setiap 25 detik.
setTimeout(showPopup, 8000);
setInterval(showPopup, 25000);

// Tombol senter dan kamera hanya simulasi visual.
document.getElementById("flashlight").addEventListener("click", event => {
  event.currentTarget.style.background = "#ffffff66";

  setTimeout(() => {
    event.currentTarget.style.background = "";
  }, 800);
});

document.getElementById("camera").addEventListener("click", () => {
  popupTitle.textContent = "Camera";
  popupMessage.textContent = "Kamera ini hanya tampilan demo.";

  popup.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
});

document.getElementById("emergency").addEventListener("click", () => {
  errorMessage.textContent = "Emergency (demo only)";

  setTimeout(() => {
    errorMessage.textContent = "";
  }, 1800);
});
