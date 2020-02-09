const form = document.getElementById("toast-settings");

let count = 0;

function showToast(e) {
  e.preventDefault();

  const formData = {};

  new FormData(e.target).forEach((value, key) => {
    formData[key] = value;
  });

  count++;

  toast.show(`Hi, I'm a toast! 🍞 ${count}`, {
    autoDismiss: formData.autoDismiss,
    timeout: parseInt(formData.timeout, 10),
    position: formData.position,
    type: formData.type
  });
}

form.addEventListener("submit", showToast);

const positionInputs = document.querySelectorAll('input[name="position"]');

positionInputs.forEach(input => {
  input.addEventListener("change", event => {
    toast.closeAll();
    count = 0;
  });
});
