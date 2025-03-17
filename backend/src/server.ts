import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes';

// Configuração das variáveis de ambiente
dotenv.config();

// Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', transactionRoutes);

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.send('API do Rafa Bank funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 