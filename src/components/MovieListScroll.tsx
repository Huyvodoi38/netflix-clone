import { useEffect, useRef, useState } from "react";
import MoviePopUp from "./MoviePopUp";

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

interface MovieListProps {
    movieList: Movie[];
}

const MovieListScroll = ({ movieList }: MovieListProps) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 1000;
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

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [movieList]);

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
                    {movieList.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 w-48 group/item cursor-pointer"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.original_title}
                                className="relative overflow-hidden rounded-lg w-full h-72 object-cover transition-transform duration-300 group-hover/item:scale-105"
                                loading="lazy"
                            />
                            {/* Movie Title Below Poster */}
                            <h3 className="mt-3 px-1 font-medium text-sm line-clamp-2 text-center">
                                {movie.title || movie.original_title}
                            </h3>
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
            <MoviePopUp 
                movie={selectedMovie}
                isOpen={showPopup}
                onClose={closePopup}
            />
        </div>
    );
};

export default MovieListScroll;
