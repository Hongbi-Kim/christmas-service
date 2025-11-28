import { Share2, RotateCcw, Home, Heart, X, Sparkles, TrendingUp, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AdBanner from './AdBanner';
import Footer from './Footer';

interface ResultScreenProps {
  serviceId: string;
  service: any;
  result: any;
  nickname: string;
  onBack: () => void;
  onRestart: () => void;
}

export default function ResultScreen({ serviceId, service, result, nickname, onBack, onRestart }: ResultScreenProps) {
  const handleShare = async () => {
    const resultIndex = service.results.findIndex(
      (r: any) => r.title === result.title
    );
  
    const resultData = {
      serviceId,          // 여기!
      nickname,
      resultIndex,
    };
  
    const encodedData = encodeURIComponent(JSON.stringify(resultData));
    const shareUrl = `${window.location.origin}${window.location.pathname}?result=${encodedData}`;
  
    const shareText = `${nickname}님의 ${service.title} 결과: ${result.title}`;
  
    try {
      if (navigator.share) {
        await navigator.share({
          title: service.title,
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        alert('결과 링크가 클립보드에 복사되었습니다!');
      } else {
        // 최악의 경우
        alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.\n주소창의 링크를 직접 복사해 주세요.');
      }
    } catch (e) {
      console.error('공유 실패:', e);
    }
  };
  

  const handleRestart = () => {
    onRestart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 animate-in fade-in duration-500">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <a
          href="https://wavetoai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors"
        >
          <span>Powered by</span>
          <span className="font-semibold">Wave X</span>
        </a>

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl space-y-5 sm:space-y-6">
          {/* 헤더 섹션 */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full border border-blue-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm sm:text-base">{nickname}님의 결과</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800 px-2">{service.title}</h2>
          </div>

          {/* 이미지 */}
          <div className="w-full max-w-sm mx-auto rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-md aspect-square">
            <ImageWithFallback
              src={result.image}
              alt={result.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 결과 타이틀 */}
          <div className="relative">
            <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 opacity-20" />
            </div>
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-yellow-200/50">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-center text-gray-800">
                {result.title}
              </h3>
            </div>
          </div>

          {/* 설명 박스 */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 sm:p-5 border border-gray-200/50">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {result.description}
            </p>
          </div>

          {/* 잘 맞는/안 맞는 타입 카드 (1x2 그리드) */}
          {(result.bestMatch || result.worstMatch) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {result.bestMatch && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 border-2 border-green-200/50 space-y-2">
                  <div className="flex items-center gap-2 text-green-700">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-green-500" />
                    <span className="text-sm sm:text-base">잘 맞는 타입</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {result.bestMatch}
                  </p>
                </div>
              )}
              {result.worstMatch && (
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 sm:p-5 border-2 border-red-200/50 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base">안 맞는 타입</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {result.worstMatch}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 통계 카드 */}
          {result.stats && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {result.stats.map((stat: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-5 text-center border border-indigo-200/50 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl text-indigo-700">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* 공유 버튼 */}
          <div className="flex gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-4 text-sm sm:text-base rounded-lg hover:shadow-lg transition-all active:scale-95 hover:from-green-600 hover:to-emerald-600"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              결과 공유하기
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all active:scale-95 hover:border-gray-400"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* 결과 밑에 광고 */}
          <div className="mt-8 flex justify-center">
          <AdBanner slot="0987654321" className="w-full max-w-[728px]" />
        </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
