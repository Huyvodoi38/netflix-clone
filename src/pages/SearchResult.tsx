import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import MovieListPagination from "../components/MovieListPagination";
import Pagination from "../components/Pagination";

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

const SearchResult = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await api.get(`/search/movie?query=${query}`, {
                params: {
                    language: 'vi-VN',
                },
            });
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        }
        fetchMovies();
    }, [query]);

    return (
        <div>
            <div className="ml-10 mt-10 mb-10 px-8">
                <h1 className="text-3xl font-bold mb-10">Kết quả tìm kiếm: {query}</h1>
            </div>
            <div className="ml-10 mt-10 mb-10 px-8">
                <MovieListPagination movieList={movies} />
            </div>
            <div className="items-center ml-10 mt-10 mb-10 px-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default SearchResult;