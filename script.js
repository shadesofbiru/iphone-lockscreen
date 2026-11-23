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
const correctPasscode = "0418";

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
    title: "Biru ♡",
    message: "Hii!, I hope you had a wonderful day today.- ..."
  },
  {
    title: "Biru ♡",
    message: "Hey, I just wanted to say hello.- ..."
  },
  {
    title: "Biru ♡",
    message: "Pass codenya 0418."
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

// Isi Library dengan 50 foto berbeda.

const libraryPhotoCount = 37;

const libraryPhotoUrl = index =>
  `photos/foto${index + 1}.jpg`;

if (photosGrid) {
  photosGrid.innerHTML = "";

  for (let index = 0; index < libraryPhotoCount; index++) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "photo-tile";

    const preview = document.createElement("div");
    preview.className = "photo-placeholder";

    const image = document.createElement("img");
    image.src = libraryPhotoUrl(index);
    image.alt = `Foto ${index + 1}`;
    image.loading = "lazy";

    preview.appendChild(image);
    tile.appendChild(preview);
    photosGrid.appendChild(tile);

    tile.addEventListener("click", () => {
      photoViewerContent.innerHTML = "";

      const largeImage = document.createElement("img");
      largeImage.src = libraryPhotoUrl(index);
      largeImage.alt = `Foto ${index + 1}`;

      photoViewerContent.appendChild(largeImage);

      photoViewerCaption.textContent =
        `Photo ${index + 1} of ${libraryPhotoCount}`;

      photoViewer.classList.add("visible");
    });
  }

  photosCount.textContent = "50 Photos";
}



photosIcon?.addEventListener("click", () => {
  photosApp.classList.add("visible");
});

photosBack?.addEventListener("click", () => {
  photoViewer.classList.remove("visible");
  photosApp.classList.remove("visible");
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


const booksIcon = document.querySelector('.app-item[data-app="Books"]');
const booksApp = document.getElementById("booksApp");
const booksBack = document.getElementById("booksBack");
const booksReader = document.getElementById("booksReader");
const booksReaderClose = document.getElementById("booksReaderClose");
const booksReaderTitle = document.getElementById("booksReaderTitle");
const booksReaderAuthor = document.getElementById("booksReaderAuthor");
const booksSearchInput = document.getElementById("booksSearchInput");
const booksPageTitle = document.getElementById("booksPageTitle");
const booksShelf = document.getElementById("booksShelf");

function openBooksApp() {
  booksApp.classList.add("visible");
  booksReader.classList.remove("visible");
}

function closeBooksApp() {
  booksApp.classList.remove("visible");
  booksReader.classList.remove("visible");
}

booksIcon?.addEventListener("click", openBooksApp);
booksBack?.addEventListener("click", closeBooksApp);

function openBook(title) {
  booksReaderTitle.textContent = title;
  booksReaderAuthor.textContent = title.toUpperCase();
  booksReader.classList.add("visible");
}

document.querySelectorAll("#booksApp [data-book]").forEach(button => {
  button.addEventListener("click", () => {
    openBook(button.dataset.book);
  });
});

booksReaderClose?.addEventListener("click", () => {
  booksReader.classList.remove("visible");
});

// Search books in the library
booksSearchInput?.addEventListener("input", () => {
  const query = booksSearchInput.value.toLowerCase().trim();

  document.querySelectorAll("#booksApp .library-book").forEach(book => {
    const title = book.dataset.book.toLowerCase();
    book.style.display = title.includes(query) ? "" : "none";
  });
});

// Bottom navigation
document.querySelectorAll("#booksApp .books-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("#booksApp .books-tab").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    const tabName = button.dataset.booksTab;
    booksPageTitle.textContent = tabName;

    if (tabName === "Reading Now") {
      booksShelf.style.display = "grid";
      booksShelf.querySelectorAll(".library-book").forEach(book => {
        book.style.display = "";
      });
    } else if (tabName === "Library") {
      booksShelf.style.display = "grid";
      booksShelf.querySelectorAll(".library-book").forEach(book => {
        book.style.display = "";
      });
    } else if (tabName === "Book Store") {
      booksShelf.style.display = "grid";
      booksShelf.querySelectorAll(".library-book").forEach(book => {
        book.style.display = "";
      });
    } else if (tabName === "Search") {
      booksSearchInput.focus();
    }
  });
});

// See All buttons
document.querySelectorAll("#booksApp [data-books-category]").forEach(button => {
  button.addEventListener("click", () => {
    booksPageTitle.textContent = button.dataset.booksCategory;
    booksShelf.style.display = "grid";
  });
});


const readerPageContent = document.getElementById("readerPageContent");
const readerFlipPaper = document.getElementById("readerFlipPaper");
const readerFlipContent = document.getElementById("readerFlipContent");
const readerPageNumber = document.getElementById("readerPageNumber");
const readerFlipNumber = document.getElementById("readerFlipNumber");
const readerPageCounter = document.getElementById("readerPageCounter");
const readerBookType = document.getElementById("readerBookType");
const readerProgressFill = document.getElementById("readerProgressFill");
const readerPrevPage = document.getElementById("readerPrevPage");
const readerNextPage = document.getElementById("readerNextPage");
const readerContentsButton = document.getElementById("readerContentsButton");

