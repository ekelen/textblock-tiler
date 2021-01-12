const formEl = document.querySelector("#form__id");
const textareaEl = formEl.querySelector("#textarea__id");

const handleSubmit = (event) => {
  event.preventDefault();
  const input = textareaEl.value;

  //   formEl.style.display = "none";
  console.log(`input:`, input);
};

const submitOnEnter = (event) => {
  //   todo: handle firefox
  if ((event.ctrlKey || event.metaKey) && event.which === 13) {
    formEl.dispatchEvent(new Event("submit", { cancelable: true }));
  }
};

formEl.addEventListener("submit", handleSubmit);
textareaEl.addEventListener("keypress", submitOnEnter);
