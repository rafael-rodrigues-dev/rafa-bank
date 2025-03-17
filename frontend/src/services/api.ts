import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  created_at: string;
}

export interface DashboardData {
  balance: number;
  recentTransactions: Transaction[];
}

export const fetchDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardData>('/dashboard');
  return response.data;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/transactions');
  return response.data;
};

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> => {
  const response = await api.post<Transaction>('/transactions', transaction);
  return response.data;
};

export default api; 