const bookLibrary = {
  "The Starry Night": {
    type: "FICTION · NOVEL",
    pages: [
      {
        heading: "Chapter One",
        paragraphs: [
          [""],
          [""],
          [""],
          [""]
        ]
      },
      {
        heading: "Chapter Two",
        paragraphs: [
          [""],
          [""],
          [""],
          [""]
        ]
      }
    ]
  },

  "My Beloved": {
    type: "RUTH STEFANOVA",
    pages: [
      {
        heading: "Is to be known, someone loves you, it's me i'm someone.",
        paragraphs: [
          ["This book belong to,", "heading"],
          ["22 things i love about you.", "heading"],
          ["kind-hearted, beautiful, shy, loving, understanding, forgiving, patient, mature, strong, intelligent, humble, respectful, warm, calming, humorous, inspiring, loyal, sincere, hardworking, family-oriented, special, charming."],
          ["You are the calm to my cha-os. Tell me if you need me and call me if you feelin' alone 'cause i'm here, i'm always right here."]
        ]
      },
      {
        paragraphs: [
          ["25/03/2026. 00-00; 09/06/2026.", "heading"],
          ["Volume (1) Journal of self-Expression.", "heading"],
          ["Tidak dipublikasikan, hanya untuk Ruth Stefanova.", "heading"],
          ["Biru", "heading"],
          ["Email: tentangbiiru@gmail.com", "heading"],
          ["Izinkan saya menceritakan kisah tentang orang yang menyelamatkan hidup saya. Ruth Stefanova atau saya biasa memanggilnya Ute. Dia baik, dia cantik, dia memiliki mata yang paling indah, dia adalah tipe perempuan yang menunduk setiap kali menatap matanya terlalu lama. Dia adalah segalanya yang pernah saya minta. Dia menunjukkan kepada saya bahwa saya pantas untuk dicintai dan dia membuat saya jatuh cinta lagi. Terimakasih dan Maaf adalah kata yang tepat untuk diucapkan pada saat ini untuk segala hal baik yang sudah terjadi dan dilewati. Hari ini apapun yang ada di pikiranmu, siapapun yang bersamamu, menempati hatimu dan kemanapun langkah kakimu akan melangkah. Semoga selalu diberkahi oleh Tuhan dan kedua orangtua mu. Karena aku hanya ingin melihatmu bahagia dengan benar. Terima kasih sudah datang dan memberikan pengalaman yang tidak semua orang bisa alami."]
        ]
      },
      {
        paragraphs: [
          ["Maret 2026, aku gak pernah kepikiran untuk kenal kamu dengan hal yang terjadi dikehidupanmu, tapi aku selalu yakin apapun yang akan terjadi ataupun itu akan ada sebab akibatnya, itu semua sudah dari apa yang ditetapkan oleh Tuhan. Berawal dari hal yang tidak pernah terpikirkan hingga sekarang, aku bersyukur atas segala hal untuk apa yang pernah terjadi dikehidupan ini, telah dikenalkan oleh kamu yang notabennya berbeda dengan kehidupanku. Semoga kamu dapat menjadi kakak yang baik untuk adik-adik, orangtua, dan keluargamu. Aku bahagia sekali bisa kenal dengan mu, karena banyak hal yang bisa dipelajari, ditemukan, dan hal baik ataupun buruk bisa diambil dari kehidupanmu. Mungkin awal tahun 2026 merupakan tahun yang berat untuk mu tapi mengapa Tuhan memberikan suatu jalan hingga bertemu denganku."],
          ["“We never know.”", "heading"],
          ["Mungkin Tuhan ingin menunjukkan sesuatu yang baik dari semua yang sudah aku lalui. Aku juga belum benar-benar tahu apa maksudnya. Tapi aku percaya, setiap hal yang terjadi dalam hidup adalah takdir. Dan sebagai manusia, kita bisa memilih untuk menjadikannya pelajaran agar hidup kita jadi lebih baik dari sebelumnya."]
        ]
      },
      {
        paragraphs: [
          ["Awal Perkenalan", "heading"],
          ["Meeting you was one of the best times in my life. I mean, you showed me something i have never felt before. You truly made me fall in love with you without even trying"],
          ["Jika pertemuan adalah sebuah tragedi, maka tidak ada yang perlu disesali. Jika pertemuan adalah sebuah kebetulan, maka jangan dibuat menjadi kesalahan. Jika pertemuan adalah sebuah hadiah, maka terima saja apapun bentuk dan isinya. Jika pertemuan adalah memberi, maka jangan berharap kembali karena pertemuan itu adalah teka-teki."],
          ["Virtual Feelings", "heading"],
          ["“Kayanya setiap orang punya kriterianya. Enggak bisa bohong kalau kita akan terima semua. Manusia gak mungkin serba mau, pasti ada aja maunya. Dalam artian, sebenernya si kata ‘mau’ ini berasal dari hati, ya”", "heading"],
          ["Tanpa kita sadari, ternyata hati selalu tau maunya apa. Kalau ada orang nyuruh kita untuk, “Ikutin aja kata hati,” atau “Tanya hati lo maunya apa?”, terus kalau kita berlaga bingung, itu sebenernya kita bingung bukan karna kita enggak tau apa yang kita mau. Sebenernya kita bingung karena kita tau yang kita mau itu mustahil. Atau mungkin kalau kita bisa translate dengan makna yang lain adalah “Jatuh cinta dengan orang yang jauh”."],
          ["“Aku pernah bilang kan kalau kata jauh itu punya makna yang sebenernya beragam. Enggak cuma tentang jarak, tetapi juga tentang kemungkinan. Jauh, gak semua orang mau menempuh perjalanan itu, gak semua orang yakin dengan tujuan yang jauh, karena semua akan berubah seiringan dengan perjalanan itu sendiri. Yang tadinya yakin jadi enggak yakin, yang tadinya sanggup jadi capek. Itu baru tentang jarak itu sendiri ya, belum tentang kemungkinan.”"],
          ["Tapi ketika ketemu satu orang ini, bahkan ketemunya di internet, kita gak pernah liat depan mata “Dia kayak gimana?”, “Kulitnya kayak apa?”, “Hidungnya kayak gimana?”, “Kalau natap matanya kaya apa?” Kita enggak pernah tau kan, tapi kita bisa jatuh cinta sama dia, entah dari apa. Mungkin dari senyumannya, dari kelucuannya, tingkah random-nya, yang rasanya “Kok di realita gue, gue enggak pernah ketemu orang kayak gitu ya?”"],
          ["Terus tiba-tiba, tanpa direncanaain, tangan dan hati kita jalan ke dia, nemu dia di internet. Semua yang kita mau ada di dia, di tubuh satu orang. Tapi balik lagi, dia jauh."],
          ["Dan si jauh ini, semakin kita suka sama dia, kita justru terasa lebih dekat daripada orang yang ada di sekitar kita"],
          ["“Rasanya deket aja, kayak kenal, kayak kita pernah ketemu, pernah jalan bareng, itu apa ya namanya?”. "],
          ["Aku selalu bertanya-tanya, “Apakah dulu orang gak pernah kaya gini?”, “Apakah ini semua ada karena ada internet?’” karena internet berhasil melipat jarak yang tadinya sangat panjang jadi “Lumayanlah, meski berjarak tetapi tidak terlalu jauh”"],
          ["Jadi kesimpulannya, “Yang sempurna memang jauh, ya?”."],
          ["Gatau, bingung", "heading"],
          ["Aku enggak tau, dan itu juga alasan kenapa aku menyukainya. Karena aku selalu percaya bahwa akan ada satu orang yang membuatmu merasakan perasaan-perasaan yang enggak biasa, yang aneh, yang ketika orang bertanya kamu akan sangat kebingungan untuk menjawabnya."],
          ["Aku menyukainya bukan dari pakaian mewah, uang, wajahnya, bukan. Aku menyukainya dari cara ia berbicara. Sifatnya yang selalu ingin tau, menciptakan pertanyaan-pertanyaan baru selalu membuatku kagum. Ia cerdas tapi tidak pernah merasa cerdas. Ia bahkan sering mengeluarkan pertanyaan yang sebenarnya ia sudah tau, tapi tetap ditanyakannya sebab buatnya, menghargai orang lain itu dengan mengapresiasi semua pemikirannya."],
          ["Aku menyukainya bukan dari pandangan orang terhadapnya, bukan karena banyak orang bilang bahwa ia “Cantik, manis, idaman, sempurna”, bukan. Bukan itu. Tapi bukan berarti aku tidak setuju dengan ucapan orang banyak itu, aku setuju penuh. "],
          ["Tapi aku menyukainya justru dari caranya memandang persoalan-persoalan yang pelik, dari bagaimana ia menanggapi masalah di hidupnya dengan cara yang santai, bercanda, tetapi sederhana."],
          ["Aku belum pernah memandang wajahnya dari dekat. Aku juga belum pernah berbicara langsung dengannya, tetapi tiap kali ia berbicara tentang bagaimana hari dan perasaannya di hari itu, sudah cukup buatku mendengarnya. Sebab suaranya yang tenang selalu berubah menjadi lantang bila sudah membicarakan topik kesukaannya."],
          ["Dulu, tidak pernah sampai pada pemahamanku tentang mereka yang bisa saling merindukan walau tidak pernah saling bertatap sebelumnya. Dulu tidak pernah sampai pada pemikiranku mengapa banyak orang bisa sedemikian rupa menghargai jarak, bahwa yang jauh bisa menguatkan yang di hati karena kasih sayang tiap orang pasti berbeda, bentuk dan rasanya saja yang mungkin sama."],
          ["Mungkin ada yang berani mengatakan, membongkar seluruh rahasia demi membuat nyaman dan lega perasaannya. Ada juga yang lebih merasa aman bila merawat rasa senang itu sendirian saja. “Yaaa, bahwa gak semua hal perlu disampaikan dan dipasangkan. Bukankah beberapa kehadiran lebih baik diisi tanpa perpisahan?”. Dan dengan diam-diam itu bagian dari rencana. Rencana untuk tidak mendengar jawaban, “Tidak”. Semua berubah ketika aku menyukainya. Aku tidak pernah memahami semua itu sampai aku jatuh cinta dengannya."]
        ]
      },
      {
        paragraphs: [
          ["Pertemuan Pertama", "heading"],
          ["Aku yang enggak lagi mencari, tiba-tiba kedatangan tamu yang sesuai sekali sama aku. Dan rasanya menyenangkan. Akhirnya aku bisa melihat banyak warna lagi. Setelah sekian lama aku merasa dunia tuh warnanya gitu-gitu aja. "],
          ["Kamu datang ke rumah membawa banyak semangat dan harapan baru. Aku yang tadinya sudah biasa aja berurusan sama yang namanya cinta, berubah menjadi sangat antusias. Kamu adalah pengecualian itu. Kamu membuatku kembali jatuh cinta. Kamu membuatku mengerahkan nyali terakhirku untuk percaya lagi sama apa pun yang sedang kita jalanin. "],
          ["Aku sendiri juga enggak tau kenapa jadi gini. Aku enggak tau kapan pastinya perasaan aku ke kamu berubah menjadi sesuatu yang enggak bisa aku kendalikan. Sesuatu yang aku sendiri enggak bisa pahami. Yang jelas, dari awal aku ketemu kamu, aku enggak pernah berpikir, apalagi sampai berniat untuk jatuh cinta sama kamu. Makanya enggak pernah terlintas sedikit pun di dalam kepalaku untuk melihat, apalagi tertarik sama kamu."],
          ["Sampai kemudian, mulai datang interaksi-interaksi kecil itu. Dari situ aku sadar kalau ternyata kamu hangat sekali orangnya. Aku pun jadi ngerti kenapa ada banyak orang yang bisa nyaman untuk ngobrol lama sama kamu."],
          ["Sekarang, aku jadi engga bisa biasa aja ke kamu. Aku terlanjur tau tentang apa saja yang aku suka dari kamu. Aku suka suara kamu yang teduh. Aku suka wajah kamu ketika sedang berbicara denganku. Aku suka bagaimana aku bisa tenang hanya dengan mendengar suaramu dari jauh. Aku suka mencarimu di tengah banyak orang. Aku suka segala bentuk interaksi kita. "],
          ["Aku sudah enggak bisa lihat kamu dengan pandangan yang biasa aja kayak sebelumnya. Kamu adalah nama yang muncul di pikiranku ketika orang bertanya tentang apa yang aku mau. "],
          ["Beberapa minggu berlalu, obrolan demi obrolan kita mengisi hari-hariku. Dari pesan singkat yang kadang nyeleneh, cerita keseharian, sampai diskusi panjang tentang mimpi dan masa depan. Tanpa sadar, rasa nyaman itu berubah menjadi suka, dan suka itu pelan-pelan menjelma menjadi rasa rindu yang belum sempat bertemu. "],
          ["Akhirnya, kami sepakat; April akan menjadi waktu yang tepat. Bulan itu akan menjadi saksi pertemuan pertama, setelah ratusan pesan, tawa di telepon, dan rasa penasaran yang tak terbendung."],
          ["Maret menutup ceritanya dengan satu janji manis, bahwa sebentar lagi, layar ponsel bukan lagi satu-satunya tempat kita bertatap muka."],
          ["April datang seperti halaman baru yang selama ini kutunggu. Dari pertemuan pertama, jarak seakan tidak lagi menjadi penghalang. Kata-kata yang dulu hanya berani dikirim lewat layar, kini terucap langsung di hadapanmu."],
          ["Dan di bulan itu, kamu resmi menjadi pacarku. Rasanya seperti melangkah masuk ke bab baru yang penuh warna; sederhana, tapi hangatnya selalu membekas."],
          ["Hari-hari setelahnya berjalan seperti cerita yang tak pernah ingin kutamatkan. Ada tawa di sela lelah, ada genggaman tangan yang membuat dunia terasa lebih ringan. Kamu membuat segala hal yang dulu biasa, kini terasa istimewa."],
          ["Hari ini, aku menulis “Final chapter” bukan untuk mengakhiri.", "heading"],
          ["Karena jika ini adalah sebuah buku, maka aku ingin setiap bab selanjutnya selalu ada namamu.", "heading"],
          ["Thank you for being my sun, my moon, and my rainbow", "heading"]
        ]
      },
      {
        paragraphs: [
          ["If one day kamu choose lo leave me, aku cuma mau kamu tahu kalau I really love all the time we’ve spent together. Semua yang kita lewatin, dari yang simple sampai yang bikin kita sama-sama belajar, itu sangat berarti buat aku."],
          ["Aku enggak pernah menganggap itu sia-sia, even the moments we didn’t realize were special al that time. Sekarang aku baru sadar, semuanya punya tempat sendiri di hati aku"],
          ["Kalau nanti kita harus jalan masing-masing, I just hope kamu tahu kalau aku enggak akan pernah nyesel pernah kenal kamu. Because loving you and knowing you itu bagian dari hidup aku yang paling jujur.  "],
          ["Dan meskipun nanti kita jauh, aku tetap akan mendoakan kamu baik-baik aja. Semoga kamu selalu ketemu hal-hal yang bikin kamu tenang, senang, and at peace with your life."],
          ["Untuk sekarang, please stay with me when I’m not the version of me that you usually know. Saat mood aku berubah tiba-tiba, saat aku susah buat cerita apa yang sebenarnya aku rasain, saat aku bahkan enggak tahu harus gimana menghadapi semuanya."],
          ["Temenin aku ya, even when I become quiet. Even when I don’t know how to explain what’s going on in my head. Karena kadang aku cuma butuh seseorang yang tetap ada, tanpa harus selalu mengerti semuanya."],
          ["Kalau bisa, jangan ke mana-mana dulu. Stay a little longer with me. Karena di antara banyak hal yang bikin aku bingung dan lelah, kamu adalah tempat yang selalu terasa seperti rumah."],
          ["Di kamu, aku merasa aman. Di kamu, aku merasa diterima. Dan mungkin aku enggak selalu bisa mengungkapkannya dengan baik, but I hope you know how much that means to me."],
          ["Thank you for being here. Thank you for every little thing you do, for every time you choose to stay, and for every moment you make me feel like I have somewhere to come back to.", "heading"],
          ["I’m really grateful for you. More than I can put into words.", "heading"]
        ]
      },
    ]
  },

  "Surat Permohonan Maaf": {
    type: "500 · Words",
    pages: [
      {
        paragraphs: [
          ["Kepada Yts. Hanny Pertiwi aka Biru.", "heading"],
          ["Pacar dari Jeanne Gumelish.", "heading"],
          ["Hal : Surat/Essay permohonan maaf.", "heading"],
          ["Saya yang bertanda tangan di bawah ini:", "heading"],
          ["Ruth Stefanova aka Jeanne", "heading"],
          ["Sehubungan dengan tindakan kesalahan dan kelalaian yang Jeanne lakukan, yaitu, kelalaian untuk tidak mematikan DND yang berakhir tidak datang kelas yang di mana kelas tersebut ada kuis pada tanggal 29 Oktober 2026. Jeanne mengaku salah dan menyesal, hal itu seharusnya tidak terjadi yang di mana itu juga akan berimpact pada Jeanne kedepannya, entah baik atau buruk. Jeanne ingin meminta maaf dari lubuk hati Jeanne paling dalam untuk kesalahan dan kelalaian yang Jeanne lakukan."],
          ["Jeanne paham Biru juga kesal dan kecewa karena Jeanne tidak masuk kelas padahal hari ini ada kuis, dan itu semua terjadi karena kesalahanku dan kelalaianku karena alarm Jeanne yang tidak berbunyi. Padahal hal itu bisa Jeanne cegah dari minggu lalu tapi ternyata Jeanne lupa untuk mematikan Do Not Disturb (DND). Sebenarnya Jeanne sudah memasang alarm tiap kamis dan jumat tapi jadi tidak terdengar karena Jeanne lupa mematikan Do Not Disturb (DND), sehingga alarm yang seharusnya membangunkan Jeanne tidak berbunyi sama sekali. Jeanne sadar, ini bukan hal yang bisa Jeanne jadikan alasan untuk membenarkan tindakan Jeanne. Ini murni karena kurang telitinya dan kelalaian Jeanne dalam mengatur hal-hal sederhana yang seharusnya sudah menjadi tanggung jawab Jeanne."],
          ["Jeanne benar-benar menyesal karena hal itu terjadi. Jeanne harap Biru merasa bahwa Jeanne menganggap enteng tanggung jawab Jeanne sebagai mahasiswa maupun perasaan Biru sebagai pacar Jeanne. Jeanne tau Biru peduli banget sama Jeanne dan selalu ingin Jeanne lebih bertanggung jawab. Maka dari itu, rasanya sedih banget ketika Jeanne tau kelalaian Jeanne hari ini bikin Biru kesal. Jeanne benar-benar menyesal karena kelalaian kecil itu berdampak besar, bukan hanya pada absen kehadiran Jeanne di kelas tapi juga terhadap nilai kuis Jeanne dan materi yang seharusnya Jeanne dapatkan di kelas hari ini yang di mana senin depan Jeanne UTS. Jeanne seharusnya lebih teliti dan bertanggung jawab, terutama Jeanne sendiri sudah tau ada kuis pada tanggal 29 Oktober 2026. Seharusnya Jeanne memastikan alarm aktif dan juga mematikan Do Not Disturb (DND), atau tidur lebih cepat."],
          ["Yang paling membuat Jeanne menyesal adalah Jeanne tau Jeanne sudah membuat Biru kecewa dan kesal. Jeanne tau Biru peduli sekali pada Jeanne, pada kuliah Jeanne, dan pada masa depan Jeanne. Padahal Biru sendiri selalu mengingatkan Jeanne untuk lebih bertanggung jawab, dan Jeanne sangat menghargai itu. Karena itu, Jeanne juga merasa sangat berat dan sedih ketika Jeanne tau kelalaian Jeanne hari ini membuat Biru kesal dan kecewa. Jeanne sendiri tidak ingin Biru merasa usaha Jeanne kurang serius, atau merasa bahwa Jeanne tidak menghargai kesempatan dan tanggung jawab yang Jeanne miliki."],
          ["Jeanne minta maaf ya. Maaf sudah membuat Biru kecewa, khawatir, dan kesal. Jeanne sangat sayang Biru. Jeanne harap dan tidak ingin kesalahan kecil seperti ini merusak kepercayaan yang sudah Biru berikan pada Jeanne. Jeanne berjanji akan belajar dari kejadian ini dan menjadi pribadi yang lebih bertanggung jawab. Terima kasih sudah selalu peduli, meskipun Jeanne tau Biru sedang kesal sekarang. Jeanne berharap Biru bisa memberi Jeanne kesempatan untuk memperbaiki diri dan membuktikan bahwa Jeanne sungguh-sungguh menyesali kesalahanku."],
          ["Dengan permintaan maaf yang tulus dan penuh sayang, "],
          ["Jeanne."]
        ]
      }
    ]
  },

  "Ocean of Dreams": {
    type: "POETRY · COLLECTION",
    pages: [
      {
        heading: "I. The Ocean",
        paragraphs: [
          ["Some people feel like the ocean. Deep, endless, and sometimes impossible to understand. Aku tidak pernah tahu bagaimana seseorang bisa datang ke dalam hidupku dan perlahan mengubah begitu banyak hal. Bagaimana percakapan sederhana bisa menjadi sesuatu yang kutunggu, bagaimana kehadiran seseorang bisa membuat hari-hari biasa terasa lebih istimewa. Seperti laut, perasaan ini tidak selalu tenang. Ada hari ketika semuanya terasa begitu indah, ada pula saat ombak datang membawa ketakutan, keraguan, dan hal-hal yang tidak selalu bisa dijelaskan. Namun, aku belajar bahwa mencintai seseorang bukan berarti harus selalu memahami setiap bagiannya. Terkadang, cukup dengan bersedia mengenal lebih dalam, bahkan ketika ada bagian yang belum sepenuhnya kita mengerti. Dan jika aku harus menggambarkan perasaanku saat itu, mungkin aku akan menyebutnya laut. Luas, dalam, dan penuh dengan hal-hal yang masih ingin kutemukan."]
        ]
      },
      {
        heading: "II. The Moon",
        paragraphs: [
           ["The moon has always been beautiful, even from a distance. Ada sesuatu tentang bulan yang membuatku selalu ingin menatapnya sedikit lebih lama. Ia tidak selalu terlihat utuh, terkadang hanya separuh, terkadang bahkan tidak terlihat sama sekali. Namun, keberadaannya tidak pernah kehilangan keindahannya. Mungkin manusia juga seperti itu. Kita tidak selalu bisa memberikan seluruh hal yang kita punya. Ada hari ketika kita lelah, ada waktu ketika kita tidak punya banyak kata, dan ada saat ketika dunia terasa terlalu ramai untuk sekadar menjelaskan apa yang sedang kita rasakan. Namun, aku ingin percaya bahwa kasih sayang tidak harus selalu hadir dalam bentuk yang besar. Terkadang, ia sesederhana sebuah pesan singkat, suara yang familiar, perhatian kecil, atau seseorang yang tetap berusaha memahami meskipun kita sedang tidak baik-baik saja. Seperti bulan, seseorang tidak harus selalu berada tepat di samping kita untuk membuat malam terasa lebih hangat. Dan mungkin, salah satu hal terindah dari mencintai adalah menemukan seseorang yang tetap ingin kita pandangi, bahkan setelah kita mengenalnya lebih jauh."]
        ]
      },
      {
        heading: "III. Returning",
        paragraphs: [
          ["Sometimes, returning is not about going back to where we started. It's about choosing where we want to stay. Aku pernah berpikir bahwa hubungan yang baik adalah hubungan yang tidak pernah kehilangan arah. Bahwa dua orang yang saling menyayangi seharusnya selalu tahu bagaimana caranya membuat segalanya baik-baik saja. Namun, semakin jauh perjalanan ini, semakin aku mengerti bahwa tidak semua hari akan berjalan seperti yang kita harapkan. Ada perbedaan pendapat, kesalahpahaman, keheningan, dan hal-hal kecil yang terkadang membuat kita lupa bahwa kita berada di sisi yang sama. Tetapi bukankah itu bagian dari perjalanan?. Bagiku, kembali bukan selalu tentang menemukan seseorang setelah kehilangan. Terkadang, kembali adalah tentang dua orang yang setelah melewati hari yang panjang, tetap ingin saling menggenggam. Tetap ingin berbicara, memperbaiki, dan mencoba memahami satu sama lain. Aku tidak ingin menjanjikan bahwa semuanya akan selalu mudah. Aku hanya berharap, ketika keadaan tidak lagi terasa sederhana, kita tidak lupa alasan mengapa kita memulai semuanya. Because love is not only about finding each other. It's about choosing each other, over and over again."]
        ]
      },
      {
        heading: "IV. The Unwritten",
        paragraphs: [
          ["Tapi kalau ada yang bertanya, meskipun hubungan kami masih berjalan, aku tidak pernah ingin menganggapnya sebagai sesuatu yang biasa saja. Mengenalnya, aku pernah merasa sangat hidup. Aku merasa dicintai, dihargai, dan berarti. Bahkan di hari-hari sederhana, kehadirannya selalu punya cara untuk membuat segalanya terasa lebih baik. Aku tidak tahu akan sejauh apa kami berjalan. Aku juga tidak tahu apa yang menunggu di depan. Tapi untuk sekarang, aku ingin menikmati setiap bagian dari perjalanan ini. Maybe I don't need to know how our story ends. Maybe I just need to be grateful that we're still writing it. Terima kasih karena masih memilih untuk tinggal. Terima kasih karena masih menjadi bagian dari hari-hariku, bahkan dalam hal-hal kecil yang mungkin tidak selalu kusadari. Dan jika suatu hari nanti aku memutar kembali semua kenangan ini, aku ingin mengingat bahwa di antara begitu banyak hal yang pernah terjadi, ada seseorang yang dengannya aku pernah merasa segalanya."]
        ]
      }
    ]
  }
};

