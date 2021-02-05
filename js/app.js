const formWrapperEl = document.querySelector("#form-wrapper__id");
const formEl = document.querySelector("#form__id");
const textareaEl = formEl.querySelector("#textarea__id");
const displayEl = document.querySelector("#display-container__id");

/**
 * Display area
 */

const handleGoBack = () => {
  if (window.localStorage.getItem("input")) {
    return;
  }
  formWrapperEl.style.display = "flex";
  displayEl.style.display = "none";

  const paragraphs = displayEl.querySelectorAll(".par-container__class");
  paragraphs.forEach((paragraph) => paragraph.remove());
  formWrapperEl.focus();
};

displayEl
  .querySelector("#back-btn__id")
  .addEventListener("click", handleGoBack);

const handleViewClick = (e) => {
  displayEl.classList.toggle("reading-mode");
  document.querySelector("#view-btn__id").classList.toggle("reading-mode");
};

displayEl
  .querySelector("#view-btn__id")
  .addEventListener("click", handleViewClick);

/**
 * Paragraphs
 */

const toggleCollapse = (paragraphEl) => (_) => {
  paragraphEl && paragraphEl.classList.toggle("collapsed");
};

const toggleBold = (paragraphEl) => (_) => {
  paragraphEl && paragraphEl.classList.toggle("is-bold__class");
};

/**
 * Format paragraphs
 */

let fontRem = 1;
let colWidthPercent = 40;
let colMinWidthPx = 300;

// FONT
document
  .querySelector("#btn-font-size-inc__id")
  .addEventListener("click", () => {
    fontRem *= parseFloat(1.15);
    Array.from(displayEl.querySelectorAll(".par-line__class")).forEach(
      (line) => {
        line.style.fontSize = `${fontRem}rem`;
      }
    );
  });

document
  .querySelector("#btn-font-size-dec__id")
  .addEventListener("click", () => {
    fontRem *= parseFloat(0.9);
    Array.from(displayEl.querySelectorAll(".par-line__class")).forEach(
      (line) => {
        line.style.fontSize = `${fontRem}rem`;
      }
    );
  });

// COL WIDTH
document.querySelector("#btn-w-cols-inc__id").addEventListener("click", () => {
  colWidthPercent *= parseFloat(1.2);
  Array.from(displayEl.querySelectorAll(".par-container__class")).forEach(
    (container) => {
      container.style.width = `${colWidthPercent}%`;
    }
  );
});

document.querySelector("#btn-w-cols-dec__id").addEventListener("click", () => {
  colWidthPercent *= parseFloat(0.9);
  Array.from(displayEl.querySelectorAll(".par-container__class")).forEach(
    (container) => {
      container.style.width = `${colWidthPercent}%`;
    }
  );
});

// COL MIN WIDTH
document
  .querySelector("#btn-minw-cols-inc__id")
  .addEventListener("click", () => {
    colMinWidthPx += 25;
    Array.from(displayEl.querySelectorAll(".par-container__class")).forEach(
      (container) => {
        container.style.minWidth = `${colMinWidthPx}px`;
      }
    );
  });

document
  .querySelector("#btn-minw-cols-dec__id")
  .addEventListener("click", () => {
    colMinWidthPx -= 25;
    Array.from(displayEl.querySelectorAll(".par-container__class")).forEach(
      (container) => {
        container.style.minWidth = `${colMinWidthPx}px`;
      }
    );
  });

/**
 * Form
 */

formWrapperEl.focus();

const radioEls = [...formEl.querySelectorAll("input[type=radio")];

radioEls.forEach((el) => {
  el.addEventListener("change", (event) => {
    textareaEl.value = event.target.value || "";
  });
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = textareaEl.value;

  formWrapperEl.style.display = "none";
  displayEl.style.display = "flex";
  displayEl.focus();
  // TODO: Implement shortcut go back

  const templateEl = document.querySelector("#par-template__id");

  templateEl &&
    input
      .split(/\n\n/)
      .map((paragraph) =>
        paragraph
          .split(/\n/)
          .map((line) => line.trim())
          .join("\n")
      )
      .filter((paragraph) => !!paragraph)
      .forEach((paragraphText, i) => {
        const paragraphLines = paragraphText
          .split(/\n/)
          .map(
            (line) => `
        <p class="par-line__class">${line}</p>`
          )
          .join("");

        const paragraphDocFrag = templateEl.content
          .cloneNode(true)
          .querySelector(".par-container__class");

        paragraphDocFrag.querySelector(
          ".par-lines-wrapper__class"
        ).innerHTML = paragraphLines;

        const paragraphId = `paragraph-${i}__id`;

        paragraphDocFrag.id = paragraphId;
        displayEl.appendChild(paragraphDocFrag);

        // Get the actual DOM node now that we have attached it
        const paragraphEl = displayEl.querySelector(`#${paragraphId}`);

        paragraphEl
          .querySelector(".collapse-btn__class")
          .addEventListener("click", toggleCollapse(paragraphEl));

        paragraphEl
          .querySelector(".bold-btn__class")
          .addEventListener("click", toggleBold(paragraphEl));
      });
  window.localStorage.setItem("input", input);
};

const submitOnEnter = (event) => {
  //   todo: handle firefox
  if ((event.ctrlKey || event.metaKey) && event.which === 13) {
    formEl.dispatchEvent(new Event("submit", { cancelable: true }));
  }
};

formEl.addEventListener("submit", handleSubmit);
textareaEl.addEventListener("keypress", submitOnEnter);
formWrapperEl.addEventListener("keydown", submitOnEnter);
