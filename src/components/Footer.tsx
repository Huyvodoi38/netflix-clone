const Footer = () => {
  return (
    <footer className="mt-10 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Contact Section */}
        <div className="mb-8">
          <a href="#" className="mb-4 underline text-sm hover:opacity-50">Có câu hỏi? Liên hệ với chúng tôi.</a>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div className="space-y-3">
            <a href="#" className="block underline text-sm hover:opacity-50">
              Câu hỏi thường gặp
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Quan hệ đầu tư
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Chính sách bảo mật
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Kiểm tra tốc độ
            </a>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <a href="#" className="block underline text-sm hover:opacity-50">
              Trung tâm trợ giúp
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Công việc
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Tùy chọn cookie
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Thông báo pháp lý
            </a>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <a href="#" className="block underline text-sm hover:opacity-50">
              Tài khoản
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Các phương thức xem
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Thông tin công ty
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Chỉ có trên Netflix
            </a>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <a href="#" className="block underline text-sm hover:opacity-50">
              Trung tâm truyền thông
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Điều khoản sử dụng
            </a>
            <a href="#" className="block underline text-sm hover:opacity-50">
              Liên hệ với chúng tôi
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t">
          <p className="text-sm">Netflix Việt Nam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
