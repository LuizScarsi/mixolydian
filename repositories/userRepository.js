const model = require("../models");

// Nova função para obter usuário por email, essencial para o login
const findByEmail = async (email) => {
    return await model.User.findOne({ where: { email } });
};

// Função para obter todos os users
const getAllUsers = async () => {
    // Para listar todos, pode ser útil excluir o password_hash por segurança
    return await model.User.findAll({ 
        attributes: { exclude: ['password_hash'] } 
    });
};

// Função para obter user por ID
const getUserById = async (id) => { // Ajustado para receber apenas o ID, não o objeto
    // Para obter por ID, pode ser útil excluir o password_hash por segurança
    return await model.User.findByPk(id, { 
        attributes: { exclude: ['password_hash'] } 
    });
};

// Função para criar um novo user (Otimizado para usar a role padrão 'user' se não for passada)
const createUser = async (userData) => {
    // Note: O hook no User.js cuida da criptografia da senha
    await model.User.create(userData);
    return userData;
};

// Função para atualizar um user
const updateUser = async (id, userData) => { // Ajustado para receber ID e os dados separados
    try {
        // O hook 'beforeSave' no Model User.js garantirá que a nova senha
        // (se incluída em userData) será automaticamente hasheada.

        await model.User.update(userData, { where: { id: id } });

        // Retornar o user atualizado (sem o hash)
        return await model.User.findByPk(id, {
            attributes: { exclude: ['password_hash'] }
        });
    } catch (error) {
        throw error;
    }
};

// Função para deletar um user
const deleteUser = async (id) => { // Ajustado para receber apenas o ID
    try {
        console.log("id: " + id)
        const userToDelete = await model.User.findByPk(id);
        if (!userToDelete) {
            throw new Error('Usuário não encontrado');
        }

        await model.User.destroy({ where: { id: id } });
        // Retornar o user deletado (pode ser útil para logs)
        return userToDelete; 
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findByEmail, // Exportado para uso no authService
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
