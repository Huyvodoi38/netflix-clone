import { useParams } from "react-router-dom";
import GenreList from "../components/GenreList";
import { useEffect, useState } from "react";
import api from "../api/api";
import MovieListPagination from "../components/MovieListPagination";
import Pagination from "../components/Pagination";

interface Genre {
    id: number;
    name: string;
}

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

const MovieByGenre = () => {
    const { genreId } = useParams();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        const fetchGenres = async () => {
            const response = await api.get('/genre/movie/list', {
                params: {
                    language: 'vi-VN',
                }
            });
            setGenres(response.data.genres);
        }
        fetchGenres();
    }, []);
    useEffect(() => {
        const fetchMovieList = async () => {
            const response = await api.get(`/discover/movie`, {
                params: {
                    with_genres: genreId,
                    language: 'vi-VN',
                    page: currentPage,
                }
            });
            setMovieList(response.data.results);
            setTotalPages(response.data.total_pages);
        }
        window.scrollTo(0, 0);
        fetchMovieList();
    }, [genreId, currentPage]);

    return (
        <div>
            {/*Tag phim*/}
            <div className="max-w-6xl mx-auto mt-10 mb-10">
                <GenreList id={Number(genreId)} genres={genres} />
            </div>
            {/*Danh sách phim*/}
            <div className="ml-10 mt-10 mb-10 px-8">
                <h2 className="text-3xl font-bold mb-10">{genres.find(genre => genre.id === Number(genreId))?.name}</h2>
            </div>
            <div className="items-center ml-10 mt-10 mb-10 px-8">
                <MovieListPagination movieList={movieList} />
            </div>
            {/*Phân trang*/}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default MovieByGenre;    