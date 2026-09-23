const socket = io();
const screenText = document.querySelector("#screen-text");

function useReadableTextColor(backgroundColor) {
  const red = Number.parseInt(backgroundColor.slice(1, 3), 16);
  const green = Number.parseInt(backgroundColor.slice(3, 5), 16);
  const blue = Number.parseInt(backgroundColor.slice(5, 7), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  screenText.style.color = brightness > 140 ? "#111111" : "#ffffff";
}

socket.on("colorChanged", (color) => {
  document.body.style.backgroundColor = color;
  useReadableTextColor(color);
});

socket.on("textChanged", (text) => {
  // textContent evita que el texto introducido se interprete como HTML.
  screenText.textContent = text;
});
