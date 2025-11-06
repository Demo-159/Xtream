const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de usuario (cámbialo por seguridad)
const USERNAME = 'usuario';
const PASSWORD = 'password123';

// Base de datos de películas
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

// Base de datos de series - FORMATO CORRECTO PARA XTREAM
const series = [
  {
    series_id: 1,
    name: "Serie Ejemplo 1",
    title: "Serie Ejemplo 1",
    cover: "https://image.tmdb.org/t/p/w500/serie1.jpg",
    plot: "Una serie de ejemplo sobre aventuras increíbles",
    cast: "Actor A, Actor B, Actor C",
    director: "Director X",
    genre: "Drama, Acción",
    releaseDate: "2023-01-01",
    last_modified: "1699564800",
    rating: "8.5",
    rating_5based: 4.25,
    backdrop_path: ["https://image.tmdb.org/t/p/original/backdrop1.jpg"],
    youtube_trailer: "",
    episode_run_time: "45",
    category_id: "1",
    category_ids: [1],  // Añadido
    num: 1
  },
  {
    series_id: 2,
    name: "Serie Ejemplo 2",
    title: "Serie Ejemplo 2",
    cover: "https://image.tmdb.org/t/p/w500/serie2.jpg",
    plot: "Una comedia familiar divertida",
    cast: "Actor D, Actor E",
    director: "Director Y",
    genre: "Comedia",
    releaseDate: "2022-05-15",
    last_modified: "1699564800",
    rating: "7.8",
    rating_5based: 3.9,
    backdrop_path: ["https://image.tmdb.org/t/p/original/backdrop2.jpg"],
    youtube_trailer: "",
    episode_run_time: "30",
    category_id: "1",
    category_ids: [1],  // Añadido
    num: 2
  }
];

