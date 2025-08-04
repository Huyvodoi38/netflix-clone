import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieCollection from "../pages/MovieCollection";
import MovieByGenre from "../pages/MovieByGenre";
import CastDetail from "../pages/CastDetail";
import SearchResult from "../pages/SearchResult";

export default function AppRoute() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail/>} /> 
        <Route path="/movie-collection" element={<MovieCollection/>} />
        <Route path="/movie-collection/:genreId" element={<MovieByGenre/>} />
        <Route path="/cast/:id" element={<CastDetail/>} />
        <Route path="/search/:query" element={<SearchResult/>} />
    </Routes>
  );
}