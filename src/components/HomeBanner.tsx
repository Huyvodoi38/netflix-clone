import { useEffect, useRef, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

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
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { dark } = useDarkMode();
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

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Auto-play effect
  useEffect(() => {
    if (banner.length > 0 && !isPaused) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, banner.length, isPaused]);

  return (
    <div className="relative w-full h-150 overflow-hidden rounded-2xl">
      {banner.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Main Content Layout */}
          <div className="absolute inset-0 flex items-center px-8">
            
            {/* Left Navigation Button */}
            <button
              onClick={prevSlide}
              className="bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-lg flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-110 z-20 mr-6"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Central Content - positioned next to left button */}
            <div className="flex-1 max-w-xl text-white">
              <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl">
                <h2 className="text-4xl font-bold mb-4">
                  {movie.title}
                </h2>
                <p className="text-lg mb-6">
                  {movie.overview}
                </p>
                
                {/* Email Signup Section */}
                <div className="mt-6">
                  <p className="text-lg mb-4">
                    Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.
                  </p>
                  <div className="flex items-center gap-4">
                    <input 
                      type="email" 
                      placeholder="Địa chỉ Email" 
                      className="flex-1 p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white/50" 
                    />
                    <button 
                      onClick={() => navigate('#')} 
                      className={`bg-red-500 ${dark ? 'text-white' : 'text-black'} px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-200 cursor-pointer font-medium`}
                    >
                      Bắt đầu &gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={nextSlide}
              className="bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-lg flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-110 z-20 ml-auto"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Pause/Play Button */}
      <button
        onClick={togglePause}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-lg flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-110 z-20"
        aria-label={isPaused ? "Play banner" : "Pause banner"}
      >
        {isPaused ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Banner;
