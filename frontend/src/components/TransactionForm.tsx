import React, { useState } from 'react';
import { createTransaction } from '../services/api';

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount) {
      setError('Descrição e valor são obrigatórios');
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Valor deve ser um número positivo');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await createTransaction({
        description,
        amount: amountValue,
        type,
        category: category || undefined
      });
      
      // Limpar formulário
      setDescription('');
      setAmount('');
      setCategory('');
      
      // Notificar componente pai
      onTransactionAdded();
    } catch (err) {
      setError('Erro ao adicionar transação. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-xl font-semibold text-text-secondary mb-4">Nova Transação</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-secondary mb-2">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-gray-700 text-text-primary focus:border-accent focus:outline-none"
            placeholder="Ex: Salário, Aluguel, etc."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-text-secondary mb-2">Valor</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0.01"
            className="w-full p-3 rounded-lg bg-background border border-gray-700 text-text-primary focus:border-accent focus:outline-none"
            placeholder="0,00"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-text-secondary mb-2">Tipo</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'income'}
                onChange={() => setType('income')}
                className="mr-2"
              />
              <span className="text-green-500">Entrada</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
                className="mr-2"
              />
              <span className="text-red-500">Saída</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-text-secondary mb-2">Categoria (opcional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-gray-700 text-text-primary focus:border-accent focus:outline-none"
            placeholder="Ex: Alimentação, Transporte, etc."
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-accent hover:bg-accent/80 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Adicionando...' : 'Adicionar Transação'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm; 