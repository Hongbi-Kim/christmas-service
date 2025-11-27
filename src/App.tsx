import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import ServiceFlow from './components/ServiceFlow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'home' | 'service'>('intro');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleStartService = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentScreen('service');
  };

  const handleBackToHome = () => {
    setSelectedService(null);
    setCurrentScreen('home');
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
    </div>
  );
}
