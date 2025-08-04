import { useState } from "react";
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

const MovieListPagination = ({ movieList }: { movieList: Movie[] }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMovie(null);
    };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setShowPopup(true);
    };

    return (
        <div className="relative">
            {/* Movie List */}
            <div className="flex flex-wrap justify-center gap-10">
                {movieList.map(movie => (
                    <div key={movie.id} className="flex-shrink-0 w-48 group/item cursor-pointer" onClick={() => handleMovieClick(movie)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="relative overflow-hidden rounded-lg w-full h-72 object-cover transition-transform duration-300 group-hover/item:scale-105"
                        />
                        <h3 className="mt-3 px-1 font-medium text-sm line-clamp-2 text-center">{movie.title}</h3>
                    </div>
                ))}
            </div>
            {/* Movie Detail Popup */}
            <MoviePopUp 
                movie={selectedMovie}
                isOpen={showPopup}
                onClose={closePopup}
            />
        </div>
    )
}

export default MovieListPagination;