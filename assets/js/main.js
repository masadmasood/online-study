// Page Loader
window.addEventListener("load", () => {
  document.querySelector(".js-page-loader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".js-page-loader").style.display = "none";
  }, 600);
});

// Header Menu

function headerMenu() {
  const menu = document.querySelector(".js-header-menu"),
    backdrop = document.querySelector(".js-header-backdrop"),
    menuCollpaseBreakpoint = 991;

  function toggleMenu() {
    menu.classList.toggle("open");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("overflow-hidden");
  }
  document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  backdrop.addEventListener("click", toggleMenu);
  function collpase() {
    menu.querySelector(".active .js-sub-menu").removeAttribute("style");
    menu.querySelector(".active").classList.remove("style");
  }

  menu.addEventListener("click", (event) => {
    const { target } = event;
    if (
      target.classList.contains("js-toggle-sub-menu") &&
      window.innerWidth <= menuCollpaseBreakpoint
    ) {
      event.preventDefault();

      if (target.parentElement.classList.contains("active")) {
        collpase();
        return;
      }

      if (menu.querySelector(".active")) {
        collpase();
      }

      target.parentElement.classList.add("active");
      target.nextElementSibling.style.maxHeight =
        target.nextElementSibling.scrollHeight + "px";
    }
  });

  window.addEventListener("resize", function () {
    if (
      this.innerWidth > menuCollpaseBreakpoint &&
      menu.classList.contains("open")
    ) {
      toggleMenu();
    }
    if (
      this.innerWidth <= menuCollpaseBreakpoint &&
      !menu.querySelector(".active")
    ) {
      collpase();
    }
  });
}

headerMenu();

// testimonial slider

function testimonialSlider() {
  const carouselOne = document.getElementById("carouselOne");
  if (carouselOne) {
    carouselOne.addEventListener("slid.bs.carousel", function () {
      const activeItem = this.querySelector(".active");
      document.querySelector(".js-testimonial-img").src =
        activeItem.getAttribute("data-js-testimonial-img");
    });
  }
}
testimonialSlider();

// Style Switcher
function styleSwitcherToggle() {
  const styleSwitcher = document.querySelector(".js-style-switcher"),
    styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

  styleSwitcherToggler.addEventListener("click", function () {
    styleSwitcher.classList.toggle("open");
    this.querySelector("i").classList.toggle("fa-times");
    this.querySelector("i").classList.toggle("fa-cog");
  });
}
styleSwitcherToggle();

// Theme Colors
function themeColors() {
  const colorStyle = document.querySelector(".js-color-style"),
    themeColorsContainer = document.querySelector(".js-theme-colors");

  themeColorsContainer.addEventListener("click", ({ target }) => {
    if (target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColor();
    }
  });

  function setColor() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute(
      "href",
      path.join("/") + "/" + localStorage.getItem("color") + ".css"
    );
    if (document.querySelector(".js-theme-color-item.active")) {
      document
        .querySelector(".js-theme-color-item.active")
        .classList.remove("active");
    }
    document
      .querySelector(
        "[Data-js-theme-color=" + localStorage.getItem("color") + "]"
      )
      .classList.add("active");
  }

  if (localStorage.getItem("color") !== null) {
    setColor();
  } else {
    const defaultColor = colorStyle
      .getAttribute("href")
      .split("/")
      .pop()
      .split(".")
      .shift();
    document
      .querySelector("[data-js-theme-color=" + defaultColor + "]")
      .classList.add("active");
  }
}

themeColors();

// Theme Light & Dark Mode
function themeLightDark() {
  const darkModeCheckBox = document.querySelector(".js-dark-mode");
  darkModeCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("theme-dark", "true");
    } else {
      localStorage.setItem("theme-dark", "false");
    }
    themeMode();
  });
  function themeMode() {
    if (localStorage.getItem("theme-dark") == "true") {
      document.body.classList.add("t-dark");
    } else {
      document.body.classList.remove("t-dark");
    }
  }

  if (localStorage.getItem("theme-dark") !== null) {
    themeMode();
  }
  if (document.body.classList.contains("t-dark")) {
    darkModeCheckBox.checked = true;
  }
}

themeLightDark();

// Glass Theme

function themeGlassEffect() {
  const glassEffectCheckBox = document.querySelector(".js-glass-effect"),
    glassStyle = document.querySelector(".js-glass-style");

  glassEffectCheckBox.addEventListener("click", function () {
    if (this.checked) {
      localStorage.setItem("glass-effect", "true");
    } else {
      localStorage.setItem("glass-effect", "false");
    }
    glass();
  });

  function glass() {
    if (localStorage.getItem("glass-effect") === "true") {
      glassStyle.removeAttribute("disabled");
    } else {
      glassStyle.disabled = true;
    }
  }

  if (localStorage.getItem("glass-effect") !== null) {
    glass();
  }
  if (!glassStyle.hasAttribute("disabled")) {
    glassEffectCheckBox.checked = true;
  }
}

themeGlassEffect();
