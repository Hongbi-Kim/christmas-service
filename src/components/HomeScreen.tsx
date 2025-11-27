import { Sparkles, Gift, Calculator } from 'lucide-react';

interface HomeScreenProps {
  onSelectService: (serviceId: string) => void;
}

const services = [
  {
    id: 'fortune',
    title: '회사식 크리스마스 운세',
    description: '올해 연말, 당신의 회사 생활은 어떨까요? 상사님의 기분부터 야근 운까지 모두 알려드립니다.',
    icon: Sparkles,
    color: 'from-yellow-400 to-orange-500',
    emoji: '🎄'
  },
  {
    id: 'gift',
    title: '산타 대신 받을 직장인 선물',
    description: '올해 당신이 받을 선물은? 상여금부터 조기퇴근권까지, 직장인 맞춤 선물을 확인하세요.',
    icon: Gift,
    color: 'from-red-400 to-pink-500',
    emoji: '🎁'
  },
  {
    id: 'overtime',
    title: '내 연말 잔업률 계산기',
    description: '연말에는 과연 몇 번이나 야근을 하게 될까요? 과학적(?)인 분석으로 예측해드립니다.',
    icon: Calculator,
    color: 'from-blue-400 to-purple-500',
    emoji: '📊'
  }
];

export default function HomeScreen({ onSelectService }: HomeScreenProps) {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
        <div className="text-center space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">직장인 연말 뽑기 🎄</h1>
          <p className="text-sm sm:text-base text-gray-600">원하는 서비스를 선택해주세요</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 text-left space-y-3 sm:space-y-4 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl sm:text-3xl group-hover:rotate-12 transition-transform`}>
                  {service.emoji}
                </div>
                
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
      </div>
    </div>
  );
}
