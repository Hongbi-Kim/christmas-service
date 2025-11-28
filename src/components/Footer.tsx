import { Users, TrendingUp } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  // Mock 데이터 - 실제로는 Supabase로 관리해야 합니다
  const stats = {
    todayUsers: 1247,
    totalUsers: 15823,
  };

  return (
    <footer className={`mt-auto pt-8 pb-6 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          {/* 왼쪽: 통계 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {/* <Users className="w-3.5 h-3.5" /> */}
              {/* <span>오늘 {stats.todayUsers.toLocaleString()}명</span> */}
            </div>
            <div className="flex items-center gap-1.5">
              {/* <TrendingUp className="w-3.5 h-3.5" /> */}
              {/* <span>전체 {stats.totalUsers.toLocaleString()}명</span> */}
            </div>
          </div>

          {/* 오른쪽: Powered by Wave X */}
          <a
            href="https://www.instagram.com/thewave.x_?igsh=ejNia3IwanVxaHpw&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-semibold">Wave X</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
