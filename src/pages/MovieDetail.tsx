import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import VideoPopUp from "../components/VideoPopUp";
import Reviews from "../components/Reviews";
import MovieListScroll from "../components/MovieListScroll";
import CastList from "../components/CastList";


interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    tagline: string;
    genres: { id: number; name: string }[];
    runtime: number;
}

interface SimilarMovie {
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

interface Trailer {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

const MovieDetail = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
    const { id } = useParams();
    const [trailer, setTrailer] = useState<Trailer | null>(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [castList, setCastList] = useState<Cast[]>([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await api.get(`/movie/${id}`, {
                params: {
                    language: 'vi-VN',
                },
            });
            setMovie(response.data);
        }
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchTrailer = async () => {
            const response = await api.get(`/movie/${id}/videos`, {
            });
            const trailer = response.data.results.find((video: any) =>  video.type === 'Trailer');
            setTrailer(trailer);
        }
        fetchTrailer();
    }, [id]);

    useEffect(() => {
        const fetchSimilarMovies = async () => {
            const response = await api.get(`/movie/${id}/similar`, {
                params: {
                    language: 'vi-VN',
                },
            });
            setSimilarMovies(response.data.results.slice(0, 15));
        }
        fetchSimilarMovies();
    }, [id]);

    useEffect(() => {
        const fetchCast = async () => {
            const response = await api.get(`/movie/${id}/credits`, {
                params: {
                    language: 'vi-VN',
                },
            });
            setCastList(response.data.cast);
        }
        fetchCast();
    }, [id]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [id]);

    const handleWatchTrailer = () => {
        if (trailer) {
            setShowTrailer(true);
        } else {
            alert('Không có trailer');
        }
    };

    const handleShowReviews = () => {
        setShowReviews(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div>
            {/*Movie Detail*/}
            <div className="w-full min-h-150 relative overflow-hidden rounded-l">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                        alt={movie?.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                </div>
                {/*Content*/}
                <div className="relative z-10 flex h-full">
                    {/*Left Section*/}
                    <div className="w-2/5 p-6 flex item-center justify-center">
                        <div className="relative">
                            <div className="w-full h-140 rounded-lg overflow-hidden">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                                    alt={movie?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    {/*Right Section*/}
                    <div className="w-1/2 p-6 flex flex-col justify-center">
                        {/*Movie title*/}
                        <h1 className="text-5xl font-bold mb-4 font-mono">{movie?.title}</h1>
                        {/*Movie details*/}
                        <div className="mb-4 text-xl">
                            {movie?.release_date && (
                                <span>
                                    {formatDate(movie.release_date)}{' | '}
                                </span>
                            )}
                            {movie?.genres && (
                                <span>
                                    {movie.genres.map(genre => genre.name).join(', ')}{' | '}
                                </span>
                            )}
                            {movie?.runtime && (
                                <span>
                                    {formatRuntime(movie.runtime)}{' | '}
                                </span>
                            )}
                            {/*Movie rating*/}
                            <div className="flex items-center gap-3 mb-6 mt-4">
                                <span className="text-red-500 text-xl font-medium">Điểm người dùng</span>
                                <div className="relative w-16 h-16">
                                    <svg className="w-16 h-16 transform -rotate-0" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#374151"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#10B981"
                                            strokeWidth="2"
                                            strokeDasharray={`${(movie?.vote_average || 0) * 10}, 100`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold">
                                            {Math.round((movie?.vote_average || 0) * 10)}%
                                        </span>
                                    </div>
                                </div>
                                <span>/ {movie?.vote_count} đánh giá</span>
                            </div>
                            {/* Tagline*/}
                            <p className="italic text-xl mb-4">{movie?.tagline}</p>
                            {/*Overview*/}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-6">Tổng quan</h2>
                                <p className="text-lg">{movie?.overview}</p>
                            </div>
                            {/*Buttons*/}
                            <div className="flex gap-4">
                                <button onClick={handleWatchTrailer} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-3 cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    Xem giới thiệu
                                </button>
                                <button onClick={handleShowReviews} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-3 cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Xem bình luận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Trailer Popup */}
            {showTrailer && trailer && (
                <VideoPopUp
                    videoKey={trailer.key}
                    onClose={() => setShowTrailer(false)}
                />
            )}

            {/* Reviews Popup */}
            {showReviews && (
                <Reviews
                    movieId={movie?.id}
                    onClose={() => setShowReviews(false)}
                />
            )}
            {/* More like this */}
            <div className="mt-10 ml-10 mb-10">
                <h1 className="text-3xl font-bold mb-10">Phim tương tự</h1>
                <MovieListScroll movieList={similarMovies} />
            </div>
            {/* Cast */}
            <div className="mt-10 ml-10 mb-10">
                <h1 className="text-3xl font-bold mb-10">Diễn viên</h1>
                <CastList castList={castList} />
            </div>
        </div>
    )
}

export default MovieDetail;