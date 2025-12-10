const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

// A lógica de login reside no Service
const login = async (email, password) => {
    // 1. Buscar o usuário pelo email
    const user = await userRepository.findByEmail(email);

    // 2. Validar credenciais
    if (!user || !(await user.validatePassword(password))) {
        throw new Error('Credenciais inválidas');
    }

    // 3. Gerar o token de autenticação
    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        'SEGREDO_SUPER_SECRETO_AQUI', // Use uma variável de ambiente real
        { expiresIn: '1d' }
    );

    // 4. Retornar os dados necessários para o Controller
    return { token, role: user.role, name: user.name };
};

module.exports = {
    login,
};