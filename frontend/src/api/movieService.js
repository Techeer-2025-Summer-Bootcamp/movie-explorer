import { api } from "./axiosConfig";

// Helper function to extract data from API response
const extractData = (response) => {
  return response.data.data;
};

// Export as a service object for easier imports
export const movieService = {
  // 1) 영화 목록 조회
  getMovies: async () => {
    const response = await api.get("movies");
    return extractData(response);
  },

  // 2) 영화 상세 조회
  getDetailMovieById: async (movieId) => {
    const response = await api.get(`movies/${movieId}`);
    return extractData(response);
  },

  // 3) 영화 생성
  createMovie: async (payload) => {
    const response = await api.post("movies", payload);
    return extractData(response);
  },

  // 4) 영화 수정
  updateMovie: async (movieId, payload) => {
    const response = await api.patch(`/movies/${movieId}`, payload);
    return extractData(response);
  },

  // 5) 영화 삭제
  deleteMovie: async (movieId) => {
    const response = await api.delete(`movies/${movieId}`);
    return extractData(response);
  },

  // Alias for getDetailMovieById for backward compatibility
  getMovie: async (movieId) => {
    const response = await api.get(`movies/${movieId}`);
    return extractData(response);
  },
};
