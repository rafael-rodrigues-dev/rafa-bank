"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// Rota para obter o dashboard (saldo total e transações recentes)
router.get('/dashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transaction.findMany();
        // Calcular o saldo total
        const balance = transactions.reduce((acc, curr) => {
            return curr.type === 'income'
                ? acc + Number(curr.amount)
                : acc - Number(curr.amount);
        }, 0);
        // Obter as transações mais recentes
        const recentTransactions = yield prisma.transaction.findMany({
            take: 5,
            orderBy: {
                created_at: 'desc'
            }
        });
        res.json({ balance, recentTransactions });
    }
    catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
}));
// Rota para obter todas as transações
router.get('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transaction.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
        res.json(transactions);
    }
    catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({ error: 'Erro ao buscar transações' });
    }
}));
// Rota para adicionar uma nova transação
router.post('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newTransaction = yield prisma.transaction.create({
            data: {
                description,
                amount,
                type,
                category: category || null
            }
        });
        res.status(201).json(newTransaction);
    }
    catch (error) {
        console.error('Erro ao criar transação:', error);
        res.status(500).json({ error: 'Erro ao criar transação' });
    }
}));
exports.default = router;
