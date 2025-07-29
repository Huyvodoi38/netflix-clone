import { useEffect, useState } from "react";
import Logo from "./Logo";

const Header = () => {
  const [dark, setDark] = useState(true); 

  useEffect(() => { 
    if (dark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }  
  }, [dark]);

  return (
    <div className="flex justify-between items-center px-8 py-4">
        <Logo className="w-40 h-20 ml-10" />
        <nav className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-300 text-xl font-semibold pr-10">
            Thanh toán
            </a>
            <a href="#" className="hover:text-gray-300 text-xl font-semibold pr-10">
            Đăng nhập
            </a>
            {/* Nút chuyển dark/light mode */}
            <button
            onClick={() => setDark(!dark)}
            className="text-2xl focus:outline-none"
            title="Chuyển chế độ sáng/tối"
            >
            {dark ? (
                // Icon mặt trời (chế độ sáng)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
            ) : (
                // Icon mặt trăng (chế độ tối)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
            )}
            </button>
        </nav>
    </div>
  );
}; 

export default Header;