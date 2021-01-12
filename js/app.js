const formEl = document.querySelector("#form__id");
const textareaEl = formEl.querySelector("#textarea__id");
const displayEl = document.querySelector("#display-container__id");

const handleGoBack = () => {
  formEl.style.display = "flex";
  displayEl.style.display = "none";
};

displayEl
  .querySelector("#back-btn__id")
  .addEventListener("click", handleGoBack);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = textareaEl.value;

  formEl.style.display = "none";
  displayEl.style.display = "flex";
};

const submitOnEnter = (event) => {
  //   todo: handle firefox
  if ((event.ctrlKey || event.metaKey) && event.which === 13) {
    formEl.dispatchEvent(new Event("submit", { cancelable: true }));
  }
};

formEl.addEventListener("submit", handleSubmit);
textareaEl.addEventListener("keypress", submitOnEnter);
