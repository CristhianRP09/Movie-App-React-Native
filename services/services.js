import axios from 'axios';
import { BASE_URL, API_KEY } from '@env';

// Get Popular Movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  return res.data.results;
}

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);

  return res.data.results;
}

// Get Popular TV
export const getPopularTv = async () => {
  const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

  return res.data.results;
}

// Get Family Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`);

  return res.data.results;
}

// Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`);

  return res.data.results;
}

// Get Details
export const getDetails = async (id, isMovie) => {
  const res = await axios.get(`${BASE_URL}/${isMovie ? 'movie' : 'tv'}/${id}?api_key=${API_KEY}`);

  return res.data;
}