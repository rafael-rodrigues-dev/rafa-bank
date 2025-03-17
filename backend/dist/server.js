"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
// Configuração das variáveis de ambiente
dotenv_1.default.config();
// Inicialização do Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use('/api', transactionRoutes_1.default);
// Rota de teste
app.get('/', (req, res) => {
    res.send('API do Rafa Bank funcionando!');
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
