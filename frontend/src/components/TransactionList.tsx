import React from 'react';
import { Transaction } from '../services/api';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-card rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold text-text-secondary mb-4">Transações Recentes</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-text-secondary">
          Nenhuma transação encontrada
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-background"
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-900' : 'bg-red-900'
                }`}>
                  {transaction.type === 'income' ? '↑' : '↓'}
                </div>
                <div className="ml-3">
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-text-secondary">
                    {transaction.category || 'Sem categoria'} • {formatDate(transaction.created_at)}
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                R$ {Number(transaction.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList; 