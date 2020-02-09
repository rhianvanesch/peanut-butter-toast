const DEFAULT_OPTIONS = {
  autoDismiss: false,
  position: "center-top",
  showCloseButton: true,
  timeout: 5000,
  type: "info"
};

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

function extractHeight(string) {
  const numberRegex = /-?[0-9]+/;
  return string.match(numberRegex);
}

function createToastElement({ message, type, position, showCloseButton }) {
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.classList.add("ui-toast", `ui-toast--${type}`, `ui-toast--${position}`);
  toast.textContent = message;

  if (showCloseButton) {
    const toastBtn = document.createElement("button");
    toastBtn.className = "ui-toast__close";
    const toastBtnText = document.createElement("span");
    toastBtnText.textContent = "Close";
    toastBtnText.className = "ui-toast__close-text";
    toastBtn.appendChild(toastBtnText);
    toast.appendChild(toastBtn);
  }
  return toast;
}

export default {
  toasts: [],

  show(message, options) {
    const toastOptions = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    const bottomPosition = toastOptions.position.includes("bottom");
    const transformModifier = bottomPosition ? "-" : "";

    const toast = createToastElement({
      message,
      position: toastOptions.position,
      showCloseButton: toastOptions.showCloseButton,
      type: toastOptions.type
    });

    toast.id = `toast-${generateId()}`;

    document.body.appendChild(toast);
    if (this.toasts.length) {
      const height = toast.getBoundingClientRect().height;

      this.toasts.forEach(oldToast => {
        if (oldToast.toast.style.transform) {
          const previousHeight = parseInt(
            extractHeight(oldToast.toast.style.transform),
            10
          );
          const newHeight = bottomPosition
            ? height - previousHeight
            : height + previousHeight;
          oldToast.toast.style.transform = `translateY(${transformModifier}${newHeight +
            20}px)`;
        } else {
          oldToast.toast.style.transform = `translateY(${transformModifier}${height +
            20}px)`;
        }
      });
    }

    if (toastOptions.showCloseButton) {
      toast.querySelector("button").addEventListener("click", () => {
        this.close(toast, toastOptions.position);
      });
    }

    this.toasts = this.toasts.concat([{ id: toast.id, toast }]);

    setTimeout(() => {
      toast.classList.add("ui-toast--active");
    }, 250);

    if (toastOptions.autoDismiss) {
      setTimeout(() => {
        this.close(toast, toastOptions.position);
      }, toastOptions.timeout + 500);
    }
  },

  closeAll() {
    if (document.querySelectorAll(".ui-toast").length) {
      document.querySelectorAll(".ui-toast").forEach(toast => {
        toast.remove();
      });
    }
    this.toasts = [];
  },

  close(toast, position) {
    toast.classList.remove("ui-toast--active");

    const height = toast.getBoundingClientRect().height;
    const bottomPosition = position.includes("bottom");
    const indexOfRemovedToast = this.toasts.findIndex(t => t.id === toast.id);

    setTimeout(() => {
      toast.remove();

      if (this.toasts.length > 1) {
        for (let i = indexOfRemovedToast - 1; i >= 0; i--) {
          if (this.toasts[i] && this.toasts[i].toast.style.transform) {
            const previousHeight = parseInt(
              extractHeight(this.toasts[i].toast.style.transform),
              10
            );
            const newHeight = bottomPosition
              ? previousHeight + height + 20
              : previousHeight - height - 20;
            this.toasts[i].toast.style.transform = `translateY(${newHeight}px)`;
          }
        }
      }
      this.toasts = this.toasts.filter(t => t.id !== toast.id);
    }, 250);
  }
};
