const express = require("express");
const app = express();
app.use(express.json());

const USER = "demo";
const PASS = "demo";

// Prueba rápida
app.get("/", (req, res) => {
  res.send("✅ Xtream Lite activo y funcionando");
});

// Endpoint Xtream principal
app.get("/player_api.php", (req, res) => {
  const { username, password, action } = req.query;
  if (username !== USER || password !== PASS) {
    return res.status(401).json({ user_info: { status: "error", message: "credenciales inválidas" } });
  }

  if (action === "get_vod_streams") {
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
    return res.json(vods);
  }

  res.json({ result: "ok" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor Xtream Lite escuchando en puerto", port));