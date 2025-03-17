import React from 'react';

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="bg-card rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold text-text-secondary mb-4">Saldo Total</h2>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Círculo externo */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
          
          {/* Círculo interno com gradiente */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent to-purple-900 flex items-center justify-center">
            <div className="text-center">
              <span className="text-sm text-text-secondary">Saldo</span>
              <div className="text-3xl font-bold">
                R$ {balance.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="text-center">
          <div className="text-sm text-text-secondary">Entradas</div>
          <div className="text-lg font-semibold text-green-500">↑</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-text-secondary">Saídas</div>
          <div className="text-lg font-semibold text-red-500">↓</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard; 