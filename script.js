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

const unlockedScreen = document.getElementById("unlockedScreen");
const lockAgainButton = document.getElementById("lockAgain");

// Ubah kode passcode sesuai keinginanmu
const correctPasscode = "1804";

function pressNumber(number) {
  if (enteredCode.length >= 4) return;

  enteredCode += number;
  renderDots();

  if (enteredCode.length === 4) {
    // Simulasi: tidak memverifikasi atau mengunci perangkat.
    setTimeout(() => {
      if (enteredCode === correctPasscode) {
        // Passcode benar: tampilkan layar terbuka
        passcodeScreen.classList.remove("visible");
        unlockedScreen.classList.add("visible");
        errorMessage.textContent = "";
      } else {
        // Passcode salah
        errorMessage.textContent = "Incorrect Passcode";
        enteredCode = "";
        updateDots();

        setTimeout(() => {
          errorMessage.textContent = "";
        }, 1300);
      }
    }, 250);
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
    title: "Notifikasi 1",
    message: "isi"
  },
  {
    title: "Notifikasi 2",
    message: "isi"
  },
  {
    title: "Biru ♡",
    message: "Pass codenya 1804."
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

// Masing-masing popup muncul satu kali pada jeda berbeda
setTimeout(() => {
  showPopup("Notifikasi 1", "isi");
}, 8000); // popup pertama: 8 detik

setTimeout(() => {
  showPopup("Notifikasi 2", "isi");
}, 18000); // popup kedua: 18 detik

setTimeout(() => {
  showPopup("Biru ♡", "Pass codenya 1804");
}, 23000); // popup ketiga: 23 detik

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


lockAgainButton.addEventListener("click", () => {
  unlockedScreen.classList.remove("visible");
  closePasscode();
});

function updateCalendarIcon() {
  const now = new Date();

  const dayShort = document.getElementById("calendarDayShort");
  const dateNumber = document.getElementById("calendarDateNumber");

  if (!dayShort || !dateNumber) return;

  dayShort.textContent = now
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  dateNumber.textContent = now.getDate();
}

// Perbarui langsung dan cek setiap menit.
updateCalendarIcon();
setInterval(updateCalendarIcon, 60 * 1000);


function updateCalendarWidget() {
  const now = new Date();

  const dayElement = document.getElementById("calendarDay");
  const dateElement = document.getElementById("calendarDate");

  if (!dayElement || !dateElement) return;

  dayElement.textContent = now
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  dateElement.textContent = now.getDate();
}

updateCalendarWidget();
setInterval(updateCalendarWidget, 60 * 1000);


const calendarIcon = document.querySelector(
  '.app-item[data-app="Calendar"]'
);
const calendarApp = document.getElementById("calendarApp");
const calendarBack = document.getElementById("calendarBack");
const calendarToday = document.getElementById("calendarToday");
const calendarPrevMonth = document.getElementById("calendarPrevMonth");
const calendarNextMonth = document.getElementById("calendarNextMonth");
const calendarMonthTitle = document.getElementById("calendarMonthTitle");
const calendarMonthGrid = document.getElementById("calendarMonthGrid");
const calendarSelectedTitle = document.getElementById("calendarSelectedTitle");
const calendarEventMessage = document.getElementById("calendarEventMessage");

const calendarNow = new Date();
let calendarViewYear = calendarNow.getFullYear();
let calendarViewMonth = calendarNow.getMonth();
let calendarSelectedDate = new Date(
  calendarNow.getFullYear(),
  calendarNow.getMonth(),
  calendarNow.getDate()
);

function formatCalendarDate(date, options) {
  return date.toLocaleDateString("en-US", options);
}

function renderCalendarPage() {
  const firstDay = new Date(calendarViewYear, calendarViewMonth, 1);
  const daysInMonth = new Date(
    calendarViewYear,
    calendarViewMonth + 1,
    0
  ).getDate();

  calendarMonthTitle.textContent = formatCalendarDate(firstDay, {
    month: "long",
    year: "numeric"
  });

  calendarMonthGrid.innerHTML = "";

  ["S", "M", "T", "W", "T", "F", "S"].forEach(day => {
    const label = document.createElement("div");
    label.className = "calendar-weekday";
    label.textContent = day;
    calendarMonthGrid.appendChild(label);
  });

  const today = new Date();
  const offset = firstDay.getDay();

  for (let i = 0; i < offset; i++) {
    const blank = document.createElement("div");
    calendarMonthGrid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(calendarViewYear, calendarViewMonth, day);
    const button = document.createElement("button");
    button.className = "calendar-day";
    button.textContent = day;
    button.type = "button";

    const isToday =
      date.toDateString() === today.toDateString();
    const isSelected =
      date.toDateString() === calendarSelectedDate.toDateString();

    if (isToday) button.classList.add("is-today");
if (isSelected) button.classList.add("is-selected");

// Tandai semua tanggal 18 sebagai Jeanne Days
if (day === 18) {
  button.classList.add("jeanne-day");
}

    button.addEventListener("click", () => {
      calendarSelectedDate = date;
      renderCalendarPage();
    });

    calendarMonthGrid.appendChild(button);
  }

  calendarSelectedTitle.textContent = formatCalendarDate(
    calendarSelectedDate,
    { weekday: "long", month: "long", day: "numeric" }
  );

  const isJeanneDay = calendarSelectedDate.getDate() === 18;

calendarEventMessage.textContent = isJeanneDay
  ? "❤️ Jeanne Days"
  : "No events scheduled";

}

function openCalendarPage() {
  calendarApp.classList.add("visible");
  renderCalendarPage();
}

function closeCalendarPage() {
  calendarApp.classList.remove("visible");
}

calendarIcon?.addEventListener("click", openCalendarPage);
calendarBack?.addEventListener("click", closeCalendarPage);

calendarPrevMonth?.addEventListener("click", () => {
  calendarViewMonth--;
  if (calendarViewMonth < 0) {
    calendarViewMonth = 11;
    calendarViewYear--;
  }
  renderCalendarPage();
});

calendarNextMonth?.addEventListener("click", () => {
  calendarViewMonth++;
  if (calendarViewMonth > 11) {
    calendarViewMonth = 0;
    calendarViewYear++;
  }
  renderCalendarPage();
});

calendarToday?.addEventListener("click", () => {
  const today = new Date();
  calendarViewYear = today.getFullYear();
  calendarViewMonth = today.getMonth();
  calendarSelectedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  renderCalendarPage();
});


const photosIcon = document.querySelector('.app-item[data-app="Photos"]');
const photosApp = document.getElementById("photosApp");
const photosBack = document.getElementById("photosBack");
const photosGrid = document.getElementById("photosGrid");
const photoViewer = document.getElementById("photoViewer");
const photoViewerContent = document.getElementById("photoViewerContent");
const photoViewerCaption = document.getElementById("photoViewerCaption");
const photoViewerClose = document.getElementById("photoViewerClose");
const photosCount = document.getElementById("photosCount");
const photosSelect = document.getElementById("photosSelect");

photosIcon?.addEventListener("click", () => {
  photosApp.classList.add("visible");
});

photosBack?.addEventListener("click", () => {
  photoViewer.classList.remove("visible");
  photosApp.classList.remove("visible");
});

photosGrid?.querySelectorAll(".photo-tile").forEach((tile, index) => {
  tile.addEventListener("click", () => {
    const preview = tile.querySelector(".photo-placeholder");
    photoViewerContent.innerHTML = "";
    photoViewerContent.appendChild(preview.cloneNode(true));
    photoViewerCaption.textContent = `Photo ${index + 1}`;
    photoViewer.classList.add("visible");
  });
});

photoViewerClose?.addEventListener("click", () => {
  photoViewer.classList.remove("visible");
});

document.querySelectorAll(".photos-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".photos-tab").forEach(item =>
      item.classList.remove("active")
    );
    tab.classList.add("active");

    const view = tab.dataset.view;
    photosCount.textContent =
      view === "Years" ? "Browse by year" :
      view === "Months" ? "Browse by month" :
      "Your favorite moments";
  });
});

document.querySelectorAll(".photos-nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".photos-nav-item").forEach(nav =>
      nav.classList.remove("active")
    );
    item.classList.add("active");

    const page = item.dataset.photosNav;
    photosCount.textContent =
      page === "Albums" ? "Your albums" :
      page === "Collections" ? "Your collections" :
      page === "Search" ? "Search your photos" :
      "Your favorite moments";
  });
});

let photosSelecting = false;

photosSelect?.addEventListener("click", () => {
  photosSelecting = !photosSelecting;
  photosSelect.textContent = photosSelecting ? "Cancel" : "Select";
  photosGrid?.classList.toggle("selecting", photosSelecting);
});
