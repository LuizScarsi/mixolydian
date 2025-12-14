const userRepository = require("../repositories/userRepository");

// Função para retornar todos os users
const returnAllUsers = async (req, res) => {
	try {
		const users = await userRepository.getAllUsers();
		res.status(200).json({ users: users });
	} catch (error) {
		console.log("Erro ao buscar users:", error);
		res.sendStatus(500);
	}
};

// Função para criar um novo user
const createUser = async (req, res) => {
	const { id, name, email, password, role } = req.body;
	console.log({ id, name, email, password, role });
	try {
		if (!id || !name || !email || !password) {
			return res
				.status(400)
				.json({ message: "ID, nome, email e senha são obrigatórios." });
		}

		const user = await userRepository.createUser({
			id,
			name,
			email,
			password_hash: password,
			role,
		});
		res.status(201).json(user);
	} catch (error) {
		console.log("Erro ao criar user:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar um user
const updateUser = async (req, res) => {
	const { name, email, password_hash, role } = req.body;
	const id = parseInt(req.params.id);
	try {
		const updatedUser = await userRepository.updateUser({
			id,
			name,
			email,
			password_hash,
			role,
		});

		if (updatedUser) {
			res.status(200).json(updatedUser);
		} else {
			res.status(404).json({ message: "user não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar user:", error);
		res.sendStatus(500);
	}
};

// Função para deletar um user
const deleteUser = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const loggedUserId = req.userId;
		if (Number(id) === Number(loggedUserId)) {
			return res.status(403).json({
			message: "Você não pode excluir seu próprio usuário.",
			});
		}

		const removedUser = await userRepository.deleteUser(id);

		if (removedUser) {
			res.status(200).json({
				message: "user removido com sucesso.",
				user: removedUser,
			});
		} else {
			res.status(404).json({ message: "user não encontrado" });
		}
	} catch (error) {
		console.error("Erro ao deletar user:", error);
		res.status(500).json({ message: "Erro ao deletar user" });
	}
};

// Função para buscar user por ID
const returnUserById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const user = await userRepository.getUserById({
			id,
		});

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ message: "user não encontrado." });
		}
	} catch (error) {
		console.log("Erro ao buscar user:", error);
		res.sendStatus(500);
	}
};

module.exports = {
	returnAllUsers,
	createUser,
	updateUser,
	deleteUser,
	returnUserById,
};