let currentBookTitle = "";
let currentBookPage = 0;
let isTurningPage = false;
let turnTimeout = null;

function renderReaderPage() {
  const book = bookLibrary[currentBookTitle];
  if (!book) return;

  const page = book.pages[currentBookPage];

  readerPageContent.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = page.heading;
  readerPageContent.appendChild(heading);

  page.paragraphs.forEach(([text, style]) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    if (style === "heading") paragraph.classList.add("quote");
    if (style === "poem") paragraph.classList.add("poem");

    readerPageContent.appendChild(paragraph);
  });

  readerPageNumber.textContent = currentBookPage + 1;
  readerPageCounter.textContent =
    `Page ${currentBookPage + 1} of ${book.pages.length}`;

  readerBookType.textContent = book.type;
  readerProgressFill.style.width =
    `${((currentBookPage + 1) / book.pages.length) * 100}%`;

  readerPrevPage.disabled = currentBookPage === 0;
  readerNextPage.disabled = currentBookPage === book.pages.length - 1;
}

function openBook(title) {
  if (!bookLibrary[title]) return;

  currentBookTitle = title;
  currentBookPage = 0;
  isTurningPage = false;

  if (turnTimeout) clearTimeout(turnTimeout);

  readerFlipPaper.classList.remove("turn-forward", "turn-backward");
  readerFlipPaper.style.display = "none";

  booksReaderTitle.textContent = title;
  booksReader.classList.add("visible");
  booksReader.scrollTop = 0;

  renderReaderPage();
}

function turnBookPage(direction) {
  const book = bookLibrary[currentBookTitle];

  if (!book || isTurningPage) return;

  const nextIndex = currentBookPage + direction;

  if (nextIndex < 0 || nextIndex >= book.pages.length) return;

  isTurningPage = true;

  // Simpan isi halaman lama untuk lembar yang akan berputar.
  readerFlipContent.innerHTML = readerPageContent.innerHTML;
  readerFlipNumber.textContent = currentBookPage + 1;

  readerFlipPaper.style.display = "block";
  readerFlipPaper.classList.remove("turn-forward", "turn-backward");

  // Paksa browser memulai ulang animasi.
  void readerFlipPaper.offsetWidth;

  currentBookPage = nextIndex;
  renderReaderPage();

  readerFlipPaper.classList.add(
    direction > 0 ? "turn-forward" : "turn-backward"
  );

  turnTimeout = setTimeout(() => {
    readerFlipPaper.classList.remove("turn-forward", "turn-backward");
    readerFlipPaper.style.display = "none";
    isTurningPage = false;
  }, 580);
}

readerPrevPage?.addEventListener("click", () => turnBookPage(-1));
readerNextPage?.addEventListener("click", () => turnBookPage(1));

readerContentsButton?.addEventListener("click", () => {
  const book = bookLibrary[currentBookTitle];
  if (!book) return;

  const chapters = book.pages
    .map((page, index) => `${index + 1}. ${page.heading}`)
    .join("\n");

  alert(`${currentBookTitle}\n\n${chapters}`);
});

booksReaderClose?.addEventListener("click", () => {
  booksReader.classList.remove("visible");
  readerFlipPaper.classList.remove("turn-forward", "turn-backward");
  readerFlipPaper.style.display = "none";

  if (turnTimeout) clearTimeout(turnTimeout);

  isTurningPage = false;
});

// Gunakan satu listener untuk semua cover buku.
booksApp?.addEventListener("click", event => {
  const bookButton = event.target.closest("[data-book]");
  if (!bookButton || !booksApp.contains(bookButton)) return;

  openBook(bookButton.dataset.book);
});


/* =========================
   APPLE MAPS FUNCTIONALITY
   JAKARTA + BANDUNG
========================= */

const mapsApp = document.getElementById("mapsApp");
const mapsBack = document.getElementById("mapsBack");
const mapsSearch = document.getElementById("mapsSearch");
const mapsClear = document.getElementById("mapsClear");
const mapsCityTitle = document.getElementById("mapsCityTitle");
const mapsCityDescription = document.getElementById("mapsCityDescription");
const mapsPlaces = document.getElementById("mapsPlaces");

let appleMap = null;
let currentMapCity = "bandung";
let mapsMarkers = [];
let mapRenderId = 0;

// Cache koordinat agar tidak perlu mencari ulang
const mapsGeocodeCache = {};

// =========================
// DAFTAR LOKASI
// =========================

