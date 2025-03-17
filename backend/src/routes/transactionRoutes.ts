import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Rota para obter o dashboard (saldo total e transações recentes)
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    
    // Calcular o saldo total
    const balance = transactions.reduce((acc: number, curr: any) => {
      return curr.type === 'income' 
        ? acc + Number(curr.amount) 
        : acc - Number(curr.amount);
    }, 0);
    
    // Obter as transações mais recentes
    const recentTransactions = await prisma.transaction.findMany({
      take: 5,
      orderBy: {
        created_at: 'desc'
      }
    });
    
    res.json({ balance, recentTransactions });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
});

// Rota para obter todas as transações
router.get('/transactions', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Rota para adicionar uma nova transação
router.post('/transactions', async (req: Request, res: Response) => {
  try {
    const { description, amount, type, category } = req.body;
    
    // Validações básicas
    if (!description || !amount || !type) {
      return res.status(400).json({ 
        error: 'Descrição, valor e tipo são campos obrigatórios' 
      });
    }
    
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ 
        error: 'Tipo deve ser "income" ou "expense"' 
      });
    }
    
    // Criar nova transação
    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        category: category || null
      }
    });
    
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

export default router; 