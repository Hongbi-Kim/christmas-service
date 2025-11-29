import { Sparkles, Gift, TrendingUp } from 'lucide-react';
import Footer from './Footer';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center space-y-6 sm:space-y-8 max-w-2xl w-full">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-center gap-3 sm:gap-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 animate-pulse" />
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500 animate-bounce" />
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl">
            🎄 직장인을 위한 3종 테스트
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            크리스마스 시즌 한정 테스트
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 px-4">
          {/* <p>회사 생활의 끝판왕,</p> */}
          <p>2025년을 마무리하는 맞이하는 직장인을 위한</p>
          <p>재미있는 운세와 맞춤 선물을 확인해보세요!</p>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-red-500 to-green-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          시작하기 ✨
        </button>
        <Footer />
      </div>
      </div>
    </div>
  );
}
