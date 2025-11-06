const express = require("express");
const app = express();

const USER = "demo";
const PASS = "demo";

// Información básica del usuario y servidor
function baseResponse() {
  return {
    user_info: {
      username: USER,
      password: PASS,
      auth: 1,
      status: "Active",
    },
    server_info: {
      url: "f5e7fd48-33b0-4032-b082-ba68c4c22bb6-00-3li1y9vcut0gx.picard.replit.dev",
      port: 443,
      https_port: 443,
      server_protocol: "https",
      timezone: "UTC",
    },
  };
}

// Películas VOD
const vods = [
  {
    stream_id: 1,
    name: "Demo Movie",
    stream_type: "movie",
    stream_icon: "https://i.imgur.com/q0z7O4x.jpeg",
    rating: "8.5",
    movie_description: "Película de demostración con metadata visible en TiviMate.",
    container_extension: "mp4",
  },
  {
    stream_id: 2,
    name: "Corto de prueba",
    stream_type: "movie",
    stream_icon: "https://i.imgur.com/HvTz5FC.jpeg",
    rating: "7.9",
    movie_description: "Otro ejemplo simple con póster y descripción.",
    container_extension: "mp4",
  },
];

// Root para test rápido
app.get("/", (req, res) => {
  res.send("✅ Xtream API simulada corriendo correctamente");
});

// Endpoint principal (imitando Xtream Codes)
app.get("/player_api.php", (req, res) => {
  const { username, password, action } = req.query;
  if (username !== USER || password !== PASS) {
    return res.status(401).json({ user_info: { status: "error" } });
  }

  // 1️⃣ Solicitud general de info (sin acción)
  if (!action) {
    return res.json(baseResponse());
  }

  // 2️⃣ Acción para listar VOD
  if (action === "get_vod_streams") {
    return res.json(vods);
  }

  // 3️⃣ Acción para obtener info de una película específica
  if (action === "get_vod_info" && req.query.vod_id) {
    const movie = vods.find(v => v.stream_id == req.query.vod_id);
    if (!movie) return res.status(404).json({ error: "not found" });
    return res.json({
      movie_data: movie,
      info: {
        name: movie.name,
        plot: movie.movie_description,
        cover: movie.stream_icon,
        director: "Desconocido",
        cast: "Actor 1, Actor 2",
        releasedate: "2024",
        rating: movie.rating,
        duration_secs: 5400,
      },
    });
  }

  res.json({ error: "Acción no reconocida" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor Xtream simulado escuchando en puerto", port));