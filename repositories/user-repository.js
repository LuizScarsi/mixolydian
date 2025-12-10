const model = require("../models");

// Função para obter todos os users
const getAllUsers = async () => {
	return await model.User.findAll();
};

// Função para obter user por ID
const getUserById = async (user) => {
	return await model.User.findByPk(user.id);
};

// Função para criar um novo user
const createUser = async (user) => {
	await model.User.create(user);
	return user;
};

// Função para atualizar um user
const updateUser = async (user) => {
	try {
		// Atualizar o user
		await model.User.update(user, { where: { id: user.id } });

		// Retornar o user atualizado
		return await model.User.findByPk(user.id);
	} catch (error) {
		throw error;
	}
};

// Função para deletar um user
const deleteUser = async (user) => {
	try {
		// Deletar o user
		await model.User.destroy({ where: { id: user.id } });
		return user;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
