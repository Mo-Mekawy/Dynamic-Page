// get a random integer between 1-9 and show the img with that id
function setRandImg() {
  document.querySelector("[data-landing-img]").src = `images/landing-0${
    Math.floor(Math.random() * 8) + 1
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

function createNavBullets() {
  const bulletsContainer = document.querySelector("[data-bullets-container]");
  const sections = document.getElementsByTagName("section");

  for (sect of sections) {
    if (sect.id === "landing") continue;

    const bullet = document.createElement("li");
    bullet.className = "nav-bullet";
    bullet.tabIndex = 0;

    const link = document.createElement("a");
    link.href = `#${sect.id}`;
    link.tabIndex = -1;
    link.setAttribute("data-text", `nav-bullet-${sect.id}`);

    // if the bullet is clicked click the nav link and add the active class
    bullet.onclick = () => {
      link.click();
      bulletsContainer
        .querySelector(".nav-bullet.active")
        ?.classList.remove("active");
      bullet.classList.add("active");
    };

    bullet.onkeydown = (e) => {
      if (e.key === "Enter") link.click();
    };

    bullet.append(link);
    bulletsContainer.append(bullet);
  }
}

// update the settings and show the settings tab when gear icon is clicked
function handleSettingsTab() {
  // toggle settings aside
  const settingsAside = document.querySelector("[data-settings]");
  const asideToggleBtn = document.querySelector("[data-settings-toggle]");

  asideToggleBtn.addEventListener("click", (e) => {
    asideToggleBtn.classList.toggle("active");
    settingsAside.classList.toggle("visible");

    // accessabilty attribute
    if (asideToggleBtn.getAttribute("aria-expanded") === "false") {
      asideToggleBtn.setAttribute("aria-expanded", "true");
      return;
    }
    asideToggleBtn.setAttribute("aria-expanded", "false");
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

// add colors to btns and update the main color on click
function changeMainClr() {
  const colorSettingBtns = document.querySelectorAll(".color-setting");
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

// changes the color varaibles so the theme changes to dark
function setColorMode(isDarkMode) {
  if (isDarkMode) {
    document.documentElement.style.setProperty("--main-bg", "#333");
    document.documentElement.style.setProperty("--alt-bg", "#1a1a1a");
    document.documentElement.style.setProperty("--main-txt-clr", "#f5f5f5");
    document.documentElement.style.setProperty("--alt-txt-clr", "#222");
  } else {
    document.documentElement.style.setProperty("--main-bg", "#f5f5f5");
    document.documentElement.style.setProperty("--alt-bg", "#bbe2dc");
    document.documentElement.style.setProperty("--main-txt-clr", "#222");
    document.documentElement.style.setProperty("--alt-txt-clr", "#f5f5f5");
  }
}

// updates the dark mode based on local storage or preference and on click
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

// get text from a json file and update the text and direction to that lang
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
  const toggler = document.querySelector("[data-settings-toggle]");
  const checkMarkLabels = aside.querySelectorAll(".checkbox-setting > label");
  const aboutImg = document.querySelector("[data-about-img]");
  const timeLineEvents = document.querySelectorAll(".event__card");
  const navBullets = document.querySelector("[data-bullets-container]");

  aside.classList.add(direction);
  aside.classList.remove(otherDirection);

  toggler.classList.add(direction);
  toggler.classList.remove(otherDirection);

  checkMarkLabels.forEach((label) => {
    label.classList.add(direction);
    label.classList.remove(otherDirection);
  });

  aboutImg.classList.add(direction);
  aboutImg.classList.remove(otherDirection);

  timeLineEvents.forEach((event) => {
    event.classList.add(direction);
    event.classList.remove(otherDirection);
  });

  navBullets.classList.add(direction);
  navBullets.classList.remove(otherDirection);

  // change alt attr of gallery images
  const imgDivs = document.querySelectorAll("[data-image-type]");
  imgDivs.forEach((div) => {
    const img = div.querySelector("img");
    img.alt = div.querySelector("p[data-text]").textContent;
  });
}

// changes the page language based on preference or local storage and on click
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

// handle show nav bullets checkbox setting
function showNavBulletsOpt() {
  const showBullets = localStorage.getItem("show-bullets");
  const showBulletsCheckbox = document.querySelector("[data-bullets-checkbox]");
  const navBullets = document.querySelector("[data-bullets-container]");

  showBulletsCheckbox.addEventListener("change", () => {
    localStorage.setItem("show-bullets", showBulletsCheckbox.checked);
    if (showBulletsCheckbox.checked) {
      navBullets.style.display = "block";
      return;
    }
    navBullets.style.display = "none";
  });

  // if there is no item in local storage or the option was true
  if (showBullets === null || showBullets === "true") {
    showBulletsCheckbox.checked = true;
    navBullets.style.display = "block";
    return;
  }
  showBulletsCheckbox.checked = false;
  navBullets.style.display = "none";
}

// add the skills prog to each skill element
function addSkillsProg() {
  const progObj = {
    html: "90",
    css: "80",
    js: "65",
    git: "70",
    mysql: "20",
    python: "80",
  };

  const skillSpans = document.querySelectorAll("[data-skill]");

  skillSpans.forEach((span) => {
    const prog = progObj[span.dataset.skill];

    span.style.setProperty("--prog", `${prog}%`);
  });
}

// add animations on scroll with the intersection observer
function addAnimations() {
  function applyAnimation(el, intersectionThreshold, animationClassName) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        const target = entry.target;

        if (target.classList.contains("testimonials-wrapper"))
          el.querySelectorAll(".testimonial").forEach((test) =>
            test.classList.add(animationClassName)
          );
        else if (target.classList.contains("about__content"))
          target.querySelector(".about__img").classList.add("fade-in");
        else target.classList.add(animationClassName);

        observer.unobserve(el);
      },
      {
        threshold: intersectionThreshold,
      }
    );

    observer.observe(el);
  }

  // elements to observe (if visible do some animations)
  const aboutContent = document.querySelector(".about__content");
  const sectionHeaders = Array.from(
    document.getElementsByClassName("section-title")
  );
  const skills = document.querySelectorAll(".skill");
  const testimonial = document.querySelector(".testimonials-wrapper");

  // add the intersection observer for each element
  applyAnimation(aboutContent, 1, "fade-in");

  sectionHeaders.forEach((header) =>
    applyAnimation(header, 1, "border-animation")
  );

  skills.forEach((skill) => applyAnimation(skill, 1, "scale-up"));

  applyAnimation(
    testimonial,
    0.125 * (window.innerHeight / testimonial.offsetHeight),
    "fade-in"
  );
}

// filter gallery imgs when clicked on its corresponding btn
function handleGalleryFilter() {
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const allImages = document.querySelectorAll("[data-image-type]");

  const filterImg = (imgType) => {
    allImages.forEach((img) => {
      if (img.dataset.imageType === imgType || imgType === "all") {
        img.classList.add("img-fade-in");
        img.classList.remove("img-fade-out");
        return;
      }

      img.classList.remove("img-fade-in");
      img.classList.add("img-fade-out");
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelector("[data-filter-btn].active")
        .classList.remove("active");
      e.target.classList.add("active");
      filterImg(e.target.dataset["filterBtn"]);
    });
  });
}

// main script
function main() {
  toggleNavbar();
  createScrollToTopBtn();
  createNavBullets();
  handleSettingsTab();
  changeMainClr();
  checkRandBgRepeat();
  checkDarkMode();
  setPageLang();
  showNavBulletsOpt();
  addSkillsProg();
  addAnimations();
  handleGalleryFilter();
}

document.addEventListener("DOMContentLoaded", main);
