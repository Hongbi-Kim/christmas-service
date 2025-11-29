import { Sparkles, Gift, Calculator } from 'lucide-react';
import AdBanner from './AdBanner';
import Footer from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
interface HomeScreenProps {
  onSelectService: (serviceId: string) => void;
}

const services = [
  {
    id: 'fortune',
    title: '직장인 연말 운세',
    image: '/images/test1/poster.png',
    description: '올해 연말, 나는 칼퇴 요정인가 야근 좀비인가? 회사에서 맞이할 엔딩을 확인하세요.',
    icon: Sparkles,
    color: 'from-yellow-400 to-orange-500',
    emoji: '🎄'
  },
  {
    id: 'gift',
    title: '산타가 주는 직장인 특별 선물',
    image: '/images/test2/poster.png',
    description: '올해 당신이 받을 선물은? 직장인 맞춤 선물을 확인하세요.',
    icon: Gift,
    color: 'from-red-400 to-pink-500',
    emoji: '🎁'
  },
  {
    id: 'overtime',
    title: '내 연말 잔업률 계산기',
    image: '/images/test3/poster.png',
    description: '연말에는 야근 없는 일상을 보낼 수 있을까요? 과학적(?)인 분석으로 예측해드립니다.',
    icon: Calculator,
    color: 'from-blue-400 to-purple-500',
    emoji: '📊'
  }
];

export default function HomeScreen({ onSelectService }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">직장인을 위한 3종 테스트 🎄</h1>
          <p className="text-sm sm:text-base text-gray-600"> 원하는 테스트를 선택해주세요.</p>
          <p className="text-sm sm:text-base text-gray-600"> 테스트 별로 그림체가 달라요. 3가지 테스트 모두 즐겨봐요!</p>
          {/* <p className="text-sm sm:text-base text-gray-600"> 3가지 테스트 모두 즐겨봐요!</p> */}

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'start_test', {
                      service: service.id, // 'fortune' | 'gift' | 'overtime'
                    });
                  }
                  onSelectService(service.id);
                }}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 text-left space-y-3 sm:space-y-4 group"
              >
                {/* 이미지 */}
                <div className="w-full max-w-sm mx-auto rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-md aspect-square">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 transition-transform`}>
                  {service.emoji}
                </div> */}
                
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="text-xs sm:text-sm text-gray-400">
                  시작하기 →
                </div>
              </button>
            );
          })}
        </div>
        <Footer />
        {/* 카드 그리드 밑에 광고 */}
        <div className="mt-8 flex justify-center">
          <AdBanner slot="6167417121" className="w-full max-w-[728px]" />
        </div>
      </div>
      </div>
    </div>
  );
}
