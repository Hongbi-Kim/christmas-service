// src/components/DevAllResults.tsx
import ResultScreen from './ResultScreen';
import { serviceData } from '../data/serviceData';

const SERVICE_IDS: Array<'fortune' | 'gift' | 'overtime'> = [
  'fortune',
  'gift',
  'overtime',
];

export default function DevAllResults() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 lg:p-10 space-y-8">
      {SERVICE_IDS.map((serviceId) => {
        const service = serviceData[serviceId];
        return (
          <div key={serviceId} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {service.title} — 모든 결과 보기
            </h2>

            {service.results.map((result: any, index: number) => (
              <div
                key={`${serviceId}-${index}`}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
              >
                {/* 위에 결과 인덱스/이름 표시용 헤더 */}
                <div className="px-4 py-2 text-sm sm:text-base bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <span className="font-medium">
                    #{index + 1} {result.title}
                  </span>
                  <span className="text-xs text-gray-500">{serviceId}</span>
                </div>

                {/* 실제 ResultScreen 내용 */}
                <ResultScreen
                  serviceId={serviceId}
                  service={service}
                  result={result}
                  nickname="테스트유저"
                  onBack={() => {}}
                  onRestart={() => {}}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