// Episodios de las series
const seriesEpisodes = {
  1: {
    seasons: [
      {
        season_number: 1,
        name: "Temporada 1",
        episode_count: 3,
        cover: "https://image.tmdb.org/t/p/w500/season1.jpg",
        cover_big: "https://image.tmdb.org/t/p/original/season1.jpg",
        air_date: "2023-01-01"
      },
      {
        season_number: 2,
        name: "Temporada 2",
        episode_count: 2,
        cover: "https://image.tmdb.org/t/p/w500/season2.jpg",
        cover_big: "https://image.tmdb.org/t/p/original/season2.jpg",
        air_date: "2023-06-01"
      }
    ],
    episodes: {
      1: [
        {
          id: "101",
          episode_num: 1,
          title: "Episodio 1 - El Comienzo",
          container_extension: "mp4",
          info: {
            name: "Episodio 1 - El Comienzo",
            season: 1,
            episode_num: 1,
            air_date: "2023-01-01",
            plot: "El primer episodio de la serie",
            duration_secs: "2700",
            duration: "45:00",
            rating: "8.3",
            cover_big: "https://image.tmdb.org/t/p/original/ep1.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie1_s01e01.mp4"
        },
        {
          id: "102",
          episode_num: 2,
          title: "Episodio 2 - La Aventura Continúa",
          container_extension: "mp4",
          info: {
            name: "Episodio 2 - La Aventura Continúa",
            season: 1,
            episode_num: 2,
            air_date: "2023-01-08",
            plot: "La trama se complica",
            duration_secs: "2700",
            duration: "45:00",
            rating: "8.5",
            cover_big: "https://image.tmdb.org/t/p/original/ep2.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie1_s01e02.mp4"
        },
        {
          id: "103",
          episode_num: 3,
          title: "Episodio 3 - El Desenlace",
          container_extension: "mp4",
          info: {
            name: "Episodio 3 - El Desenlace",
            season: 1,
            episode_num: 3,
            air_date: "2023-01-15",
            plot: "Final de temporada impactante",
            duration_secs: "2700",
            duration: "45:00",
            rating: "9.0",
            cover_big: "https://image.tmdb.org/t/p/original/ep3.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie1_s01e03.mp4"
        }
      ],
      2: [
        {
          id: "201",
          episode_num: 1,
          title: "Episodio 1 - Nueva Temporada",
          container_extension: "mp4",
          info: {
            name: "Episodio 1 - Nueva Temporada",
            season: 2,
            episode_num: 1,
            air_date: "2023-06-01",
            plot: "Comienza una nueva aventura",
            duration_secs: "2700",
            duration: "45:00",
            rating: "8.7",
            cover_big: "https://image.tmdb.org/t/p/original/s2ep1.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie1_s02e01.mp4"
        },
        {
          id: "202",
          episode_num: 2,
          title: "Episodio 2 - El Giro",
          container_extension: "mp4",
          info: {
            name: "Episodio 2 - El Giro",
            season: 2,
            episode_num: 2,
            air_date: "2023-06-08",
            plot: "Un giro inesperado en la trama",
            duration_secs: "2700",
            duration: "45:00",
            rating: "8.9",
            cover_big: "https://image.tmdb.org/t/p/original/s2ep2.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie1_s02e02.mp4"
        }
      ]
    }
  },
  2: {
    seasons: [
      {
        season_number: 1,
        name: "Temporada 1",
        episode_count: 2,
        cover: "https://image.tmdb.org/t/p/w500/serie2season1.jpg",
        cover_big: "https://image.tmdb.org/t/p/original/serie2season1.jpg",
        air_date: "2022-05-15"
      }
    ],
    episodes: {
      1: [
        {
          id: "301",
          episode_num: 1,
          title: "Piloto",
          container_extension: "mp4",
          info: {
            name: "Piloto",
            season: 1,
            episode_num: 1,
            air_date: "2022-05-15",
            plot: "El episodio piloto",
            duration_secs: "1800",
            duration: "30:00",
            rating: "7.5",
            cover_big: "https://image.tmdb.org/t/p/original/serie2ep1.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie2_s01e01.mp4"
        },
        {
          id: "302",
          episode_num: 2,
          title: "Segundo Episodio",
          container_extension: "mp4",
          info: {
            name: "Segundo Episodio",
            season: 1,
            episode_num: 2,
            air_date: "2022-05-22",
            plot: "La historia continúa",
            duration_secs: "1800",
            duration: "30:00",
            rating: "8.0",
            cover_big: "https://image.tmdb.org/t/p/original/serie2ep2.jpg"
          },
          direct_source: "https://archive.org/download/tu-id/serie2_s01e02.mp4"
        }
      ]
    }
  }
};

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

const seriesCategories = [
  {
    category_id: "1",
    category_name: "Series",
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

// Endpoint de autenticación Xtream Codes
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
      res.json(series);
      break;
    
    case 'get_series_categories':
      res.json(seriesCategories);
      break;
    
    case 'get_series_info':
      const seriesId = req.query.series_id;
      const serieInfo = series.find(s => s.series_id == seriesId);
      const serieEpisodes = seriesEpisodes[seriesId];
      
      if (serieInfo && serieEpisodes) {
        res.json({
          seasons: serieEpisodes.seasons,
          info: serieInfo,
          episodes: serieEpisodes.episodes
        });
      } else {
        res.json({ error: "Series not found" });
      }
      break;
    
    case 'get_live_streams':
      res.json([]);
      break;
    
    case 'get_live_categories':
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

// Endpoint para streaming de películas (redirige a Archive.org)
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

// Endpoint para streaming de series (redirige a Archive.org)
app.get('/series/:username/:password/:episodeId.:ext', (req, res) => {
  const { username, password, episodeId } = req.params;
  
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).send('Unauthorized');
  }
  
  // Buscar el episodio en todas las series
  let foundEpisode = null;
  
  for (const seriesId in seriesEpisodes) {
    const serieData = seriesEpisodes[seriesId];
    for (const seasonNum in serieData.episodes) {
      const episode = serieData.episodes[seasonNum].find(ep => ep.id === episodeId);
      if (episode) {
        foundEpisode = episode;
        break;
      }
    }
    if (foundEpisode) break;
  }
  
  if (foundEpisode && foundEpisode.direct_source) {
    res.redirect(foundEpisode.direct_source);
  } else {
    res.status(404).send('Episode not found');
  }
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Xtream API Server - Running (Movies + Series)');
});

app.listen(port, () => {
  console.log(`Xtream API running on port ${port}`);
  console.log(`URL de conexión: http://localhost:${port}`);
  console.log(`Usuario: ${USERNAME}`);
  console.log(`Contraseña: ${PASSWORD}`);
});