import { useEffect, useRef, useState } from "react";
import api from "../api/api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

const Banner = () => {
  const [banner, setBanner] = useState<Movie[]>([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  // Fetch movies từ API
  const fetchMovies = async () => {
    try {
      const response = await api.get('/trending/movie/day', {
        params: {
          page: 1,
          language: 'vi-VN',
        },
      });

      // Lấy 5 phim đầu tiên từ response
      setBanner(response.data?.results?.slice(0, 5) || []);
    } catch (err: any) {
      console.error('Error fetching movies:', err);
    }
  };

  // Fetch movies khi component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banner.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + banner.length) % banner.length);
  };

  // Auto-play effect
  useEffect(() => {
    if (banner.length > 0) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, banner.length]);

  return (
    <div className="relative w-full h-150 overflow-hidden rounded-2xl">
      {banner.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center px-10 text-white">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4 line-clamp-2">
                {movie.title}
              </h2>
              <p className="text-lg max-w-xl line-clamp-none">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Left Navigation Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-lg flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Navigation Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-lg flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      </div>
  );
};

export default Banner;
