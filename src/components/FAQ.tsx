import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Netflix là gì?",
    answer: "Netflix là dịch vụ phát trực tuyến cung cấp nhiều loại chương trình truyền hình, phim ảnh, anime, tài liệu, và nhiều hơn nữa trên hàng nghìn thiết bị kết nối internet. Xem bao nhiêu tùy thích, bất cứ lúc nào bạn muốn, không có quảng cáo – tất cả chỉ với một mức giá tháng thấp. Luôn có điều gì đó mới để khám phá, và các chương trình TV và phim mới được thêm vào mỗi tuần!"
  },
  {
    question: "Netflix có giá bao nhiêu?",
    answer: "Xem Netflix trên điện thoại, máy tính bảng, Smart TV, laptop hoặc thiết bị phát trực tuyến, chỉ với một khoản phí cố định hàng tháng. Các gói từ 70.000₫ đến 260.000₫ mỗi tháng. Không có phí bổ sung, không có hợp đồng."
  },
  {
    question: "Tôi có thể xem ở đâu?",
    answer: "Xem ở bất cứ đâu, bất cứ lúc nào. Đăng nhập bằng tài khoản Netflix của bạn để xem ngay lập tức trên web tại netflix.com từ máy tính cá nhân hoặc bất kỳ thiết bị kết nối internet nào có ứng dụng Netflix, bao gồm Smart TV, điện thoại thông minh, máy tính bảng, đầu phát đa phương tiện và máy chơi game."
  },
  {
    question: "Làm thế nào để hủy đăng ký?",
    answer: "Netflix rất linh hoạt. Không có hợp đồng rắc rối, không có cam kết. Bạn có thể dễ dàng hủy tài khoản trực tuyến trong hai cú nhấp chuột. Không có phí hủy – bắt đầu hoặc dừng tài khoản bất cứ lúc nào."
  },
  {
    question: "Tôi có thể xem gì trên Netflix?",
    answer: "Netflix có thư viện phong phú gồm các bộ phim truyện, phim tài liệu, chương trình truyền hình, anime, tác phẩm đoạt giải và nhiều nội dung khác. Xem càng nhiều càng tốt, bất cứ lúc nào bạn muốn."
  },
  {
    question: "Netflix có phù hợp cho trẻ em không?",
    answer: "Hồ sơ thành viên trẻ em đi kèm với tính năng bảo vệ phù hợp cho trẻ em, cho phép phụ huynh kiểm soát việc xem phim và chương trình TV của trẻ. Hồ sơ trẻ em đặc biệt có sẵn miễn phí với thẻ thành viên của bạn."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl p-10 mx-auto">    
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <div key={index} className="relative rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-30"></div>
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center transition-all duration-500 ease-in-out cursor-pointer"
            >
              <span className="text-lg font-medium">{item.question}</span>
              <div className={`transition-transform duration-500 ease-in-out ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4">
                <p className="text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 