const express = require('express');
const authService = require('../services/authService');

const authRouter = express.Router();

// POST /login - Rota de Login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Chama a função de serviço
        const data = await authService.login(email, password);
        
        return res.json(data);
    } catch (error) {
        // Erro de credenciais ou outro erro de negócio
        return res.status(401).json({ error: error.message });
    }
});

module.exports = authRouter;