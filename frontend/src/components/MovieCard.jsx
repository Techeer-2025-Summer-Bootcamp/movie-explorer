import React from "react";
import { Star, Calendar, Film } from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {movie.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Film className="w-4 h-4 text-orange-500" />
          {movie.genres && movie.genres.length > 0 ? (
            movie.genres.map((genre, index) => (
              <span
                key={index}
                className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))
          ) : (
            <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              No genre
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-gray-700">{movie.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
