import { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import ServiceFlow from './components/ServiceFlow';
import SharedResultScreen from './components/SharedResultScreen';

type Screen = 'intro' | 'home' | 'service' | 'shared';

interface SharedResultData {
  serviceId: string;
  nickname: string;
  resultIndex: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [sharedResultData, setSharedResultData] = useState<SharedResultData | null>(null);

  // URL에서 공유된 결과 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultParam = urlParams.get('result');

    if (resultParam) {
      try {
        // ResultScreen에서 encodeURIComponent(JSON.stringify(...)) 로 인코딩했다고 가정
        const decoded = JSON.parse(decodeURIComponent(resultParam));
        // 최소 필드 검증
        if (
          decoded &&
          typeof decoded.serviceId === 'string' &&
          typeof decoded.nickname === 'string' &&
          typeof decoded.resultIndex === 'number'
        ) {
          setSharedResultData(decoded);
          setCurrentScreen('shared');
          return;
        } else {
          console.error('결과 데이터 형식이 올바르지 않습니다.', decoded);
        }
      } catch (error) {
        console.error('잘못된 결과 링크입니다.', error);
      }

      // 디코딩에 실패했거나 형식이 잘못된 경우: 쿼리스트링 제거 + 홈으로
      window.history.replaceState({}, '', window.location.pathname);
      setSharedResultData(null);
      setCurrentScreen('home');
    } else {
      // result 파라미터가 없으면 인트로 → 홈 순서로
      setCurrentScreen('intro');
    }
  }, []);

  const handleStartService = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentScreen('service');
    // 혹시 공유 링크로 들어왔다가 테스트 다시 하는 경우, 쿼리스트링 제거
    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleBackToHome = () => {
    setSelectedService(null);
    setSharedResultData(null);
    setCurrentScreen('home');
    // URL 파라미터 제거
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-blue-50">
      {currentScreen === 'intro' && (
        <IntroScreen onStart={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen onSelectService={handleStartService} />
      )}

      {currentScreen === 'service' && selectedService && (
        <ServiceFlow serviceId={selectedService} onBack={handleBackToHome} />
      )}

      {currentScreen === 'shared' && sharedResultData && (
        <SharedResultScreen
          resultData={sharedResultData}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}
