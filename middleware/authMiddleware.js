// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// ⚠️ IMPORTANTE: Use a mesma chave secreta que está em services/authService.js
const SECRET_KEY = 'SEGREDO_SUPER_SECRETO_AQUI'; 

/**
 * Middleware de autorização.
 * * @param {string[]} roles - Array de roles permitidas (ex: ['admin', 'user']).
 * Se vazio (authorize()), qualquer usuário autenticado é permitido.
 */
module.exports = (roles = []) => {
    // Se roles for uma string, converte para array para consistência
    if (typeof roles === 'string') {
        roles = [roles];
    }
    
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        // 1. Verificar se o token foi fornecido
        if (!authHeader) {
            return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
        }

        // O token geralmente vem no formato 'Bearer <token>'
        const parts = authHeader.split(' ');
        
        if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
            return res.status(401).json({ error: 'Token mal formatado.' });
        }

        const token = parts[1];

        try {
            // 2. Descriptografar e verificar a validade do token
            const decoded = jwt.verify(token, SECRET_KEY);
            
            // 3. Injetar dados do usuário na requisição
            // O payload do JWT é { id: user.id, role: user.role }
            req.userId = decoded.id;
            req.userRole = decoded.role; // <<< AQUI está a role do usuário logado

            // 4. Lógica de Autorização (Verificar se a role é permitida)
            // Se 'roles' estiver vazio, significa que a rota só exige autenticação
            if (roles.length > 0) {
                // Se o array de roles for ['admin'] e o usuário for 'user', o includes falha.
                if (!roles.includes(req.userRole)) {
                    return res.status(403).json({ error: 'Acesso negado. Você não tem a permissão necessária.' });
                }
            }

            // Se tudo estiver OK (autenticado e autorizado), prossegue para o Controller
            return next();

        } catch (err) {
            // Token expirado, inválido ou adulterado
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }
    };
};