const cityLocations = {

  jakarta: {
    title: "Jakarta, Indonesia",
    description: "Jelajahi tempat-tempat favorit di Jakarta.",
    center: [-6.2088, 106.8456],
    zoom: 12,

    places: [
      { name: "Duri Station" },
      { name: "AEON Emporium Pluit" },
      { name: "Timezone Emporium Pluit" },
      { name: "Tanah Abang Station" },
      { name: "Central Park Mall" },
      { name: "SevenDot Billiard & Cafe" },
      { name: "Mie Gacoan Gunung Sahari" },
      { name: "Soto Jakarta Bang Udin" },
      { name: "Pecel Ayam Grogol" },
      { name: "Cinepolis Mangga Dua Square" },
      { name: "KFC Mangga Dua Square" },
      { name: "The Jaya Pub" },
      { name: "ITC Mangga Dua" },
      { name: "Pasar Senen" },
      { name: "Wwarung Jangkung" },
      { name: "Sogogi Shabu & Grill Mangga Besar" },
      { name: "Kopi Kenangan Ruko Gedong Panjang" },
      { name: "Catholic Church Of Stella Maris Pluit" },
      { name: "Baywalk Mall" },
      { name: "Matchaman" },
      { name: "HAKA Dimsum Blok M" }
    ]
  },

  bandung: {
    title: "Bandung, Jawa Barat",
    description: "Jelajahi tempat-tempat favorit di Bandung.",
    center: [-6.9175, 107.6191],
    zoom: 13,

    places: [
      { name: "The People's Cafe PVJ" },
      { name: "Kisah Manis Dago" },
      { name: "Pasar Pagi Tegallega" },
      { name: "Foursis Riau" },
      { name: "Circle K Cisangkuy" },
      { name: "GoGrill-ah Cihampelas" },
      { name: "Nelendra Hotel Cihampelas" },
      { name: "Kopi Mandja Roastery" },
      { name: "BEC Bandung" },
      { name: "McDonald's BEC" },
      { name: "Studio Family Karaoke BEC" },
      { name: "2F Coffee Bandung" },
      { name: "Foursis Dipatiukur" },
      { name: "V Hotel & Residence Bandung" },
      { name: "Pasar Bunga Pandu" },
      { name: "Calluna All Day" },
      { name: "Kopi Cantel" },
      { name: "Universitas Kristen Maranatha" },
      { name: "Warunk Mang Aden" },
      { name: "Kopi Kenangan Djunjunan Pasteur" },
      { name: "Saint Peter's Cathedral Bandung" },
      { name: "Tom Sushi PVJ Mall" },
      { name: "Lenscape Studio Bandung Grandma's House" },
      { name: "Spesial Soto Boyolali Hj Hesti Trunojoyo" },
      { name: "Hidden Farm Plantshop Cafe" },
      { name: "Seblak Mamah Saleh" },
      { name: "Mie Soobek Sukajadi" },
      { name: "Fondness Bandung" },
      { name: "Peach of Cake Bandung" },
      { name: "Kawan Coffee Bandung" },
      { name: "Lawson Universitas Kristen Maranatha" },
      { name: "Vio Hotel Pasteur" },
      { name: "Bergamot Bandung" },
      { name: "Dimsum Sembilan Ayam" },
      { name: "Noid Coffee Bandung" }
    ]
  }
};


// =========================
// GEOCODING OTOMATIS
// =========================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodePlace(name, city) {

  const cacheKey = city + ":" + name.toLowerCase();

  if (mapsGeocodeCache[cacheKey] !== undefined) {
    return mapsGeocodeCache[cacheKey];
  }

  const cityData = cityLocations[city];

  const url = new URL("https://photon.komoot.io/api/");

  url.searchParams.set(
    "q",
    name + ", " + cityData.title + ", Indonesia"
  );

  url.searchParams.set("lat", cityData.center[0]);
  url.searchParams.set("lon", cityData.center[1]);
  url.searchParams.set("limit", "5");
  url.searchParams.set("lang", "en");

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Geocoding gagal");
    }

    const result = await response.json();

    const features = result.features || [];

    // Pilih hasil yang berada di sekitar kota tujuan
    const validFeatures = features.filter(feature => {

      const properties = feature.properties || {};
      const coordinates = feature.geometry?.coordinates;

      if (!coordinates || properties.countrycode !== "ID") {
        return false;
      }

      const lat = coordinates[1];
      const lng = coordinates[0];

      const latDistance = Math.abs(lat - cityData.center[0]);
      const lngDistance = Math.abs(lng - cityData.center[1]);

      const maxDistance = city === "jakarta" ? 0.35 : 0.25;

      return latDistance < maxDistance &&
             lngDistance < maxDistance;
    });

    if (!validFeatures.length) {
      mapsGeocodeCache[cacheKey] = null;
      return null;
    }

    // Utamakan hasil yang paling dekat dengan pusat kota
    validFeatures.sort((a, b) => {

      const getDistance = feature => {
        const coords = feature.geometry.coordinates;

        return Math.hypot(
          coords[1] - cityData.center[0],
          coords[0] - cityData.center[1]
        );
      };

      return getDistance(a) - getDistance(b);
    });

    const coordinates = validFeatures[0].geometry.coordinates;

    const location = [
      coordinates[1],
      coordinates[0]
    ];

    mapsGeocodeCache[cacheKey] = location;

    return location;

  } catch (error) {

    console.error("Lokasi gagal ditemukan:", name, error);

    mapsGeocodeCache[cacheKey] = null;

    return null;
  }
}


// =========================
// BUKA MAPS
// =========================

function openMapsPage() {

  mapsApp.classList.add("visible");

  if (typeof L === "undefined") {
    console.error("Leaflet belum dimuat.");
    return;
  }

  if (!appleMap) {

    appleMap = L.map("appleMap", {
      zoomControl: false,
      attributionControl: true
    }).setView(
      cityLocations[currentMapCity].center,
      cityLocations[currentMapCity].zoom
    );

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri, HERE, Garmin, USGS, and other contributors"
      }
    ).addTo(appleMap);

  }

  setTimeout(() => {

    appleMap.invalidateSize(true);

    renderMapsCity(currentMapCity);

  }, 400);

}

// =========================
// TUTUP MAPS
// =========================

function closeMapsPage() {
  mapsApp.classList.remove("visible");
}


// =========================
// HAPUS SEMUA PIN LAMA
// =========================

function clearMapsMarkers() {

  mapsMarkers.forEach(marker => {
    appleMap.removeLayer(marker);
  });

  mapsMarkers = [];
}


// =========================
// RENDER KOTA DAN PIN
// =========================

async function renderMapsCity(city) {

  currentMapCity = city;

  const renderId = ++mapRenderId;
  const data = cityLocations[city];

  mapsCityTitle.textContent = data.title;

  mapsCityDescription.textContent =
    "Memuat " + data.places.length + " lokasi...";

  document.querySelectorAll(".maps-city").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.city === city
    );

  });

  clearMapsMarkers();

  appleMap.setView(data.center, data.zoom);

  // Buat daftar tempat di bagian bawah
  mapsPlaces.innerHTML = "";

  data.places.forEach(place => {

    const button = document.createElement("button");

    button.className = "maps-place-item";
    button.textContent = "📍 " + place.name;

    button.addEventListener("click", async () => {

      if (!place.coords) {
        place.coords = await geocodePlace(place.name, city);
      }

      if (!place.coords) {
        alert("Koordinat lokasi belum ditemukan.");
        return;
      }

      if (currentMapCity !== city) return;

      appleMap.flyTo(place.coords, 17, {
        duration: 1.2
      });

      const marker = mapsMarkers.find(item =>
        item.options.placeName === place.name
      );

      if (marker) {
        marker.openPopup();
      }

    });

    mapsPlaces.appendChild(button);

  });

  // Cari koordinat satu per satu
  let successCount = 0;

  for (const place of data.places) {

    if (renderId !== mapRenderId) return;

    // Jeda agar layanan geocoding tidak dibanjiri permintaan
    await delay(300);

    place.coords = await geocodePlace(place.name, city);

    if (renderId !== mapRenderId) return;

    if (!place.coords) {
      console.warn("Pin tidak ditemukan:", place.name);
      continue;
    }

    const marker = L.marker(place.coords).addTo(appleMap);

    marker.options.placeName = place.name;

    marker.bindPopup(`
      <div style="min-width:130px">
        <b>${place.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</b>
      </div>
    `);

    mapsMarkers.push(marker);

    successCount++;

  }

  if (renderId !== mapRenderId) return;

  mapsCityDescription.textContent =
    successCount + " dari " + data.places.length +
    " lokasi berhasil dimuat.";

  console.log(
    city + ": " + successCount + "/" + data.places.length +
    " pin berhasil dimuat."
  );
}


// =========================
// GANTI KOTA
// =========================

document.querySelectorAll(".maps-city").forEach(button => {

  button.addEventListener("click", () => {

    renderMapsCity(button.dataset.city);

  });

});


// =========================
// TOMBOL KEMBALI
// =========================

mapsBack.addEventListener("click", closeMapsPage);


// =========================
// BUKA DARI HOME SCREEN
// =========================

document.querySelector('.app-item[data-app="Maps"]')
  ?.addEventListener("click", openMapsPage);


// =========================
// CLEAR SEARCH
// =========================

mapsClear.addEventListener("click", () => {

  mapsSearch.value = "";
  mapsSearch.focus();

});


// =========================
// SEARCH MAPS
// =========================

mapsSearch.addEventListener("keydown", async event => {

  if (event.key !== "Enter") return;

  const query = mapsSearch.value.trim().toLowerCase();

  if (!query) return;

  const places = cityLocations[currentMapCity].places;

  const found = places.find(place =>
    place.name.toLowerCase().includes(query)
  );

  let coords = null;
  let placeName = query;

  if (found) {

    placeName = found.name;

    coords = found.coords ||
      await geocodePlace(found.name, currentMapCity);

    found.coords = coords;

  } else {

    coords = await geocodePlace(query, currentMapCity);

  }

  if (!coords) {
    alert("Lokasi tidak ditemukan. Coba nama tempat yang lebih lengkap.");
    return;
  }

  appleMap.flyTo(coords, 17, {
    duration: 1.2
  });

  const existingMarker = mapsMarkers.find(marker =>
    marker.options.placeName === placeName
  );

  if (existingMarker) {

    existingMarker.openPopup();

  } else {

    const marker = L.marker(coords).addTo(appleMap);

    marker.bindPopup(
      "<b>" + placeName + "</b>"
    ).openPopup();

    mapsMarkers.push(marker);

  }

});


// =========================
// ZOOM IN
// =========================

document.getElementById("mapsZoomIn")
  .addEventListener("click", () => {

    if (appleMap) appleMap.zoomIn();

  });


// =========================
// ZOOM OUT
// =========================

document.getElementById("mapsZoomOut")
  .addEventListener("click", () => {

    if (appleMap) appleMap.zoomOut();

  });


// =========================
// LOKASI SAYA
// =========================

document.getElementById("mapsLocate")
  .addEventListener("click", () => {

    if (!navigator.geolocation) {

      alert("Browser tidak mendukung lokasi.");
      return;

    }

    navigator.geolocation.getCurrentPosition(position => {

      const coords = [
        position.coords.latitude,
        position.coords.longitude
      ];

      appleMap.setView(coords, 16);

      L.marker(coords)
        .addTo(appleMap)
        .bindPopup("Lokasi Anda")
        .openPopup();

    }, () => {

      alert(
        "Tidak dapat mengakses lokasi. Periksa izin lokasi browser."
      );

    });

  });

/* =========================
   APPLE MAIL FUNCTIONALITY
========================= */

const mailApp = document.getElementById("mailApp");

const mailPages = {
  inbox: document.getElementById("mailInboxPage"),
  detail: document.getElementById("mailDetailPage"),
  compose: document.getElementById("mailComposePage"),
  more: document.getElementById("mailMorePage")
};

let currentMailFolder = "Inbox";
let currentMail = null;
let mailFilter = "all";
let editingDraftId = null;

