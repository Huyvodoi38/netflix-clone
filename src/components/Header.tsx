import { useEffect, useState, useRef } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Logo from "./Logo";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Header = () => {
  const { dark, toggleDark } = useDarkMode();
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState<Movie[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
    setSearch('');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch('');
  }

  const handleInputFocus = () => {
    setShowSearch(true);
  }

  const fetchMovie = async () => {
    if (search.trim() === '') {
      setMovie([]);
      return;
    }
    const response = await api.get(`/search/movie?query=${search}`, {
      params: {
        language: 'vi-VN',
      },
    });
    setMovie(response.data.results.slice(0, 5));
  }

  useEffect(() => {
    fetchMovie();
    if (search.trim() !== '' && movie.length > 0) {
      setShowSearch(true);
    }
  }, [search]);

  // Handle click outside to hide search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-4">
      <Logo className="w-40 h-20 ml-10" />
      {/*Search*/}
      <div className="relative" ref={searchRef}>
          <form onSubmit={handleSubmit} className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={`w-full h-10 rounded-md px-4 py-2 border-2 border-gray-300 ${dark ? 'placeholder:text-white' : 'placeholder:text-black'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={handleInputFocus}
            />
            <button
              className={`flex-none bg-red-500 ${dark ? 'text-white' : 'text-black'} px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 cursor-pointer`}
              type="submit"
            >
              Tìm kiếm
            </button>
          </form>
        {movie.length > 0 && showSearch && (
          <div className={`absolute top-[100%] left-0 w-full ${dark ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-md z-30`}>
            {movie.map((movie) => (
              <div onClick={() => handleSearch(movie)} key={movie.id} className={`flex gap-2 items-center p-2 ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-10 h-10 rounded-md" />
                <p className="text-sm font-medium">{movie.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <nav className="flex items-center space-x-6">
        <a href="/movie-collection" className="hover:text-gray-300 text-xl font-semibold pr-10">
          Phim
        </a>
        <a href="#" className="hover:text-gray-300 text-xl font-semibold pr-10">
          Thanh toán
        </a>
        <a href="#" className="hover:text-gray-300 text-xl font-semibold pr-10">
          Đăng nhập
        </a>
        {/* Nút chuyển dark/light mode */}
        <button
          onClick={toggleDark}
          className="text-2xl focus:outline-none cursor-pointer"
          title="Chuyển chế độ sáng/tối"
        >
          {dark ? (
            // Icon mặt trời (chế độ sáng)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          ) : (
            // Icon mặt trăng (chế độ tối)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          )}
        </button>
      </nav>
    </div>
  );
};

export default Header;