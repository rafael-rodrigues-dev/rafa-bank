import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { fetchDashboard, DashboardData } from '../services/api';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    balance: 0,
    recentTransactions: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300">
            {error}
            <button 
              onClick={loadDashboardData}
              className="ml-4 underline"
            >
              Tentar novamente
            </button>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-accent">Carregando...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BalanceCard balance={dashboardData.balance} />
              <TransactionList transactions={dashboardData.recentTransactions} />
            </div>
            
            <div className="mt-8">
              <TransactionForm onTransactionAdded={loadDashboardData} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 