let mailMessages = [
  {
    id: 1,
    sender: "Biru",
    email: "biru@gmail.com",
    subject: "Just thinking about you",
    body: "Hey,\n\nI just wanted to say hello.\n\nI hope everything is going well. Maybe we can talk again soon.\n\nSee you!",
    date: "Today",
    folder: "Inbox",
    unread: true,
    star: true
  },
  {
    id: 2,
    sender: "Biru",
    email: "biru@gmail.com",
    subject: "How was your day?",
    body: "Hii!\n\nI hope you had a wonderful day today.\n\nDon't forget to take some rest. Have a good night!\n\nTake care ♡",
    date: "Yesterday",
    folder: "Inbox",
    unread: true,
    star: false
  },
  {
    id: 3,
    sender: "Agoda Customer Service",
    email: "no-replay@agoda.com",
    subject: "Vio Hotel - Bandung",
    body: "Reservasi hotel Anda telah sukses dikonfimasi.\n\nDetail Pesanan:\nCheck-in (07 Nov 2026) s/d Check-out (08 Nov 2026)\nKamar - Superior Double Bed Room\nJumlah Kamar - 1 Kamar\nTamu per Kamar - Maks. 2 Dewasa",
    date: "Sab, 7 Nov - Min, 8 Nov",
    folder: "Inbox",
    unread: false,
    star: true
  },
  {
    id: 4,
    sender: "Tix-ID",
    email: "info@tix-id.com",
    subject: "Spider-Man: Brand New Day",
    body: "Tiket Anda telah sukses dikonfimasi.\n\nDetail Pesanan:\n2 Tiket - A7, A8\n Detail Lokasi:\mMangga Dua Square Cinepolis, Regular, Cinema 4",
    date: "Kam, 30 Jul - 19:45",
    folder: "Inbox",
    unread: false,
    star: false
  },
  {
    id: 5,
    sender: "Traveloka.com",
    email: "booking@traveloka.com",
    subject: "V Hotel & Residence - Bandung",
    body: "Reservasi hotel Anda telah sukses dikonfimasi.\n\nDetail Pesanan:\nCheck-in (09 Jun 2026) s/d Check-out (10 Jun 2026)\nKamar - Deluxe With Balcony\nJumlah Kamar - 1 Kamar\nTamu per Kamar - Maks. 2 Dewasa",
    date: "Sel, 9 Jun - Rab, 10 Jun",
    folder: "Inbox",
    unread: false,
    star: false
  },
  {
    id: 6,
    sender: "Traveloka.com",
    email: "booking@traveloka.com",
    subject: "Nalendra Hotel Cihampelas - Bandung",
    body: "Reservasi hotel Anda telah sukses dikonfimasi.\n\nDetail Pesanan:\nCheck-in (01 Mei 2026) s/d Check-out (02 Mei 2026)\nKamar - Standard Double\nJumlah Kamar - 1 Kamar\nTamu per Kamar - Maks. 2 Dewasa",
    date: "Jum, 1 Mei - Sab, 2 Mei",
    folder: "Inbox",
    unread: false,
    star: false
  }
];

let mailNextId = 7;


// =========================
// PAGE NAVIGATION
// =========================

function showMailPage(page) {

  Object.values(mailPages).forEach(item => {
    item.classList.remove("active");
  });

  mailPages[page].classList.add("active");

}


// =========================
// OPEN MAIL APP
// =========================

function openMailApp() {

  mailApp.classList.add("visible");

  currentMailFolder = "Inbox";

  showMailPage("inbox");

  renderMailMessages();

}


// =========================
// CLOSE MAIL APP
// =========================

function closeMailApp() {

  mailApp.classList.remove("visible");

}


// =========================
// RENDER EMAIL LIST
// =========================

function renderMailMessages() {

  const list = document.getElementById("mailMessageList");
  const empty = document.getElementById("mailEmpty");

  list.innerHTML = "";

  let messages = mailMessages.filter(message => {

    if (currentMailFolder === "VIP") {
      return message.star && message.folder !== "Trash";
    }

    return message.folder === currentMailFolder;

  });

  if (mailFilter === "unread") {
    messages = messages.filter(message => message.unread);
  }

  const search = document.getElementById("mailSearch")
    .value.trim().toLowerCase();

  if (search) {
    messages = messages.filter(message =>
      message.sender.toLowerCase().includes(search) ||
      message.subject.toLowerCase().includes(search) ||
      message.body.toLowerCase().includes(search)
    );
  }

  document.getElementById("mailFolderTitle").textContent =
    currentMailFolder;

  document.getElementById("mailInboxLabel").textContent =
    currentMailFolder;

  empty.classList.toggle("show", messages.length === 0);

  messages.forEach(message => {

    const item = document.createElement("div");

    item.className =
      "mail-message" + (message.unread ? " unread" : "");

    const avatar = document.createElement("div");
    avatar.className = "mail-avatar";
    avatar.textContent = message.sender.charAt(0).toUpperCase();

    const content = document.createElement("div");
    content.className = "mail-message-content";

    const top = document.createElement("div");
    top.className = "mail-message-top";

    const sender = document.createElement("span");
    sender.className = "mail-message-name";
    sender.textContent = message.sender;

    const date = document.createElement("span");
    date.className = "mail-message-date";
    date.textContent = message.date;

    top.append(sender, date);

    const subject = document.createElement("div");
    subject.className = "mail-message-subject";
    subject.textContent = message.subject;

    const preview = document.createElement("div");
    preview.className = "mail-message-preview";
    preview.textContent = message.body;

    content.append(top, subject, preview);

    if (message.star) {
      const star = document.createElement("span");
      star.className = "mail-message-star";
      star.textContent = "★";
      top.appendChild(star);
    }

    item.append(avatar, content);

    item.addEventListener("click", () => {
      openMailDetail(message.id);
    });

    list.appendChild(item);

  });

}


// =========================
// OPEN EMAIL DETAIL
// =========================

function openMailDetail(id) {

  const message = mailMessages.find(item => item.id === id);

  if (!message) return;

  currentMail = message;

  message.unread = false;

  document.getElementById("mailDetailSubject").textContent =
    message.subject;

  document.getElementById("mailSenderName").textContent =
    message.sender;

  document.getElementById("mailSenderAddress").textContent =
    message.email;

  document.getElementById("mailSenderAvatar").textContent =
    message.sender.charAt(0).toUpperCase();

  document.getElementById("mailSenderDate").textContent =
    message.date;

  document.getElementById("mailDetailRecipient").textContent =
    message.folder === "Sent" ? message.email : "Me";

  document.getElementById("mailDetailBody").textContent =
    message.body;

  document.getElementById("mailStarToggle").textContent =
    message.star ? "★" : "☆";

  showMailPage("detail");

  renderMailMessages();

}


// =========================
// BACK TO INBOX
// =========================

document.getElementById("mailDetailBack")
  .addEventListener("click", () => {

    showMailPage("inbox");

    renderMailMessages();

  });


// =========================
// CHANGE FOLDER
// =========================

function changeMailFolder(folder) {

  currentMailFolder = folder;

  document.getElementById("mailSearch").value = "";

  document.querySelectorAll(".mail-tab").forEach(tab => {

    tab.classList.toggle(
      "active",
      tab.dataset.folder === folder
    );

  });

  showMailPage("inbox");

  renderMailMessages();

}


// =========================
// TAB NAVIGATION
// =========================

document.querySelectorAll(".mail-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    const folder = tab.dataset.folder;

    if (folder === "More") {
      showMailPage("more");
      return;
    }

    changeMailFolder(folder);

  });

});

document.querySelectorAll(".mail-folder-list button")
  .forEach(button => {

    button.addEventListener("click", () => {

      changeMailFolder(button.dataset.folder);

    });

  });

document.getElementById("mailMoreBack")
  .addEventListener("click", () => {

    showMailPage("inbox");

  });


// =========================
// FILTER ALL / UNREAD
// =========================

document.querySelectorAll(".mail-filter-btn")
  .forEach(button => {

    button.addEventListener("click", () => {

      mailFilter = button.dataset.filter;

      document.querySelectorAll(".mail-filter-btn")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      renderMailMessages();

    });

  });


// =========================
// SEARCH EMAIL
// =========================

document.getElementById("mailSearch")
  .addEventListener("input", renderMailMessages);

document.getElementById("mailSearchClear")
  .addEventListener("click", () => {

    document.getElementById("mailSearch").value = "";

    renderMailMessages();

  });


// =========================
// COMPOSE EMAIL
// =========================

function openMailCompose() {

  editingDraftId = null;

  document.getElementById("mailTo").value = "";
  document.getElementById("mailCc").value = "";
  document.getElementById("mailSubject").value = "";
  document.getElementById("mailComposeBody").value = "";

  showMailPage("compose");

}

document.getElementById("mailCompose")
  .addEventListener("click", openMailCompose);


// =========================
// CANCEL COMPOSE
// =========================

document.getElementById("mailComposeCancel")
  .addEventListener("click", () => {

    showMailPage("inbox");

  });


// =========================
// SAVE DRAFT
// =========================

function saveMailDraft() {

  const to = document.getElementById("mailTo").value.trim();
  const subject = document.getElementById("mailSubject").value.trim();
  const body = document.getElementById("mailComposeBody").value;

  if (!to && !subject && !body.trim()) {
    showMailPage("inbox");
    return;
  }

  const draft = {
    id: editingDraftId || mailNextId++,
    sender: "Me",
    email: "me@example.com",
    to: to,
    cc: document.getElementById("mailCc").value,
    subject: subject || "(No Subject)",
    body: body,
    date: "Just now",
    folder: "Drafts",
    unread: false,
    star: false
  };

  const existing = mailMessages.find(item =>
    item.id === draft.id
  );

  if (existing) {
    Object.assign(existing, draft);
  } else {
    mailMessages.unshift(draft);
  }

  editingDraftId = null;

  alert("Draft saved.");

  changeMailFolder("Drafts");

}

document.getElementById("mailSaveDraft")
  .addEventListener("click", saveMailDraft);


// =========================
// SEND EMAIL SIMULATION
// =========================

document.getElementById("mailSend")
  .addEventListener("click", () => {

    const to = document.getElementById("mailTo").value.trim();

    const subject = document.getElementById("mailSubject").value.trim();

    const body = document.getElementById("mailComposeBody").value;

    if (!to || !to.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!subject && !body.trim()) {
      alert("Please enter a subject or message.");
      return;
    }

    const sentMessage = {
      id: mailNextId++,
      sender: "Me",
      email: "me@example.com",
      to: to,
      subject: subject || "(No Subject)",
      body: body,
      date: "Just now",
      folder: "Sent",
      unread: false,
      star: false
    };

    mailMessages.unshift(sentMessage);

    // Hapus draft jika sedang mengedit
    if (editingDraftId) {
      mailMessages = mailMessages.filter(item =>
        item.id !== editingDraftId
      );
      editingDraftId = null;
    }

    alert("Email sent successfully! (Simulation)");

    changeMailFolder("Sent");

  });


// =========================
// OPEN DRAFT FOR EDITING
// =========================

function openDraft(message) {

  editingDraftId = message.id;

  document.getElementById("mailTo").value =
    message.to || "";

  document.getElementById("mailCc").value =
    message.cc || "";

  document.getElementById("mailSubject").value =
    message.subject === "(No Subject)" ? "" : message.subject;

  document.getElementById("mailComposeBody").value =
    message.body;

  showMailPage("compose");

}


// =========================
// STAR / VIP
// =========================

document.getElementById("mailStarToggle")
  .addEventListener("click", () => {

    if (!currentMail) return;

    currentMail.star = !currentMail.star;

    document.getElementById("mailStarToggle").textContent =
      currentMail.star ? "★" : "☆";

    renderMailMessages();

  });


// =========================
// DELETE EMAIL
// =========================

document.getElementById("mailDetailTrash")
  .addEventListener("click", () => {

    if (!currentMail) return;

    if (currentMail.folder === "Trash") {

      mailMessages = mailMessages.filter(item =>
        item.id !== currentMail.id
      );

    } else {

      currentMail.folder = "Trash";

    }

    currentMail = null;

    changeMailFolder("Inbox");

  });


// =========================
// REPLY EMAIL
// =========================

document.getElementById("mailReply")
  .addEventListener("click", () => {

    if (!currentMail) return;

    openMailCompose();

    document.getElementById("mailTo").value =
      currentMail.email;

    document.getElementById("mailSubject").value =
      "Re: " + currentMail.subject;

  });


