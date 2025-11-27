import { Share2, RotateCcw, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResultScreenProps {
  service: any;
  result: any;
  nickname: string;
  onBack: () => void;
}

export default function ResultScreen({ service, result, nickname, onBack }: ResultScreenProps) {
  const handleShare = async () => {
    const shareText = `${nickname}님의 ${service.title} 결과:\n\n${result.title}\n\n${result.description}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: shareText,
        });
      } catch (error) {
        // 사용자가 공유를 취소한 경우
        console.log('공유 취소됨');
      }
    } else {
      // Web Share API를 지원하지 않는 경우
      navigator.clipboard.writeText(shareText);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          홈으로 돌아가기
        </button>

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl space-y-5 sm:space-y-6">
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-50 text-blue-600 rounded-full">
              {nickname}님의 결과
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl px-2">{service.title}</h2>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ImageWithFallback
                src={result.image}
                alt={result.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl text-center px-2">{result.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line px-1">
                {result.description}
              </p>
              {(result.bestMatch || result.worstMatch) && (
                <div className="mt-2 space-y-1 text-xs sm:text-sm text-gray-600 px-1">
                  {result.bestMatch && (
                    <p>
                      <span className="font-semibold">잘 맞는 타입 </span>
                       <p className="whitespace-pre-line">{result.bestMatch}</p>
                    </p>
                  )}
                  {result.worstMatch && (
                    <p>
                      <span className="font-semibold">안 맞는 타입  </span>
                      <p className="whitespace-pre-line">{result.worstMatch}</p>
                    </p>
                  )}
                </div>
              )}
            </div>
            {result.stats && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {result.stats.map((stat: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                    <div className="text-xl sm:text-2xl">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2.5 sm:gap-3">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-4 text-sm sm:text-base rounded-lg hover:shadow-lg transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              결과 공유하기
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
