import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import MoviePopUp from "../components/MoviePopUp";

interface Cast {
    id: number;
    name: string;
    birthday: string;
    gender: number;
    biography: string;
    profile_path: string;
    popularity: number;
    place_of_birth: string;
    known_for_department: string;
    deathday: string;
    homepage: string;
}

interface Movie {
    id: number;
    title: string;
    character: string;
    release_date: string;
    original_title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_count: number;
    vote_average?: number;
    popularity?: number;
}

const CastDetail = () => {
    const { id } = useParams();
    const [cast, setCast] = useState<Cast | null>(null);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [moviePopUp, setMoviePopUp] = useState<Movie | null>(null);
    const [isMoviePopUpOpen, setIsMoviePopUpOpen] = useState(false);

    const handleMovieClick = (movie: Movie) => {
        setMoviePopUp(movie);
        setIsMoviePopUpOpen(true);
    };

    useEffect(() => {
        const fetchCast = async () => {
            const response = await api.get(`/person/${id}`);
            setCast(response.data);
        };
        fetchCast();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchMovieList = async () => {
            const response = await api.get(`/person/${id}/movie_credits`, {
                params: {
                    language: 'vi-VN',
                }
            });
            setMovieList(response.data.cast);
        };
        fetchMovieList();
    }, [id]);

    return (
        <div>
            <div className="flex flex-start max-w-6xl mx-auto mt-10 mb-10 gap-10">
                <div className="w-1/3">
                    <img src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`} alt={cast?.name} className="w-80 h-120 rounded-lg object-cover mb-10" />
                    <div className="flex flex-col gap-5 text-lg">
                        <p><strong className="text-red-400">Ngày sinh</strong><br/>{cast?.birthday}</p>
                        <p><strong className="text-red-400">Giới tính</strong><br/>{cast?.gender === 1 ? "Nữ" : "Nam"}</p>
                        <p><strong className="text-red-400">Quê quán</strong><br/>{cast?.place_of_birth}</p>
                        <p><strong className="text-red-400">Ngành nghề nổi bật</strong><br/>{cast?.known_for_department}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-2/3">
                    <h2 className="text-3xl font-bold text-red-400">{cast?.name}</h2>
                    <p className="text-lg"><strong className="text-red-400">Tiểu sử</strong><br/>{cast?.biography}</p>
                    <div className="flex flex-col gap-5">
                        <p className="text-lg"><strong className="text-red-400">Các bộ phim tham gia</strong></p>
                        <div className="flex flex-col border-2 border-gray-300 rounded-lg p-5 gap-5 shadow-2xl">
                            {movieList.map((movie, index) => (
                                <div key={movie.id} className={`${index !== movieList.length - 1 ? 'border-b border-gray-300 pb-5' : ''}`}>
                                    <button onClick={() => handleMovieClick(movie)} className="text-xl font-bold hover:underline cursor-pointer">{movie.title}</button>
                                    <p className="text-lg">Vai diễn: <span className="text-red-400">{movie.character}</span></p>
                                    <p className="text-lg">Ngày phát hành: <span className="italic">{movie.release_date}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <MoviePopUp movie={moviePopUp} isOpen={isMoviePopUpOpen} onClose={() => setIsMoviePopUpOpen(false)} />
        </div>
    )
}

export default CastDetail;