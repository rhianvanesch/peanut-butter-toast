import toast from "../toast.js";

const form = document.getElementById("toast-settings");

let count = 0;

function showToast(e) {
  const formData = {};
  new FormData(e.target).forEach((value, key) => {
    formData[key] = value;
  });

  e.preventDefault();
  count++;

  toast.show(`Hi, I'm a toast! 🍞 ${count}`, {
    autoDismiss: formData.autoDismiss ? true : false,
    timeout: parseInt(formData.timeout, 10),
    position: formData.position,
    type: formData.type
  });
}

form.addEventListener("submit", showToast);

const radioInputs = document.querySelectorAll('input[name="position"]');

radioInputs.forEach(input => {
  input.addEventListener("change", event => {
    toast.closeAll();
    count = 0;
  });
});
