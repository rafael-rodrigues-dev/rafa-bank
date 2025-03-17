import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-card p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-accent mb-8">Rafa Bank</h1>
      
      <nav className="flex-1">
        <ul className="space-y-4">
          <li className="flex items-center text-text-primary bg-background rounded-lg p-3">
            <span className="mr-3">📊</span>
            <span>Dashboard</span>
          </li>
          <li className="flex items-center text-text-secondary hover:text-text-primary p-3">
            <span className="mr-3">💰</span>
            <span>Contas</span>
          </li>
          <li className="flex items-center text-text-secondary hover:text-text-primary p-3">
            <span className="mr-3">💳</span>
            <span>Cartões</span>
          </li>
          <li className="flex items-center text-text-secondary hover:text-text-primary p-3">
            <span className="mr-3">🏦</span>
            <span>Poupança</span>
          </li>
          <li className="flex items-center text-text-secondary hover:text-text-primary p-3">
            <span className="mr-3">📝</span>
            <span>Empréstimos</span>
          </li>
          <li className="flex items-center text-text-secondary hover:text-text-primary p-3">
            <span className="mr-3">📈</span>
            <span>Investimentos</span>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center text-text-secondary">
          <span className="mr-3">⚙️</span>
          <span>Configurações</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 