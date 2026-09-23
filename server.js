const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const publicDirectory = path.join(__dirname, "public");

// Este estado vive en memoria y se conserva mientras el servidor está encendido.
const state = {
  color: "#ffffff",
  text: "",
};

app.use(express.static(publicDirectory));

app.get("/screen", (request, response) => {
  response.sendFile(path.join(publicDirectory, "screen.html"));
});

app.get("/control", (request, response) => {
  response.sendFile(path.join(publicDirectory, "control.html"));
});

io.on("connection", (socket) => {
  // Cada cliente nuevo recibe inmediatamente el estado actual.
  socket.emit("colorChanged", state.color);
  socket.emit("textChanged", state.text);

  socket.on("changeColor", (color) => {
    // Solo se aceptan colores hexadecimales con el formato #RRGGBB.
    if (typeof color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(color)) {
      return;
    }

    state.color = color.toLowerCase();
    io.emit("colorChanged", state.color);
  });

  socket.on("changeText", (text) => {
    if (typeof text !== "string" || text.length > 200) {
      return;
    }

    state.text = text;
    io.emit("textChanged", state.text);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Interactive Screen disponible en http://localhost:${PORT}`);
  console.log(`Pantalla:   http://localhost:${PORT}/screen`);
  console.log(`Controlador: http://localhost:${PORT}/control`);
});
