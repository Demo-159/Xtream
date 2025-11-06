const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de usuario (cámbialo por seguridad)
const USERNAME = 'usuario';
const PASSWORD = 'password123';

// Base de datos de películas (agrega tus videos de Archive.org aquí)
const movies = [
  {
    stream_id: 1,
    num: 1,
    name: "Película Ejemplo 1",
    title: "Película Ejemplo 1",
    stream_type: "movie",
    stream_icon: "https://image.tmdb.org/t/p/w500/ejemplo1.jpg",
    rating: "7.5",
    rating_5based: 3.75,
    added: "1699564800",
    category_id: "1",
    container_extension: "mp4",
    custom_sid: "",
    direct_source: "https://archive.org/download/tu-id/pelicula1.mp4"
  },
  {
    stream_id: 2,
    num: 2,
    name: "Película Ejemplo 2",
    title: "Película Ejemplo 2",
    stream_type: "movie",
    stream_icon: "https://image.tmdb.org/t/p/w500/ejemplo2.jpg",
    rating: "8.2",
    rating_5based: 4.1,
    added: "1699651200",
    category_id: "1",
    container_extension: "mp4",
    custom_sid: "",
    direct_source: "https://archive.org/download/tu-id/pelicula2.mp4"
  }
];

// Información detallada de películas
const movieInfo = {
  1: {
    info: {
      tmdb_id: "12345",
      name: "Película Ejemplo 1",
      o_name: "Example Movie 1",
      cover_big: "https://image.tmdb.org/t/p/original/ejemplo1.jpg",
      movie_image: "https://image.tmdb.org/t/p/w500/ejemplo1.jpg",
      releasedate: "2023-01-15",
      youtube_trailer: "",
      director: "Director Ejemplo",
      actors: "Actor 1, Actor 2, Actor 3",
      cast: "Actor 1, Actor 2",
      description: "Esta es una descripción de ejemplo para la película 1.",
      plot: "Plot detallado de la película...",
      age: "PG-13",
      rating: "7.5",
      country: "USA",
      genre: "Acción, Aventura",
      duration: "7200",
      duration_secs: 7200,
      video: {
        codec: "h264",
        bitrate: 2500
      },
      audio: {
        codec: "aac",
        bitrate: 128
      }
    },
    movie_data: {
      stream_id: 1,
      name: "Película Ejemplo 1",
      added: "1699564800",
      category_id: "1",
      container_extension: "mp4",
      custom_sid: "",
      direct_source: "https://archive.org/download/tu-id/pelicula1.mp4"
    }
  }
};

const categories = [
  {
    category_id: "1",
    category_name: "Películas",
    parent_id: 0
  }
];

// Middleware
app.use(express.json());

// Autenticación
function authenticate(req, res, next) {
  const { username, password } = req.query;
  if (username === USERNAME && password === PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
}

// Endpoint de autenticación
app.get('/player_api.php', authenticate, (req, res) => {
  const action = req.query.action;

  switch (action) {
    case 'get_vod_streams':
      res.json(movies);
      break;
    
    case 'get_vod_categories':
      res.json(categories);
      break;
    
    case 'get_vod_info':
      const vodId = req.query.vod_id;
      const info = movieInfo[vodId];
      if (info) {
        res.json(info);
      } else {
        res.json({ error: "VOD not found" });
      }
      break;
    
    case 'get_series':
      res.json([]);
      break;
    
    case 'get_live_streams':
      res.json([]);
      break;
    
    default:
      // Respuesta por defecto (info del servidor)
      res.json({
        user_info: {
          username: USERNAME,
          password: PASSWORD,
          message: "API activa",
          auth: 1,
          status: "Active",
          exp_date: "2099999999",
          is_trial: "0",
          active_cons: "0",
          created_at: "1699564800",
          max_connections: "5",
          allowed_output_formats: ["m3u8", "ts", "rtmp"]
        },
        server_info: {
          url: req.protocol + '://' + req.get('host'),
          port: port,
          https_port: "",
          server_protocol: "http",
          rtmp_port: "",
          timezone: "UTC",
          timestamp_now: Math.floor(Date.now() / 1000),
          time_now: new Date().toISOString()
        }
      });
  }
});

// Endpoint para streaming (redirige a Archive.org)
app.get('/movie/:username/:password/:streamId.:ext', (req, res) => {
  const { username, password, streamId } = req.params;
  
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).send('Unauthorized');
  }
  
  const movie = movies.find(m => m.stream_id == streamId);
  if (movie && movie.direct_source) {
    res.redirect(movie.direct_source);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Xtream API Server - Running');
});

app.listen(port, () => {
  console.log(`Xtream API running on port ${port}`);
});