// =========================
// FORWARD EMAIL
// =========================

document.getElementById("mailForward")
  .addEventListener("click", () => {

    if (!currentMail) return;

    openMailCompose();

    document.getElementById("mailSubject").value =
      "Fwd: " + currentMail.subject;

    document.getElementById("mailComposeBody").value =
      "\n\n---------- Forwarded message ----------\n" +
      "From: " + currentMail.sender + "\n" +
      "Subject: " + currentMail.subject + "\n\n" +
      currentMail.body;

  });


// =========================
// DRAFT CLICK SUPPORT
// =========================

const originalRenderMailMessages = renderMailMessages;

// Open drafts in compose mode
document.getElementById("mailMessageList")
  .addEventListener("dblclick", event => {

    if (currentMailFolder !== "Drafts") return;

    const item = event.target.closest(".mail-message");

    if (!item) return;

    const index = [...item.parentElement.children].indexOf(item);

    const drafts = mailMessages.filter(message =>
      message.folder === "Drafts"
    );

    if (drafts[index]) {
      openDraft(drafts[index]);
    }

  });


// =========================
// APP HOME SCREEN CONNECTION
// =========================

document.querySelector('.app-item[data-app="Mail"]')
  ?.addEventListener("click", openMailApp);


// INITIAL RENDER
renderMailMessages();

document.getElementById("mailInboxLabel")
  .addEventListener("click", closeMailApp);



/* =========================
   APPLE NOTES JAVASCRIPT
========================= */

const notesApp = document.getElementById("notesApp");
const notesListPage = document.getElementById("notesListPage");
const notesEditorPage = document.getElementById("notesEditorPage");

const notesList = document.getElementById("notesList");
const notesTitle = document.getElementById("notesTitle");
const notesContent = document.getElementById("notesContent");
const notesSearch = document.getElementById("notesSearch");

let notesData = JSON.parse(localStorage.getItem("appleNotesData")) || [
  {
    id: 1,
    title: "Welcome to Notes",
    content: "This is your personal space.\n\nStart writing your thoughts here.",
    date: new Date().toISOString()
  }
];

let activeNoteId = null;

function saveNotesData() {
  localStorage.setItem("appleNotesData", JSON.stringify(notesData));
}

function showNotesPage(page) {
  notesListPage.classList.remove("active");
  notesEditorPage.classList.remove("active");
  page.classList.add("active");
}

function openNotesApp() {
  notesApp.classList.add("visible");
  showNotesPage(notesListPage);
  renderNotes();
}

function closeNotesApp() {
  notesApp.classList.remove("visible");
}

function renderNotes() {
  const keyword = notesSearch.value.toLowerCase();

  const filtered = notesData.filter(note =>
    (note.title + " " + note.content)
      .toLowerCase()
      .includes(keyword)
  );

  notesList.innerHTML = "";

  filtered.sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  filtered.forEach(note => {
    const item = document.createElement("div");
    item.className = "notes-item";

    const date = new Date(note.date);
    const preview = note.content || "No additional text";

    const dateText = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    const title = document.createElement("h3");
    title.textContent = note.title || "New Note";

    const dateLabel = document.createElement("small");
    dateLabel.textContent = dateText;

    const description = document.createElement("p");
    description.textContent = preview;

    item.append(dateLabel, title, description);

    item.addEventListener("click", () => {
      editNote(note.id);
    });

    notesList.appendChild(item);
  });

  if (filtered.length === 0) {
    notesList.innerHTML =
      '<div class="notes-empty">No Notes Found</div>';
  }

  const count = notesData.length;
  document.getElementById("notesCount").textContent =
    `${count} Notes`;

  document.getElementById("notesFooterCount").textContent =
    `${count} Notes`;
}

function createNote() {
  const note = {
    id: Date.now(),
    title: "",
    content: "",
    date: new Date().toISOString()
  };

  notesData.unshift(note);
  activeNoteId = note.id;

  saveNotesData();

  notesTitle.value = "";
  notesContent.value = "";

  document.getElementById("notesDate").textContent = "Today";
  document.getElementById("notesSaveStatus").textContent = "Saved";

  showNotesPage(notesEditorPage);
  notesTitle.focus();
}

function editNote(id) {
  const note = notesData.find(item => item.id === id);
  if (!note) return;

  activeNoteId = id;

  notesTitle.value = note.title;
  notesContent.value = note.content;

  document.getElementById("notesDate").textContent =
    new Date(note.date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

  showNotesPage(notesEditorPage);
}

function updateActiveNote() {
  const note = notesData.find(item => item.id === activeNoteId);
  if (!note) return;

  note.title = notesTitle.value;
  note.content = notesContent.value;
  note.date = new Date().toISOString();

  saveNotesData();

  document.getElementById("notesSaveStatus").textContent = "Saved";
}

function backToNotesList() {
  updateActiveNote();
  showNotesPage(notesListPage);
  renderNotes();
}

// Event listeners

document.querySelector('.app-item[data-app="Notes"]')
  ?.addEventListener("click", openNotesApp);

document.getElementById("notesHome")
  .addEventListener("click", closeNotesApp);

document.getElementById("notesNew")
  .addEventListener("click", createNote);

document.getElementById("notesCreate")
  .addEventListener("click", createNote);

document.getElementById("notesBack")
  .addEventListener("click", backToNotesList);

notesTitle.addEventListener("input", updateActiveNote);
notesContent.addEventListener("input", updateActiveNote);

notesSearch.addEventListener("input", renderNotes);


// Delete Note
document.getElementById("notesDelete")
  .addEventListener("click", () => {
    if (!activeNoteId) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    notesData = notesData.filter(
      note => note.id !== activeNoteId
    );

    saveNotesData();

    activeNoteId = null;

    notesTitle.value = "";
    notesContent.value = "";

    showNotesPage(notesListPage);
    renderNotes();
  });


/* =========================
   APPLE CLOCK JAVASCRIPT
========================= */

const clockApp = document.getElementById("clockApp");
const clockPages = {
  World: document.getElementById("clockWorldPage"),
  Alarm: document.getElementById("clockAlarmPage"),
  Stopwatch: document.getElementById("clockStopwatchPage"),
  Timer: document.getElementById("clockTimerPage")
};

let currentClockTab = "World";

function openClockApp() {
  clockApp.classList.add("visible");
  showClockTab("World");
  renderWorldClocks();
}

function closeClockApp() {
  clockApp.classList.remove("visible");
}

function showClockTab(tab) {
  currentClockTab = tab;

  Object.entries(clockPages).forEach(([name, page]) => {
    page.classList.toggle("active", name === tab);
  });

  document.getElementById("clockPageTitle").textContent =
    tab === "World" ? "World Clock" :
    tab === "Alarm" ? "Alarm" :
    tab;

  document.querySelectorAll("[data-clock-tab]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.clockTab === tab
    );
  });
}

document.querySelector('.app-item[data-app="Clock"]')
  ?.addEventListener("click", openClockApp);

document.getElementById("clockHome")
  .addEventListener("click", closeClockApp);

document.querySelectorAll("[data-clock-tab]").forEach(button => {
  button.addEventListener("click", () => {
    showClockTab(button.dataset.clockTab);
  });
});

/* World Clock */

