const express = require('express');
const app = express();
app.use(express.json());

const VALID_USER = 'demo';
const VALID_PASS = 'demo';

// Simple health
app.get('/', (req, res) => res.send('xtream-lite ok'));

// Emula player_api.php?action=get_vod_streams  -> devuelve lista VOD (Xtream-style)
app.get('/player_api.php', (req, res) => {
  const { username, password, action } = req.query;
  if (username !== VALID_USER || password !== VALID_PASS) {
    return res.status(401).json({ user_info: { status: 'Invalid user' }});
  }

  if (action === 'get_vod_streams') {
    // Ejemplo mínimo: id, name, stream_type, stream_icon, rating, movie_description
    const vods = [
      {
        "stream_id": "1001",
        "name": "Película de prueba",
        "stream_type": "movie",
        "stream_icon": "https://i.imgur.com/tuPoster.jpg", // poster público
        "rating": "8.2",
        "container_extension": "mp4",
        "movie_description": "Descripción corta de la película.",
        "movie_duration": "PT1H35M"
      },
      {
        "stream_id": "1002",
        "name": "Corto demo",
        "stream_type": "movie",
        "stream_icon": "https://i.imgur.com/otroPoster.jpg",
        "rating": "7.9",
        "container_extension": "mp4",
        "movie_description": "Otro VOD de prueba",
        "movie_duration": "PT0H10M"
      }
    ];
    return res.json(vods);
  }

  // Opcional: permitir m3u_plus export (para compatibilidad)
  if (req.query.type === 'm3u_plus') {
    const m3u = `#EXTM3U
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/tuPoster.jpg",Película de prueba
https://yourcdn.example.com/peliculas/peli1.mp4`;
    res.set('Content-Type', 'audio/x-mpegurl');
    return res.send(m3u);
  }

  res.json({ result: 'ok' });
});

// Endpoint para obtener URL reproducible desde stream_id (no siempre necesario)
app.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  if (id === '1001') {
    // Devuelve la URL directa al archivo (puedes usar un link público)
    return res.json({
      "stream_id": id,
      "direct_play_url": "https://archive.org/download/example_movie_720p/example_movie.mp4"
    });
  }
  res.status(404).json({ error: 'not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server listening on', port));
