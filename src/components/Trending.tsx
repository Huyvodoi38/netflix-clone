import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

interface Movie {
    id: number;
    original_title: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_count: number;
    release_date?: string;
    vote_average?: number;
    popularity?: number;
}

const Trending = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    const fetchTrending = async () => {
        try {
            const response = await api.get('trending/movie/day', {
                params: {
                    page: 1,
                    language: 'vi-VN',
                },
            });
            setTrending(response.data?.results?.slice(0, 15) || []);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        }
    }

    useEffect(() => {
        fetchTrending();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 1000;
            
            // Nếu đang ở đầu và cuộn trái, cuộn về cuối
            if (container.scrollLeft <= 0) {
                container.scrollTo({
                    left: container.scrollWidth - container.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 1000;
            
            // Nếu đang ở cuối và cuộn phải, cuộn về đầu
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMovie(null);
    };

    const handleWatchNow = () => {
        navigate(`/movie/${selectedMovie?.id}`);
    };

    return (
        <div className="relative">
            {/* Movie List Container with Navigation */}
            <div className="flex items-center">
                {/* Left Navigation Button */}
                <button 
                    onClick={scrollLeft}
                    className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 ml-8"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Scrollable Movie List */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-20 overflow-x-auto scrollbar-hide scroll-smooth px-6 flex-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {trending.map((movie) => (
                        <div 
                            key={movie.id} 
                            className="flex-shrink-0 w-48 group/item cursor-pointer"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <div className="relative overflow-hidden rounded-lg bg-gray-800">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                    alt={movie.title || movie.original_title}
                                    className="w-full h-72 object-cover transition-transform duration-300 group-hover/item:scale-105"
                                    loading="lazy"
                                />
                            </div>
                            {/* Movie Title Below Poster */}
                            <div className="mt-3 px-1">
                                <h3 className="font-medium text-sm line-clamp-2 text-center">
                                    {movie.title || movie.original_title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Navigation Button */}
                <button 
                    onClick={scrollRight}
                    className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 mr-8"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Movie Detail Popup */}
            {showPopup && selectedMovie && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Close Button */}
                        <button 
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Movie Image */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                            <img 
                                src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                                alt={selectedMovie.title || selectedMovie.original_title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            
                            {/* Movie Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                    {selectedMovie.title || selectedMovie.original_title}
                                </h2>
                                <div className="flex items-center gap-4 text-sm mb-3">
                                    {selectedMovie.release_date && (
                                        <span>{new Date(selectedMovie.release_date).getFullYear()}</span>
                                    )}
                                    {selectedMovie.popularity && (
                                        <span>{selectedMovie.popularity.toFixed(1)}</span>
                                    )}
                                    {selectedMovie.vote_count && (
                                        <span>{selectedMovie.vote_count} lượt đánh giá</span>
                                    )}
                                    {selectedMovie.vote_average && (
                                        <span>★ {selectedMovie.vote_average.toFixed(1)}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Movie Description */}
                        <div className="p-6">
                            <p className="text-white text-sm md:text-base leading-relaxed mb-6">
                                {selectedMovie.overview}
                            </p>
                            
                            {/* Watch Now Button */}
                            <button 
                                onClick={handleWatchNow}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 cursor-pointer rounded-lg transition-colors duration-200"
                            >
                                XEM NGAY
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Trending;