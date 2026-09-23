const socket = io();
const connectionDot = document.querySelector("#connection-dot");
const connectionText = document.querySelector("#connection-text");
const colorPicker = document.querySelector("#color-picker");
const colorCode = document.querySelector("#color-code");
const colorButtons = document.querySelectorAll("[data-color]");
const screenTextInput = document.querySelector("#screen-text-input");
const clearTextButton = document.querySelector("#clear-text");

function showColor(color) {
  const normalizedColor = color.toLowerCase();
  colorPicker.value = normalizedColor;
  colorCode.value = normalizedColor;
}

function changeColor(color) {
  showColor(color);
  socket.emit("changeColor", color);
}

socket.on("connect", () => {
  connectionDot.className = "connection__dot is-connected";
  connectionText.textContent = "Conectado al servidor";
});

socket.on("disconnect", () => {
  connectionDot.className = "connection__dot is-disconnected";
  connectionText.textContent = "Desconectado. Intentando reconectar…";
});

// También mantiene sincronizados varios controladores si hay más de uno abierto.
socket.on("colorChanged", (color) => {
  showColor(color);
});

socket.on("textChanged", (text) => {
  // No mueve el cursor mientras este controlador está escribiendo.
  if (document.activeElement !== screenTextInput) {
    screenTextInput.value = text;
  }
});

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeColor(button.dataset.color);
  });
});

colorPicker.addEventListener("input", () => {
  changeColor(colorPicker.value);
});

screenTextInput.addEventListener("input", () => {
  socket.emit("changeText", screenTextInput.value);
});

clearTextButton.addEventListener("click", () => {
  screenTextInput.value = "";
  socket.emit("changeText", "");
  screenTextInput.focus();
});
