import { Home, Sparkles, Heart, X, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import AdBanner from './AdBanner';
import { serviceData } from '../data/serviceData';

interface SharedResultScreenProps {
  resultData: {
    serviceId: string;
    nickname: string;
    resultIndex: number;
  };
  onBack: () => void;
  onTryService: (serviceId: string) => void;
}

export default function SharedResultScreen({ resultData, onBack, onTryService }: SharedResultScreenProps) {
  const service = serviceData[resultData.serviceId];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 shadow-xl text-center space-y-4">
          <p className="text-gray-700">결과를 찾을 수 없습니다.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all active:scale-95"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    );
  }

  const result = service.results[resultData.resultIndex];

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 shadow-xl text-center space-y-4">
          <p className="text-gray-700">결과를 찾을 수 없습니다.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all active:scale-95"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          홈으로 돌아가기
        </button> */}

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl space-y-5 sm:space-y-6">
          {/* 헤더 섹션 */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full border border-blue-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm sm:text-base">{resultData.nickname}님의 결과</span>
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

          {/* 나도 해보기 버튼 */}
          <div className="pt-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-5 border border-purple-200/50">
            <p className="text-center text-sm sm:text-base text-gray-700 mb-3">
              나도 {service.title} 해보기
            </p>
            <button
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-4 rounded-lg hover:shadow-lg transition-all active:scale-95 hover:from-blue-600 hover:to-purple-600"
            >
              <span className="text-sm sm:text-base">테스트 시작하기</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* 광고 */}
          <div className="pt-4 sm:pt-6 flex justify-center">
            <AdBanner slot="0987654321" className="w-full max-w-[728px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