const worldCities = [
  { name: "Jakarta", zone: "Asia/Jakarta" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Singapore", zone: "Asia/Singapore" },
  { name: "London", zone: "Europe/London" },
  { name: "New York", zone: "America/New_York" },
  { name: "Paris", zone: "Europe/Paris" }
];

function renderWorldClocks() {
  const container = document.getElementById("worldClockList");

  container.innerHTML = worldCities.map(city => {
    const now = new Date();

    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: city.zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(now);

    const date = new Intl.DateTimeFormat("en-US", {
      timeZone: city.zone,
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(now);

    return `
      <div class="world-clock-item">
        <div>
          <div class="world-clock-city">${city.name}</div>
          <div class="world-clock-name">${date}</div>
        </div>
        <div>
          <div class="world-clock-time">${time}</div>
          <div class="world-clock-date">${city.zone}</div>
        </div>
      </div>
    `;
  }).join("");
}

setInterval(() => {
  if (clockApp.classList.contains("visible") &&
      currentClockTab === "World") {
    renderWorldClocks();
  }
}, 1000);

/* Alarm */

let alarms = [];

function renderAlarms() {
  const container = document.getElementById("alarmList");

  container.innerHTML = alarms.map((alarm, index) => `
    <div class="alarm-item">
      <div>
        <div class="alarm-time">${alarm.time}</div>
        <div class="alarm-label">${alarm.label || "Alarm"}</div>
      </div>
      <input
        class="alarm-toggle"
        type="checkbox"
        data-alarm="${index}"
        ${alarm.enabled ? "checked" : ""}
      >
    </div>
  `).join("");
}

document.getElementById("addAlarm").addEventListener("click", () => {
  const time = prompt("Set alarm time (HH:MM)", "07:00");

  if (!time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    if (time) alert("Please use HH:MM format.");
    return;
  }

  alarms.push({
    time,
    label: "Alarm",
    enabled: true
  });

  renderAlarms();
});

document.getElementById("alarmList").addEventListener("change", event => {
  if (event.target.matches("[data-alarm]")) {
    alarms[Number(event.target.dataset.alarm)].enabled =
      event.target.checked;
  }
});

/* Stopwatch */

let stopwatchElapsed = 0;
let stopwatchStartedAt = 0;
let stopwatchInterval = null;
let stopwatchRunning = false;

function formatStopwatch(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(ms / 1000) % 60;
  const centiseconds = Math.floor(ms % 1000 / 10);

  return `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.` +
    `${String(centiseconds).padStart(2, "0")}`;
}

function updateStopwatch() {
  const elapsed = stopwatchElapsed +
    (stopwatchRunning ? Date.now() - stopwatchStartedAt : 0);

  document.getElementById("stopwatchDisplay").textContent =
    formatStopwatch(elapsed);
}

document.getElementById("stopwatchStart").addEventListener("click", () => {
  if (!stopwatchRunning) {
    stopwatchStartedAt = Date.now();
    stopwatchRunning = true;

    document.getElementById("stopwatchStart").textContent = "Stop";
    document.getElementById("stopwatchStart").style.color = "#ff453a";

    stopwatchInterval = setInterval(updateStopwatch, 30);
  } else {
    stopwatchElapsed += Date.now() - stopwatchStartedAt;
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);

    document.getElementById("stopwatchStart").textContent = "Start";
    document.getElementById("stopwatchStart").style.color = "#30d158";

    updateStopwatch();
  }
});

document.getElementById("stopwatchReset").addEventListener("click", () => {
  stopwatchElapsed = 0;
  stopwatchStartedAt = Date.now();

  if (!stopwatchRunning) {
    updateStopwatch();
  }

  document.getElementById("stopwatchLaps").innerHTML = "";
});

/* Timer */

let timerRemaining = 0;
let timerInterval = null;
let timerRunning = false;

function formatTimer(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;

  return `${String(h).padStart(2, "0")}:` +
    `${String(m).padStart(2, "0")}:` +
    `${String(s).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  document.getElementById("timerDisplay").textContent =
    formatTimer(timerRemaining);
}

document.getElementById("timerStart").addEventListener("click", () => {
  if (timerRunning) return;

  if (timerRemaining <= 0) {
    const h = Number(document.getElementById("timerHours").value) || 0;
    const m = Number(document.getElementById("timerMinutes").value) || 0;
    const s = Number(document.getElementById("timerSeconds").value) || 0;

    timerRemaining = h * 3600 + m * 60 + s;
  }

  if (timerRemaining <= 0) {
    alert("Please set a timer duration.");
    return;
  }

  timerRunning = true;

  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerDisplay();

    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      alert("Timer Finished!");
    }
  }, 1000);
});

document.getElementById("timerCancel").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  timerRemaining = 0;
  updateTimerDisplay();
});


/* =========================
   APPLE WEATHER JAVASCRIPT
========================= */

const weatherApp = document.getElementById("weatherApp");

let weatherCurrentCity = {
  name: "Jakarta",
  country: "Indonesia",
  latitude: -6.2088,
  longitude: 106.8456
};

let weatherSavedCities = [
  weatherCurrentCity,
  {
    name: "Bandung",
    country: "Indonesia",
    latitude: -6.9175,
    longitude: 107.6191
  },
  {
    name: "Surabaya",
    country: "Indonesia",
    latitude: -7.2575,
    longitude: 112.7521
  }
];

const weatherCodes = {
  0: ["Clear Sky", "☀️"],
  1: ["Mainly Clear", "🌤️"],
  2: ["Partly Cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Rime Fog", "🌫️"],
  51: ["Light Drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy Drizzle", "🌧️"],
  61: ["Light Rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy Rain", "🌧️"],
  71: ["Light Snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy Snow", "❄️"],
  80: ["Rain Showers", "🌦️"],
  81: ["Rain Showers", "🌧️"],
  82: ["Heavy Showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm", "⛈️"],
  99: ["Heavy Thunderstorm", "⛈️"]
};

function weatherInfo(code) {
  return weatherCodes[code] || ["Cloudy", "☁️"];
}

function weatherFormatTime(value) {
  return new Date(value).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function weatherFormatDay(value) {
  return new Date(value + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short"
  });
}

async function loadWeather(city = weatherCurrentCity) {
  document.getElementById("weatherCondition").textContent =
    "Loading weather...";

  try {
    const params = new URLSearchParams({
      latitude: city.latitude,
      longitude: city.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "weather_code",
        "wind_speed_10m"
      ].join(","),
      hourly: [
        "temperature_2m",
        "precipitation_probability",
        "weather_code"
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "uv_index_max"
      ].join(","),
      timezone: "auto",
      forecast_days: 10
    });

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?" + params
    );

    if (!response.ok) {
      throw new Error("Weather service unavailable");
    }

    const data = await response.json();

    weatherCurrentCity = city;

    renderCurrentWeather(data);
    renderHourlyWeather(data);
    renderDailyWeather(data);
    renderWeatherDetails(data);

    document.getElementById("weatherUpdated").textContent =
      "Updated " + new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });

  } catch (error) {
    document.getElementById("weatherCondition").textContent =
      "Unable to load weather. Please try again.";

    console.error("Weather error:", error);
  }
}

/* Current Weather */

function renderCurrentWeather(data) {
  const current = data.current;
  const daily = data.daily;
  const info = weatherInfo(current.weather_code);

  document.getElementById("weatherCity").textContent =
    weatherCurrentCity.name;

  document.getElementById("weatherCondition").textContent =
    info[0];

  document.getElementById("weatherTemperature").textContent =
    Math.round(current.temperature_2m) + "°";

  document.getElementById("weatherHighLow").textContent =
    `H: ${Math.round(daily.temperature_2m_max[0])}°  ` +
    `L: ${Math.round(daily.temperature_2m_min[0])}°`;

  document.getElementById("weatherFeelsLike").textContent =
    `Feels like ${Math.round(current.apparent_temperature)}°`;
}

/* Hourly Forecast */

function renderHourlyWeather(data) {
  const container = document.getElementById("weatherHourly");
  const hourly = data.hourly;

  const now = new Date();
  let startIndex = hourly.time.findIndex(time =>
    new Date(time) >= now
  );

  if (startIndex < 0) startIndex = 0;

  container.innerHTML = "";

  for (let i = startIndex; i < Math.min(startIndex + 24, hourly.time.length); i++) {
    const hour = new Date(hourly.time[i]);
    const info = weatherInfo(hourly.weather_code[i]);

    const timeLabel = i === startIndex
      ? "Now"
      : hour.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        });

    const item = document.createElement("div");
    item.className = "weather-hour-item";

    const time = document.createElement("span");
    time.textContent = timeLabel;

    const icon = document.createElement("span");
    icon.className = "hour-icon";
    icon.textContent = info[1];

    const temperature = document.createElement("strong");
    temperature.textContent =
      Math.round(hourly.temperature_2m[i]) + "°";

    const rain = document.createElement("small");
    rain.textContent =
      (hourly.precipitation_probability[i] ?? 0) + "%";

    item.append(time, icon, temperature, rain);
    container.appendChild(item);
  }
}

/* 10-Day Forecast */

function renderDailyWeather(data) {
  const container = document.getElementById("weatherDaily");
  const daily = data.daily;

  const minTemp = Math.min(...daily.temperature_2m_min);
  const maxTemp = Math.max(...daily.temperature_2m_max);
  const range = Math.max(1, maxTemp - minTemp);

  container.innerHTML = "";

  daily.time.forEach((date, index) => {
    const info = weatherInfo(daily.weather_code[index]);
    const low = Math.round(daily.temperature_2m_min[index]);
    const high = Math.round(daily.temperature_2m_max[index]);

    const position = ((low - minTemp) / range) * 100;
    const width = Math.max(12, ((high - low) / range) * 100);

    const item = document.createElement("div");
    item.className = "weather-day";

    const day = document.createElement("span");
    day.className = "weather-day-name";
    day.textContent = index === 0 ? "Today" : weatherFormatDay(date);

    const icon = document.createElement("span");
    icon.className = "weather-day-icon";
    icon.textContent = info[1];

    const lowText = document.createElement("span");
    lowText.className = "weather-day-low";
    lowText.textContent = low + "°";

    const bar = document.createElement("div");
    bar.className = "weather-temp-bar";

    const fill = document.createElement("span");
    fill.style.marginLeft = position + "%";
    fill.style.width = width + "%";

    bar.appendChild(fill);

    const highText = document.createElement("span");
    highText.style.textAlign = "right";
    highText.textContent = high + "°";

    item.append(day, icon, lowText, bar, highText);
    container.appendChild(item);
  });
}

/* Weather Details */

function renderWeatherDetails(data) {
  const current = data.current;
  const daily = data.daily;

  const uv = daily.uv_index_max[0] ?? 0;

  document.getElementById("weatherUV").textContent =
    uv.toFixed(1);

  document.getElementById("weatherUVLabel").textContent =
    uv < 3 ? "Low" :
    uv < 6 ? "Moderate" :
    uv < 8 ? "High" :
    uv < 11 ? "Very High" : "Extreme";

  document.getElementById("weatherSunrise").textContent =
    weatherFormatTime(daily.sunrise[0]);

  document.getElementById("weatherSunset").textContent =
    weatherFormatTime(daily.sunset[0]);

  document.getElementById("weatherWind").textContent =
    Math.round(current.wind_speed_10m) + " km/h";

  document.getElementById("weatherHumidity").textContent =
    current.relative_humidity_2m + "%";

  document.getElementById("weatherFeelsDetail").textContent =
    Math.round(current.apparent_temperature) + "°";
}

/* Open and Close */

function openWeatherApp() {
  weatherApp.classList.add("visible");
  loadWeather();
  renderWeatherCities();
}

function closeWeatherApp() {
  weatherApp.classList.remove("visible");
  document.getElementById("weatherCityPanel")
    .classList.remove("visible");
}

document.querySelector('.app-item[data-app="Weather"]')
  ?.addEventListener("click", openWeatherApp);

document.getElementById("weatherHome")
  .addEventListener("click", closeWeatherApp);

/* City List */

function renderWeatherCities() {
  const container = document.getElementById("weatherCityList");
  container.innerHTML = "";

  weatherSavedCities.forEach(city => {
    const row = document.createElement("div");
    row.className = "weather-city-row";

    const name = document.createElement("div");
    name.textContent = city.name;

    const country = document.createElement("small");
    country.textContent = city.country;

    name.appendChild(country);

    const arrow = document.createElement("span");
    arrow.textContent = "›";

    row.append(name, arrow);

    row.addEventListener("click", () => {
      document.getElementById("weatherCityPanel")
        .classList.remove("visible");

      loadWeather(city);
    });

    container.appendChild(row);
  });
}

document.getElementById("weatherLocationButton")
  .addEventListener("click", () => {
    renderWeatherCities();

    document.getElementById("weatherCityPanel")
      .classList.add("visible");
  });

document.getElementById("weatherCloseCities")
  .addEventListener("click", () => {
    document.getElementById("weatherCityPanel")
      .classList.remove("visible");
  });

/* Search City */

async function searchWeatherCity() {
  const input = document.getElementById("weatherCitySearch");
  const query = input.value.trim();

  if (!query) return;

  const button = document.getElementById("weatherSearchButton");
  button.textContent = "Searching...";

  try {
    const params = new URLSearchParams({
      name: query,
      count: 5,
      language: "en",
      format: "json"
    });

    const response = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?" + params
    );

    const result = await response.json();

    if (!result.results || result.results.length === 0) {
      alert("City not found.");
      return;
    }

    const cities = result.results.map(place => ({
      name: place.name,
      country: place.country || "",
      latitude: place.latitude,
      longitude: place.longitude
    }));

    const container = document.getElementById("weatherCityList");
    container.innerHTML = "";

    cities.forEach(city => {
      const row = document.createElement("div");
      row.className = "weather-city-row";

      const name = document.createElement("div");
      name.textContent = city.name;

      const country = document.createElement("small");
      country.textContent = city.country;

      name.appendChild(country);
      row.append(name);

      row.addEventListener("click", () => {
        const exists = weatherSavedCities.some(saved =>
          saved.name === city.name &&
          saved.latitude === city.latitude
        );

        if (!exists) weatherSavedCities.push(city);

        document.getElementById("weatherCityPanel")
          .classList.remove("visible");

        input.value = "";
        loadWeather(city);
      });

      container.appendChild(row);
    });

  } catch (error) {
    alert("Unable to search for this city.");
    console.error(error);
  } finally {
    button.textContent = "Search";
  }
}

document.getElementById("weatherSearchButton")
  .addEventListener("click", searchWeatherCity);

document.getElementById("weatherCitySearch")
  .addEventListener("keydown", event => {
    if (event.key === "Enter") searchWeatherCity();
  });

/* Device Location */

function useWeatherDeviceLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    position => {
      const city = {
        name: "My Location",
        country: "",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      loadWeather(city);
    },
    () => {
      // Location denied or unavailable:
      // continue using Jakarta as the default.
    },
    {
      enableHighAccuracy: false,
      timeout: 10000
    }
  );
}


/* =========================
   APPLE REMINDERS JAVASCRIPT
========================= */

const remindersApp = document.getElementById("remindersApp");

const remindersPages = {
  main: document.getElementById("remindersMainPage"),
  list: document.getElementById("remindersListPage"),
  editor: document.getElementById("remindersEditorPage")
};

let reminderData = JSON.parse(
  localStorage.getItem("appleRemindersData") || "[]"
);

let reminderLists = ["Reminders", "Personal", "Work", "Shopping"];

let activeReminderList = "Reminders";
let activeReminderId = null;
let activeSmartList = "All";

function saveReminderData() {
  localStorage.setItem(
    "appleRemindersData",
    JSON.stringify(reminderData)
  );
}

function showReminderPage(page) {
  Object.values(remindersPages).forEach(item => {
    item.classList.remove("active");
  });

  remindersPages[page].classList.add("active");
}

function openRemindersApp() {
  remindersApp.classList.add("visible");

  document.getElementById("remindersDate").textContent =
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

  showReminderPage("main");
  renderReminderHome();
}

function closeRemindersApp() {
  remindersApp.classList.remove("visible");
}

document.querySelector('.app-item[data-app="Reminders"]')
  ?.addEventListener("click", openRemindersApp);

document.getElementById("remindersHome")
  .addEventListener("click", closeRemindersApp);

/* Counts */

function updateReminderCounts() {
  const today = new Date().toISOString().slice(0, 10);

  const active = reminderData.filter(item => !item.completed);
  const todayItems = active.filter(item => item.date === today);
  const scheduled = active.filter(item => item.date);
  const completed = reminderData.filter(item => item.completed);

  document.getElementById("remindersTodayCount").textContent =
    todayItems.length;

  document.getElementById("remindersScheduledCount").textContent =
    scheduled.length;

  document.getElementById("remindersAllCount").textContent =
    active.length;

  document.getElementById("remindersCompletedCount").textContent =
    completed.length;

  document.getElementById("remindersFooterCount").textContent =
    `${active.length} Reminders`;
}

/* Home List */

function renderReminderHome() {
  updateReminderCounts();

  const container = document.getElementById("remindersLists");

  container.innerHTML = reminderLists.map(list => {
    const count = reminderData.filter(item =>
      item.list === list && !item.completed
    ).length;

    const card = document.createElement("div");
    card.className = "reminders-list-card";

    const color = document.createElement("div");
    color.className = "reminders-list-color";
    color.textContent = "☷";

    const info = document.createElement("div");
    info.className = "reminders-list-info";

    const name = document.createElement("strong");
    name.textContent = list;

    const description = document.createElement("small");
    description.textContent = `${count} Reminders`;

    info.append(name, description);

    const number = document.createElement("span");
    number.className = "reminders-list-number";
    number.textContent = count;

    card.append(color, info, number);

    card.addEventListener("click", () => {
      activeReminderList = list;
      activeSmartList = "All";
      renderReminderList();
      showReminderPage("list");
    });

    return card;
  }).forEach(card => container.appendChild(card));
}

/* Smart Lists */

document.querySelectorAll("[data-list]").forEach(button => {
  button.addEventListener("click", () => {
    activeSmartList = button.dataset.list;
    activeReminderList = activeSmartList;

    renderReminderList();
    showReminderPage("list");
  });
});

/* Render Reminder List */

function renderReminderList() {
  const container = document.getElementById("remindersItems");

  document.getElementById("remindersListTitle").textContent =
    activeReminderList;

  document.getElementById("remindersListSubtitle").textContent =
    activeSmartList === "Today" ? "Due today" :
    activeSmartList === "Scheduled" ? "Scheduled reminders" :
    activeSmartList === "Completed" ? "Completed reminders" :
    "Your reminders";

  const today = new Date().toISOString().slice(0, 10);

  let filtered = reminderData.filter(item => {
    if (activeSmartList === "Today") {
      return item.date === today && !item.completed;
    }

    if (activeSmartList === "Scheduled") {
      return !!item.date && !item.completed;
    }

    if (activeSmartList === "Completed") {
      return item.completed;
    }

    if (activeSmartList === "All") {
      return !item.completed;
    }

    return item.list === activeReminderList;
  });

  filtered.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });

  container.innerHTML = "";

  filtered.forEach(item => {
    const row = document.createElement("div");
    row.className = "reminder-row";

    if (item.completed) {
      row.classList.add("reminder-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "reminder-check";
    checkbox.checked = item.completed;

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      saveReminderData();
      renderReminderList();
      updateReminderCounts();
    });

    const content = document.createElement("div");
    content.className = "reminder-row-content";

    const title = document.createElement("strong");
    title.textContent = item.title;

    content.appendChild(title);

    if (item.notes) {
      const notes = document.createElement("p");
      notes.textContent = item.notes;
      content.appendChild(notes);
    }

    if (item.date || item.time) {
      const date = document.createElement("small");
      date.textContent = [
        item.date || "",
        item.time || ""
      ].filter(Boolean).join(" · ");

      content.appendChild(date);
    }

    content.addEventListener("click", () => {
      openReminderEditor(item.id);
    });

    row.append(checkbox, content);
    container.appendChild(row);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No Reminders";
    empty.style.color = "#999";
    empty.style.textAlign = "center";
    empty.style.padding = "30px";
    container.appendChild(empty);
  }
}

/* New Reminder */

function openNewReminder() {
  activeReminderId = null;

  document.getElementById("remindersEditorHeading").textContent =
    "New Reminder";

  document.getElementById("reminderTitle").value = "";
  document.getElementById("reminderNotes").value = "";
  document.getElementById("reminderDate").value = "";
  document.getElementById("reminderTime").value = "";
  document.getElementById("reminderListSelect").value =
    reminderLists.includes(activeReminderList)
      ? activeReminderList
      : "Reminders";

  document.getElementById("reminderDelete").style.display = "none";

  showReminderPage("editor");
  document.getElementById("reminderTitle").focus();
}

/* Edit Reminder */

function openReminderEditor(id) {
  const item = reminderData.find(reminder => reminder.id === id);
  if (!item) return;

  activeReminderId = id;

  document.getElementById("remindersEditorHeading").textContent =
    "Edit Reminder";

  document.getElementById("reminderTitle").value = item.title;
  document.getElementById("reminderNotes").value = item.notes || "";
  document.getElementById("reminderDate").value = item.date || "";
  document.getElementById("reminderTime").value = item.time || "";
  document.getElementById("reminderListSelect").value = item.list;

  document.getElementById("reminderDelete").style.display = "block";

  showReminderPage("editor");
}

/* Save Reminder */

function saveReminder() {
  const title = document.getElementById("reminderTitle")
    .value.trim();

  if (!title) {
    alert("Please enter a reminder title.");
    return;
  }

  const reminder = {
    id: activeReminderId || Date.now(),
    title,
    notes: document.getElementById("reminderNotes").value.trim(),
    date: document.getElementById("reminderDate").value,
    time: document.getElementById("reminderTime").value,
    list: document.getElementById("reminderListSelect").value,
    completed: activeReminderId
      ? reminderData.find(item => item.id === activeReminderId).completed
      : false
  };

  if (activeReminderId) {
    const index = reminderData.findIndex(
      item => item.id === activeReminderId
    );

    reminderData[index] = reminder;
  } else {
    reminderData.push(reminder);
  }

  saveReminderData();
  renderReminderHome();

  showReminderPage("list");
  renderReminderList();
}

/* Delete Reminder */

document.getElementById("reminderDelete")
  .addEventListener("click", () => {
    if (!activeReminderId) return;

    if (!confirm("Delete this reminder?")) return;

    reminderData = reminderData.filter(
      item => item.id !== activeReminderId
    );

    activeReminderId = null;

    saveReminderData();
    renderReminderHome();

    showReminderPage("list");
    renderReminderList();
  });

/* Navigation */

document.getElementById("remindersNew")
  .addEventListener("click", openNewReminder);

document.getElementById("remindersQuickAdd")
  .addEventListener("click", openNewReminder);

document.getElementById("remindersAddItem")
  .addEventListener("click", openNewReminder);

document.getElementById("remindersAddList")
  .addEventListener("click", () => {
    const name = prompt("New list name:");

    if (!name || !name.trim()) return;

    if (reminderLists.includes(name.trim())) {
      alert("This list already exists.");
      return;
    }

    reminderLists.push(name.trim());
    renderReminderHome();
  });

document.getElementById("remindersBack")
  .addEventListener("click", () => {
    showReminderPage("main");
    renderReminderHome();
  });

document.getElementById("remindersCancel")
  .addEventListener("click", () => {
    showReminderPage("list");
    renderReminderList();
  });

document.getElementById("remindersSave")
  .addEventListener("click", saveReminder);


const tvApp = document.getElementById("tvApp");
const tvMainPage = document.getElementById("tvMainPage");
const tvDetailPage = document.getElementById("tvDetailPage");
const tvPlayerPage = document.getElementById("tvPlayerPage");

const tvVideo = document.getElementById("tvVideo");
const tvVideoPlaceholder = document.getElementById("tvVideoPlaceholder");

const tvPrograms = {
  featured: {
    title: "Discover Your Next Favorite",
    meta: "Featured • Apple TV+",
    description: "Discover a collection of stories worth watching.",
    poster: "coming-soon.jpg",
    video: "film0.mp4"
  },
  movie1: {
    title: "Catholic Church Of Stella Maris Pluit",
    meta: "Movie • 2026",
    description: "A fun little vlog filled with laughter, silly moments, and sweet memories during our church date at Catholic Church of Stella Maris Pluit. Just two people making ordinary moments extra special! ♡",
    poster: "poster-film1.jpg",
    video: "film1.mp4"
  },
  movie2: {
    title: "AEON Emporium Pluit",
    meta: "Movie • 2026",
    description: "A fun-filled day at AEON Emporium Pluit, capturing random laughs, silly adventures, and little moments together. Just another date full of unexpected fun and sweet memories! ♡",
    poster: "poster-film2.jpg",
    video: "film2.mov"
  },
  original1: {
    title: "Midnight Stories",
    meta: "Apple Original • Series",
    description: "Every night has a story waiting to be discovered.",
    poster: "coming-soon.jpg",
    video: "film3.mp4"
  },
  series1: {
    title: "The Hidden World",
    meta: "Series • 2 Seasons",
    description: "A mysterious world with secrets waiting to unfold.",
    poster: "coming-soon.jpg",
    video: "film4.mp4"
  }
};

function tvShowMainPage() {
  tvMainPage.classList.remove("tv-hidden");
  tvDetailPage.classList.add("tv-hidden");
  tvPlayerPage.classList.add("tv-hidden");
}

function tvOpenApp() {
  tvApp.classList.add("visible");
  tvShowMainPage();
}

function tvCloseApp() {
  tvApp.classList.remove("visible");
  tvVideo.pause();
}


function tvOpenDetail(id) {
  const program = tvPrograms[id];
  if (!program) return;

  document.getElementById("tvDetailTitle").textContent = program.title;
  document.getElementById("tvDetailMeta").textContent = program.meta;
  document.getElementById("tvDetailDescription").textContent = program.description;

  const banner = document.getElementById("tvDetailBanner");

  banner.style.backgroundImage = `url("${program.poster}")`;
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  banner.style.backgroundRepeat = "no-repeat";

  tvApp.dataset.currentProgram = id;

  tvMainPage.classList.add("tv-hidden");
  tvDetailPage.classList.remove("tv-hidden");
}


function tvPlayProgram(id) {
  const program = tvPrograms[id];
  if (!program) return;

  tvApp.dataset.currentProgram = id;

  tvDetailPage.classList.add("tv-hidden");
  tvPlayerPage.classList.remove("tv-hidden");

  tvVideo.pause();
  tvVideo.removeAttribute("src");
  tvVideo.load();

  if (program.video) {
    tvVideo.src = program.video;
    tvVideoPlaceholder.style.display = "none";
    tvVideo.play().catch(() => {});
  } else {
    tvVideoPlaceholder.style.display = "flex";
  }
}

// GENERATE POSTERS

function tvCreateCard(id) {
  const program = tvPrograms[id];

  const card = document.createElement("div");
  card.className = "tv-card";

  card.innerHTML = `
    <div class="tv-poster"
      style="background-image: url('${program.poster}');
             background-size: cover;
             background-position: center;
             background-repeat: no-repeat;">
      <div class="tv-poster-title">${program.title}</div>
    </div>
    <h3>${program.title}</h3>
    <p>${program.meta}</p>
  `;

  card.addEventListener("click", () => tvOpenDetail(id));

  return card;
}

function tvRenderRow(elementId, programs) {
  const row = document.getElementById(elementId);
  row.innerHTML = "";

  programs.forEach(id => {
    row.appendChild(tvCreateCard(id));
  });
}

tvRenderRow("tvContinueRow", ["movie1", "original1"]);
tvRenderRow("tvMoviesRow", ["movie1", "movie2"]);
tvRenderRow("tvOriginalsRow", ["original1"]);
tvRenderRow("tvSeriesRow", ["series1"]);

// NAVIGATION

document.getElementById("tvHome")
  .addEventListener("click", tvCloseApp);

document.getElementById("tvDetailBack")
  .addEventListener("click", tvShowMainPage);

document.getElementById("tvPlayerBack")
  .addEventListener("click", () => {
    tvVideo.pause();
    tvPlayerPage.classList.add("tv-hidden");
    tvDetailPage.classList.remove("tv-hidden");
  });

document.getElementById("tvPlayButton")
  .addEventListener("click", () => {
    tvPlayProgram(tvApp.dataset.currentProgram);
  });

document.querySelectorAll("[data-tv-program]").forEach(button => {
  button.addEventListener("click", () => {
    tvOpenDetail(button.dataset.tvProgram);
  });
});

// HOME SCREEN

document.querySelector('.app-item[data-app="TV"]')
  ?.addEventListener("click", tvOpenApp);


