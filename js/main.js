// get a random integer between 1-6 and show the img with that id
function setRandImg() {
  document.querySelector("[data-landing-img]").src = `images/landing-${
    Math.floor(Math.random() * 6) + 1
  }.webp`;
}

// return an interval that changes the landing bg each 10s
function getInterval() {
  return setInterval(setRandImg, 10000);
}

// add event listeners for toggling the nav bar icon on small screens
function toggleNavbar() {
  const burgerIcon = document.querySelector("[data-burger-icon]");
  const nav = document.querySelector("[data-nav-links]");
  const navLinks = nav.querySelectorAll("a");

  // show nav links when the burger icon is clicked
  burgerIcon.addEventListener("click", () => {
    if (burgerIcon.getAttribute("aria-expanded") === "true") {
      burgerIcon.setAttribute("aria-expanded", "false");
      nav.classList.remove("visible");
    } else {
      nav.classList.add("visible");
      burgerIcon.setAttribute("aria-expanded", "true");
    }
  });

  // add an active class on clicked nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

// scroll to top btn that appears when user scrolls more than viewport height
function createScrollToTopBtn() {
  const scrollToTopBtn = document.querySelector("[data-button=scrollToTop]");

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight)
      scrollToTopBtn.classList.add("visible");
    else scrollToTopBtn.classList.remove("visible");
  });
}

// update the settings and show the settings tab when gear icon is clicked
function handleSettingsTab() {
  // toggle settings aside
  const settingsAside = document.querySelector("[data-settings]");
  const asideToggleBtn = document.querySelector("[data-settings-toggle]");
  const colorSettingBtns = document.querySelectorAll(".color-setting");

  asideToggleBtn.addEventListener("click", (e) => {
    asideToggleBtn.classList.toggle("active");
    settingsAside.classList.toggle("visible");
  });

  // add colors to btns and update the main color on click
  const mainColor = localStorage.getItem("main-color");
  if (mainColor) {
    document
      .querySelector(`[data-color="${mainColor}"]`)
      .classList.add("active");
    document.documentElement.style.setProperty("--main-clr", mainColor);
  } else {
    colorSettingBtns[0].classList.add("active");
    document.documentElement.style.setProperty(
      "--main-clr",
      colorSettingBtns[0].dataset.color
    );
  }

  colorSettingBtns.forEach((btn) => {
    btn.style.backgroundColor = btn.dataset.color;

    btn.addEventListener("click", (e) => {
      document.querySelector("[data-color].active").classList.remove("active");
      e.target.classList.add("active");

      const newColor = e.target.dataset.color;
      localStorage.setItem("main-color", newColor);
      document.documentElement.style.setProperty("--main-clr", newColor);
    });
  });
}

// update the settings and check if random bg are allowed
const checkRandBgRepeat = (() => {
  // need to be available to each function call so the interval can be removed
  let repeatInterval;

  return () => {
    const checkbox = document.querySelector("[data-rand-bg-checkbox]");
    const randBgAllowed = localStorage.getItem("allow-rand-bg");

    // update the option in local storage on click and
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        localStorage.setItem("allow-rand-bg", "true");
        repeatInterval = getInterval();
        return;
      }

      clearInterval(repeatInterval);
      localStorage.setItem("allow-rand-bg", "false");
    });

    // if there is no option value in local storage
    // check if in html (allow) is the default option
    if (randBgAllowed === null) {
      if (checkbox.checked) {
        repeatInterval = getInterval();
      }
      return;
    }

    // get option from local storage if exists

    if (randBgAllowed === "false") {
      checkbox.checked = false;
      return;
    }

    checkbox.checked = true;
    // get a random img first then change it every 10 seconds
    repeatInterval = getInterval();
  };
})();

function setColorMode(isDarkMode) {
  if (isDarkMode) {
    document.documentElement.style.setProperty("--main-bg", "#333");
    document.documentElement.style.setProperty("--alt-bg", "#1a1a1a");
    document.documentElement.style.setProperty("--main-txt-clr", "#f5f5f5");
    document.documentElement.style.setProperty("--alt-txt-clr", "#222");
  } else {
    document.documentElement.style.setProperty("--main-bg", "#f5f5f5");
    document.documentElement.style.setProperty("--alt-bg", "#c7eee8");
    document.documentElement.style.setProperty("--main-txt-clr", "#222");
    document.documentElement.style.setProperty("--alt-txt-clr", "#f5f5f5");
  }
}

function checkDarkMode() {
  const darkmodeCheckbox = document.querySelector("[data-darkmode-checkbox]");
  const darkModeAllowed = localStorage.getItem("dark-mode");

  darkmodeCheckbox.addEventListener("change", () => {
    localStorage.setItem("dark-mode", darkmodeCheckbox.checked);
    setColorMode(darkmodeCheckbox.checked);
  });

  // if there is no item in local storage
  // then set the dark mode based on the device preference
  if (darkModeAllowed === null) {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      darkmodeCheckbox.checked = true;
      setColorMode(true);
      return;
    }

    darkmodeCheckbox.checked = false;
    setColorMode(false);
    return;
  }

  // if dark mode value is set then use it
  if (darkModeAllowed === "true") {
    darkmodeCheckbox.checked = true;
    setColorMode(true);
    return;
  }

  darkModeAllowed.checked = false;
  setColorMode(false);
}

async function changeLangTo(lang, direction) {
  const allElementsWithText = document.querySelectorAll("[data-text]");
  const otherDirection = direction === "rtl" ? "ltr" : "rtl";

  const data = await fetch(`lang/${lang}.json`);
  const obj = await data.json();

  document.documentElement.style.direction = direction;

  allElementsWithText.forEach((el) => {
    const key = el.dataset.text;
    const textInAr = obj[key];
    el.innerHTML = textInAr;
  });

  // style changes
  const aside = document.querySelector("[data-settings]");
  const toggler = aside.querySelector("[data-settings-toggle]");
  const checkMarkLabels = aside.querySelectorAll(".checkbox-setting > label");

  aside.classList.add(direction);
  aside.classList.remove(otherDirection);

  toggler.classList.add(direction);
  toggler.classList.remove(otherDirection);

  checkMarkLabels.forEach((label) => {
    label.classList.add(direction);
    label.classList.remove(otherDirection);
  });
}

function setPageLang() {
  let lang = localStorage.getItem("lang");
  const enRadioBtn = document.querySelector("[data-lang=en]");
  const arRadioBtn = document.querySelector("[data-lang=ar]");

  [enRadioBtn, arRadioBtn].forEach((btn) => {
    btn.addEventListener("change", ({ target }) => {
      const lang = target.dataset.lang;
      const direction = target.dataset.lang === "ar" ? "rtl" : "ltr";

      localStorage.setItem("lang", lang);
      changeLangTo(lang, direction);
    });
  });

  // if no lang item in local storage
  if (lang === null) {
    // if user lang isn't arabic then default to english
    if (/^ar/i.test(navigator.language)) lang = "ar";
    else lang = "en";
  }

  if (lang === "ar") {
    changeLangTo("ar", "rtl");
    arRadioBtn.checked = true;
  } else {
    changeLangTo("en", "ltr");
    enRadioBtn.checked = true;
  }
}

// main script
function main() {
  toggleNavbar();
  createScrollToTopBtn();
  handleSettingsTab();
  checkRandBgRepeat();
  checkDarkMode();
  setPageLang();
}

document.addEventListener("DOMContentLoaded", main);