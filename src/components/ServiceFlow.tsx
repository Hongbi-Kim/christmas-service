// ServiceFlow.tsx
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ResultScreen from './ResultScreen';
import {
  serviceData,
  calcFortuneResultIndex,
  calcGiftResultIndex,
  calcOvertimeResultIndex,
} from '../data/serviceData';

interface ServiceFlowProps {
  serviceId: string;
  onBack: () => void;
}

export default function ServiceFlow({ serviceId, onBack }: ServiceFlowProps) {
  const [step, setStep] = useState<'nickname' | 'questions' | 'result'>('nickname');
  const [nickname, setNickname] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const service = serviceData[serviceId];

  if (!service) {
    return <div>서비스를 찾을 수 없습니다.</div>;
  }

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      setStep('questions');
    }
  };

  const handleAnswer = (answerId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answerId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < service.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStep('nickname');
    }
  };

  const canProceed = answers[currentQuestionIndex] !== undefined;

  // 결과 화면
  if (step === 'result') {
    const answerArray = service.questions.map((_: any, idx: number) => answers[idx] ?? '0');
  
    let resultIndex = 0;
  
    if (serviceId === 'fortune') {
      resultIndex = calcFortuneResultIndex(answerArray);
    } else if (serviceId === 'gift') {
      resultIndex = calcGiftResultIndex(answerArray);
    } else if (serviceId === 'overtime') {
      resultIndex = calcOvertimeResultIndex(answerArray);
    }
  
    return (
      <ResultScreen
        service={service}
        result={service.results[resultIndex]}
        nickname={nickname}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 md:mb-8 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          홈으로 돌아가기
        </button>

        {/* 닉네임 입력 */}
        {step === 'nickname' && (
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 sm:space-y-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-4xl sm:text-5xl">{service.emoji}</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl px-2">{service.title}</h2>
              <p className="text-sm sm:text-base text-gray-600 px-2">{service.description}</p>
            </div>

            <form onSubmit={handleNicknameSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="nickname" className="block text-sm sm:text-base text-gray-700">
                  닉네임을 입력해주세요
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="예: 야근싫어"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={20}
                />
              </div>

              <button
                type="submit"
                disabled={!nickname.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 sm:py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all active:scale-95"
              >
                시작하기
              </button>
            </form>
          </div>
        )}

        {/* 질문 카드 */}
        {step === 'questions' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 px-1">
              <span>{nickname}님</span>
              <span>
                {currentQuestionIndex + 1} / {service.questions.length}
              </span>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl space-y-5 sm:space-y-6">
              <h3 className="text-lg sm:text-xl md:text-2xl text-center leading-relaxed px-2">
                {service.questions[currentQuestionIndex].question}
              </h3>

              <div className="space-y-2.5 sm:space-y-3">
                {service.questions[currentQuestionIndex].options.map((option: any) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left text-sm sm:text-base active:scale-95 ${
                      answers[currentQuestionIndex] === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                이전
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all active:scale-95"
              >
                {currentQuestionIndex < service.questions.length - 1 ? '다음' : '결과 보기'}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
