import Banner from "../components/HomeBanner";
import { useEffect, useState } from "react";
import api from "../api/api";
import MovieListScroll from "../components/MovieListScroll";
import FAQ from "../components/FAQ";
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

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrending = async () => {
      const response = await api.get('trending/movie/day', {
        params: {
          language: 'vi-VN',
        },
      });
      setTrending(response.data?.results?.slice(0, 15) || []);
    }
    fetchTrending();
  }, []);
  return (
    <div>

      {/* Banner */}
      <Banner />

      {/* Xu hướng hiện nay */}
      <h1 className="text-3xl font-bold mt-10 ml-10 mb-10 px-8">Xu hướng hiện nay</h1>
      <MovieListScroll movieList={trending} />

      {/* Nhiều lí do để chọn chúng tôi */}
      <h1 className="text-3xl font-bold mt-10 ml-10 mb-10 px-8">Nhiều lí do để chọn chúng tôi</h1>
      <div className="flex flex-wrap items-center justify-center gap-10">
        <div className="relative rounded-lg p-10 w-80 h-64 text-center">
          <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"></div>
          <h3 className="text-xl font-bold mb-4">Thưởng thức trên TV của bạn</h3>
          <p className="text-sm">Xem trên Smart TV, Playstation, Xbox, Chromecast, Apple TV, đầu phát Blu-ray, và nhiều hơn nữa.</p>
          <div className="absolute bottom-1 right-1">
            <svg
              className="w-6 h-6 text-pink-300"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2m0 14H3V5h18z"></path>
            </svg>
          </div>
        </div>
        <div className="relative rounded-lg p-10 w-80 h-64 text-center">
          <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"></div>
          <h3 className="text-xl font-bold mb-4">Tải xuống chương trình để xem ngoại tuyến</h3>
          <p className="text-sm">Lưu lại chương trình yêu thích và luôn có thứ để xem bất cứ lúc nào.</p>
          <div className="absolute bottom-1 right-1">
            <svg
              className="w-6 h-6 text-pink-300"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 10V8h-2v4H8l4 4 4-4z"></path>
            </svg>
          </div>
        </div>
        <div className="relative rounded-lg p-10 w-80 h-64 text-center">
          <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"></div>
          <h3 className="text-xl font-bold mb-4">Xem mọi nơi</h3>
          <p className="text-sm">Truyền phát vô hạn phim và chương trình TV trên điện thoại, máy tính bảng, laptop và TV.</p>
          <div className="absolute bottom-1 right-1">
            <svg
              className="w-6 h-6 text-pink-300"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2m0 14H3V5h18z"></path>
            </svg>
          </div>
        </div>
        <div className="relative rounded-lg p-10 w-80 h-64 text-center">
          <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"></div>
          <h3 className="text-xl font-bold mb-4">Tạo hồ sơ cho trẻ em</h3>
          <p className="text-sm">Gửi các bé vào những cuộc phiêu lưu với các nhân vật yêu thích trong không gian được tạo riêng cho chúng — miễn phí với thẻ thành viên của bạn.</p>
          <div className="absolute bottom-1 right-1">
            <svg
              className="w-6 h-6 text-pink-300"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 16.58 12 17.27z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Câu hỏi thường gặp */}
      <h1 className="text-3xl font-bold mt-10 ml-10 mb-10 px-8">Những câu hỏi thường gặp</h1>
      <FAQ />

      {/* Đăng ký */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium mb-4 max-w-xl text-center">Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</p>
          <div className="flex items-center gap-4">
            <input type="email" placeholder="Email" className="w-96 p-2 rounded-md border-2 border-gray-300" />
            <button onClick={() => navigate('#')} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 cursor-pointer">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}