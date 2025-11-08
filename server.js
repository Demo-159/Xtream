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
    name: "Shrek (2001)",
    title: "Shrek (2001)",
    stream_type: "movie",
    stream_icon: "https://static.wikia.nocookie.net/doblaje/images/6/69/Shrekban.png/revision/latest?cb=20200731225428&path-prefix=es",
    rating: "7.9",
    rating_5based: 3.75,
    added: "1699564800",
    category_id: "1",
    container_extension: "mkv",
    custom_sid: "",
    direct_source: "https://cdnvideo.davidmonrroy7.workers.dev/video/https%3A%2F%2Farchive.org%2Fdownload%2Fdercro-2040%2FDERCRO2040.mkv"
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
    name: "Pluribus",
    title: "Pluribus",
    cover: "https://i.imgur.com/tVdzIkh.jpeg",
    plot: "La serie está ambientada en Albuquerque, ​siguiendo a la autora Carol Sturka, quien parece ser la única persona inmune a un virus inexplicable que transforma a la población mundial en ciudadanos contentos y optimistas.",
    cast: "	Rhea Seehorn",
    director: "	Vince Gilligan",
    genre: "Drama, Ciencia ficción",
    releaseDate: "2025-11-07",
    last_modified: "1699564800",
    rating: "9.0",
    rating_5based: 4.25,
    backdrop_path: ["https://d32qys9a6wm9no.cloudfront.net/images/tvs/backdrop/f2/0eb528b823acf5fcb65664b432ea07db_1280x720.jpg?t=1760041925"],
    youtube_trailer: "",
    episode_run_time: "45",
    category_id: "1",
    category_ids: [1],  // Añadido
    num: 1
  },
  {
    series_id: 2,
    name: "Chespirito: Sin Querer Queriendo",
    title: "Chespirito: Sin Querer Queriendo",
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
          title: "Episodio 1 - Somos nosotros",
          container_extension: "mp4",
          info: {
            name: "Episodio 1 - Somos nosotros",
            season: 1,
            episode_num: 1,
            air_date: "2025-11-07",
            plot: "El descubrimiento de un astrónomo pone al mundo de cabeza. Carol Sturka, una novelista malhumorada, se enfrenta a este nuevo y extraño mundo.",
            duration_secs: "2700",
            duration: "58:00",
            rating: "9.3",
            cover_big: "https://is1-ssl.mzstatic.com/image/thumb/ntLNBvnQxDUKa70T9THm8Q/580x386KF.TVALC02.webp?color=000000&style=m"
          },
          direct_source: "https://def4.pcloud.com/cBZgWsb877ZpWSrVM7ZZZk5lm0kZ2ZZsVLZkZLdx9iVZo8ZiYZ8QZF7Z4mZ9QZSLZNQZHLZe8ZT4Z04ZlRZbYZR6bM5ZvKBGnb50zlXyCnvQAhBS4Rmhqws7/Pluribus_S01E01_We%20Is%20Us.mp4"
        },
        {
          id: "102",
          episode_num: 2,
          title: "Episodio 2 - Chica Pirata",
          container_extension: "mp4",
          info: {
            name: "Episodio 2 - Chica Pirata",
            season: 1,
            episode_num: 2,
            air_date: "2025-11-07",
            plot: "Un rostro sospechosamente familiar le muestra la nueva y bizarra normalidad a Carol. Una junta en Europa reúne a desconocidos y provoca fricciones.",
            duration_secs: "2700",
            duration: "63:00",
            rating: "9.5",
            cover_big: "https://image.tmdb.org/t/p/original/ep2.jpg"
          },
          direct_source: "https://def2.pcloud.com/cBZlAfb877ZFeLrVM7ZZZhJlm0kZ2ZZsVLZkZsXfHJVZQ4Z7RZS8ZgRZCpZ3JZgQZ6zZdRZiFZU8Z14Zj4Za8ZhHYM5ZzWnwGtuUXBkXID3pL8bEUYu99f2y/Pluribus_S01E02_Pirate%20Lady.mp4"
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
        air_date: "2025-05-15"
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
      tmdb_id: "tt0126029",
      name: "Shrek",
      o_name: "Shrek (2001)",
      cover_big: "https://m.media-amazon.com/images/M/MV5BMTAyODc3Njc1NjdeQTJeQWpwZ15BbWU3MDQ3MDgyNDY@._V1_.jpg",
      movie_image: "https://m.media-amazon.com/images/M/MV5BMTk2NTE1NTE0M15BMl5BanBnXkFtZTgwNjY4NTYxMTE@._V1_.jpg",
      releasedate: "2001-01-15",
      youtube_trailer: "https://www.youtube.com/watch?v=TMIsxOsuwNA",
      director: "Andrew Adamson, Vicky Jenson",
      actors: "Mike Myers, Eddie Murphy, Cameron Diaz",
      cast: "Mike Myers, Eddie Murphy, Cameron Diaz",
      description: "Esta es una descripción de ejemplo para la película 1.",
      plot: "Un malvado señor exilia a las criaturas de los cuentos de hadas al pantano de un ogro gruñón, que debe emprender una búsqueda y rescatar a una princesa para el señor con el fin de recuperar sus tierras.",
      age: "PG-13",
      rating: "7.9",
      country: "USA",
      genre: "Animación, Comedia",
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

// Endpoint M3U para TiviMate
app.get('/get.php', (req, res) => {
  const { username, password, type } = req.query;
  
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(401).send('#EXTM3U\n#EXTINF:-1,Error: Invalid credentials\nhttp://invalid');
  }
  
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  let m3uContent = '#EXTM3U x-tvg-url=""\n\n';
  
  // Si se solicita solo series o todo el contenido
  if (!type || type === 'series') {
    // Agregar series usando el formato de series
    series.forEach(serie => {
      const serieData = seriesEpisodes[serie.series_id];
      if (serieData && serieData.episodes) {
        Object.keys(serieData.episodes).forEach(seasonNum => {
          const episodes = serieData.episodes[seasonNum];
          episodes.forEach(episode => {
            const episodeName = `${serie.name} S${String(seasonNum).padStart(2, '0')}E${String(episode.episode_num).padStart(2, '0')} ${episode.title}`;
            // Usar tvg-type="series" para que TiviMate lo reconozca
            m3uContent += `#EXTINF:-1 tvg-id="serie_${serie.series_id}_${seasonNum}_${episode.episode_num}" tvg-name="${episodeName}" tvg-logo="${serie.cover}" tvg-type="series" group-title="📺 ${serie.name}",${episodeName}\n`;
            m3uContent += `${baseUrl}/series/${username}/${password}/${episode.id}.${episode.container_extension}\n\n`;
          });
        });
      }
    });
  }
  
  // Si se solicita solo películas o todo el contenido
  if (!type || type === 'movie') {
    // Agregar películas
    movies.forEach(movie => {
      m3uContent += `#EXTINF:-1 tvg-id="${movie.stream_id}" tvg-name="${movie.name}" tvg-logo="${movie.stream_icon}" tvg-type="movie" group-title="🎬 Películas",${movie.name}\n`;
      m3uContent += `${baseUrl}/movie/${username}/${password}/${movie.stream_id}.${movie.container_extension}\n\n`;
    });
  }
  
  res.setHeader('Content-Type', 'audio/x-mpegurl; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline; filename="playlist.m3u"');
  res.send(m3uContent);
});

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

const path = require('path');

// Servir el portal de administración
app.get('/portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'portal.html'));
});