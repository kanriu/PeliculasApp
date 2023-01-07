import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '517100c0689c093144379c24c63fb7fb',
    language: 'es-ES',
  },
});

export default movieDB;
