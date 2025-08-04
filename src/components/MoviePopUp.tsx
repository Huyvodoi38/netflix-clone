import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import CloseButton from "./CloseButton";

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

interface MoviePopUpProps {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
}

const MoviePopUp = ({ movie, isOpen, onClose }: MoviePopUpProps) => {
    const navigate = useNavigate();
    const { dark } = useDarkMode();

    const handleWatchNow = () => {
        if (movie) {
            navigate(`/movie/${movie.id}`);
            onClose();
        }
    };

    if (!isOpen || !movie) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className={`${dark ? 'bg-black' : 'bg-white'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden`} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <CloseButton onClose={onClose} className="absolute top-4 right-4" />

                {/* Movie Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title || movie.original_title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Movie Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            {movie.title || movie.original_title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm mb-3">
                            {movie.release_date && (
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            )}
                            {movie.popularity && (
                                <span>{movie.popularity.toFixed(1)}</span>
                            )}
                            {movie.vote_count && (
                                <span>{movie.vote_count} lượt đánh giá</span>
                            )}
                            {movie.vote_average && (
                                <span>★ {movie.vote_average.toFixed(1)}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Movie Description */}
                <p className={`p-6 mb-6 overflow-y-auto max-h-40 scrollbar-hide text-sm md:text-base leading-relaxed ${dark ? 'text-white' : 'text-black'}`}>
                    {movie.overview}
                </p>
                
                {/* Watch Now Button */}
                <button
                    onClick={handleWatchNow}
                    className="ml-6 mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 cursor-pointer rounded-lg transition-colors duration-200"
                >
                    XEM NGAY
                </button>
            </div>
        </div>
    );
};

export default MoviePopUp;
