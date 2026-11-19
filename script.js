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
    type: "HAPPY BIRTHDAY",
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
          ["Happy Celebrate Birthday and Happy Twentytwo Years Old Ruth Stefanova", "heading"],
          ["Biru", "heading"],
          ["Email: tentangbiiru@gmail.com", "heading"],
          ["Izinkan saya menceritakan kisah tentang orang yang menyelamatkan hidup saya. Ruth Stefanova atau saya biasa memanggilnya Ute. Dia baik, dia cantik, dia memiliki mata yang paling indah, dia adalah tipe perempuan yang menunduk setiap kali menatap matanya terlalu lama. Dia adalah segalanya yang pernah saya minta. Dia menunjukkan kepada saya bahwa saya pantas untuk dicintai dan dia membuat saya jatuh cinta lagi. Selamat ulangtahun, hari ini adalah hari tepat dimana 19 tahun yang lalu seorang ibu melahirkan putri kesayangannya yang sudah ditunggu sejak 9 bulan lamanya. Ruth Stefanova adalah nama yang diberikan oleh malaikat kesayangan si kecil, dengan harapan dapat memberikan kebahagiaan untuk keluarganya. Seluruh harapan dan keinginan diberikan agar kamu (Ute) membanggakan untuk keluarga. Dimulai pada saat itulah kehidupan dimulai, hingga seka putri kesayangan seorang ibu, bapak dan keluarga sudah berada pada umur yang tidak lagi anak-anak melainkan sudah menjadi remaja yang memasuki dewasa. Terimakasih dan Maaf adalah kata yang tepat untuk diucapkan pada saat ini untuk segala hal baik yang sudah terjadi dan dilewati. Hari ini apapun yang ada di pikiranmu, siapapun yang bersamamu, menempati hatimu dan kemanapun langkah kakimu akan melangkah. Semoga selalu diberkahi oleh Tuhan dan kedua orangtua mu. Karena aku hanya ingin melihatmu bahagia dengan benar. Terima kasih sudah datang dan memberikan pengalaman yang tidak semua orang bisa alami. "]
        ]
      },
      {
        paragraphs: [
          ["Setiap orang pernah merasakan hari ulangtahun. Dimana hari itu adalah hari kelahiran yang selalu ditunggu bahkan diingat oleh setiap individu. Mengulang hari ulang tahun mungkin sudah jadi hal biasa untukmu, tapi semoga setiap tahun yang terulang akan menjadi langkah baru untuk menjadi pribadi yang lebih baik, lebih kuat, dan lebih dewasa dalam menghadapi setiap hal baru yang terjadi. Sebenarnya, menjadi lebih baik tidak harus menunggu hari ulangtahun. Di setiap waktu, kamu boleh punya harapan dan keinginan yang baik untuk hidupmu. Aku selalu mendoakan yang diinginkan kamu supaya berjalan dengan baik dan sesuai harapan bahkan dijadikan hal yang paling baik. Pasti ada kalanya hal- hal yang ditemui kamu tidak sesuai dengan apa yang diharapkan, bahkan hal buruk dalam kehidupan, tapi aku yakin kamu bisa menghadapinya."],
          ["“Semangat, pasti bisa.”", "heading"],
          ["Akan selalu jadi kata dari aku untuk kamu, dalam menghadapi hal-hal yang mungkin belum pernah terjadi sebelumnya di hidupmu. Selalu nikmati segala proses pendewasaan yang mengalir di kehidupan, sertai rasa syukur dan terimakasih agar selalu tumbuh. Patah, hancur, kecewa adalah suatu hal yang biasa dirasakan ketika ingin menjadi pribadi yang lebih kuat dalam mengupgrade diri. Dua puluh dua tahun bukanlah angka yang sedikit, akan tetapi semoga Tuhan selalu memberikan rahmat karunianya untuk kamu, dilimpahkan kekuatan untuk menghadapi kehidupan dalam kondisi apapun, dibawah tekanan ataupun paksaan."],
          ["Untuk tahun 2026 semoga apa yang sudah terjadi, semoga selalu diganti dengan hal yang baik ditahun ini dan di tahun selanjutnya. Walaupun kita baru bertemu dalam kurun waktu yang sebentar, semoga itu bisa menjadikan diri mu menjadi pribadi yang lebih baik lagi. Jangan pernah mengambil hal buruk yang aku ajarin ke kamu yaa, akan tetapi ambil dari sisi positifnya. "],
          ["Maret 2026, aku gak pernah kepikiran untuk kenal kamu dengan hal yang terjadi dikehidupanmu, tapi aku selalu yakin apapun yang akan terjadi ataupun itu akan ada sebab akibatnya, itu semua sudah dari apa yang ditetapkan oleh Tuhan. Berawal dari hal yang tidak pernah terpikirkan hingga sekarang, aku bersyukur atas segala hal untuk apa yang pernah terjadi dikehidupan ini, telah dikenalkan oleh kamu yang notabennya berbeda dengan kehidupanku. Semoga kamu dapat menjadi kakak yang baik untuk adik-adik, orangtua, dan keluargamu. Aku bahagia sekali bisa kenal dengan mu, karena banyak hal yang bisa dipelajari, ditemukan, dan hal baik ataupun buruk bisa diambil dari kehidupanmu. Mungkin awal tahun 2026 merupakan tahun yang berat untuk mu tapi mengapa Tuhan memberikan suatu jalan hingga bertemu denganku."],
          ["“We never know.”", "heading"],
          ["Mungkin Tuhan ingin menunjukkan sesuatu yang baik dari semua yang sudah aku lalui. Aku juga belum benar-benar tahu apa maksudnya. Tapi aku percaya, setiap hal yang terjadi dalam hidup adalah takdir. Dan sebagai manusia, kita bisa memilih untuk menjadikannya pelajaran agar hidup kita jadi lebih baik dari sebelumnya."],
          ["Semoga dengan apa yang telah terjadi Tuhan selalu memberikan kekuatan, ketabahan hati untuk diri kamu. Semangat untuk menjalani hari-harinya pasti ada kebahagiaan dalam setiap proses yang sedang kamu jalani. Jangan pernah berhenti jadi orang baik. Tetaplah berbuat baik kepada siapa pun tanpa melihat bagaimana mereka memperlakukanmu. Kadang, seseorang hadir membawa hal baru dan pelajaran yang belum pernah kita temui sebelumnya. Lakukan saja yang terbaik menurut dirimu, karena semua kebaikan pasti akan kembali pada waktunya. Untuk sekarang, aku selalu berdoa semoga semua yang kamu harapkan dan doakan dipermudah, dilancarkan, dan dikabulkan oleh Tuhan. Aku yakin suatu hari nanti kamu bisa menjadi seperti yang ibu dan bapak mu harapkan, walaupun banyak hal berat yang sudah kamu lewati. Aku percaya kamu, Ute, bisa menjadi kebanggaan untuk kedua orangtuamu."],
          ["Semua doa dan harapanmu aku aamiin-kan", "heading"]
        ]
      },
      {
        paragraphs: [
          [""]
        ]
      }
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
          ["Where the Water Dreams", "heading"],
          ["The sea keeps all the words", "poem"],
          ["we were afraid to say,", "poem"],
          ["and carries them in silver waves", "poem"],
          ["to shores so far away.", "poem"],
          ["At dawn it gives the sky a name,", "poem"],
          ["at dusk it takes it back.", "poem"],
          ["And every star becomes a flame", "poem"],
          ["upon the water's black.", "poem"]
        ]
      },
      {
        heading: "II. The Moon",
        paragraphs: [
          ["A Small Light", "heading"],
          ["The moon does not ask", "poem"],
          ["the darkness to disappear.", "poem"],
          ["It simply rises,", "poem"],
          ["quiet and clear,", "poem"],
          ["and reminds the waiting world", "poem"],
          ["that light can live here.", "poem"]
        ]
      },
      {
        heading: "III. Returning",
        paragraphs: [
          ["After the Rain", "heading"],
          ["Somewhere between the last raindrop", "poem"],
          ["and the first bird's song,", "poem"],
          ["I found the little piece of me", "poem"],
          ["I had been missing all along.", "poem"],
          ["No thunder announced it.", "poem"],
          ["No great bells rang.", "poem"],
          ["Only the earth breathed softly,", "poem"],
          ["and the quiet garden sang.", "poem"]
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
