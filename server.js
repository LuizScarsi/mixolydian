import { User } from "./model/User"
const express = require("express");
const { users , cursos, alunos_curso } = require("./database");

const app = express();
app.use(express.json());

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

app.post("/user", (req, res) => {
	const name = req.body.name;
	const password = req.body.password;

	const user = new User(name, password);
	users.push(user);

	res.status(200).send(users);
});

app.get("/alunos", (req, res) => {
	res.status(200).send(alunos);
});

app.get("/aluno/:idAluno", (req, res) => {
	const idAluno = parseInt(req.params.idAluno);

	const aluno = alunos.find((aluno) => aluno.id === idAluno);
	if (aluno) {
		res.status(200).send(aluno);
	}
	res.status(404).send("Aluno não encontrado");
});

app.put("/aluno/:idAluno", (req, res) => {
	const idAluno = parseInt(req.params.idAluno);
	const novoNome = req.body.nome;
	const novaIdade = req.body.idade;

	const aluno = alunos.find((aluno) => aluno.id === idAluno);
	if (aluno) {
		aluno.nome = novoNome;
		aluno.idade = novaIdade;
		res.status(200).send(`O aluno ${aluno.nome} foi atualizado com sucesso!`);
	} else {
		res.status(404).send("Aluno não encontrado");
	}
});

app.delete("/aluno/:idAluno", (req, res) => {
	const idAluno = parseInt(req.params.idAluno);

	const aluno = alunos.find((aluno) => aluno.id === idAluno);
	if (aluno) {
		let nome = aluno.nome;
		index = alunos.indexOf(aluno);
		alunos.splice(index, 1);
		res.status(200).send(`O aluno ${nome} foi REMOVIDO com sucesso!`);
	} else {
		res.status(404).send(`Aluno não encontrado.`);
	}
});

app.post("/curso", (req, res) => {
	const id = req.body.id;
	const nome = req.body.nome;

	const curso = cursos.find((curso) => curso.id === id);
	if (curso) {
		res.status(400).send(`Já existe um curso com o ID: ${id}`)
	} else {
		const novoCurso = { id: id, nome: nome };
		cursos.push(novoCurso);
		res.status(200).send(cursos);
	}
});

app.get("/cursos", (req, res) => {
	res.status(200).send(cursos);
});

app.get("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		res.status(200).send(curso);
	}
	res.status(404).send("Curso não encontrado");
});

app.put("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);
	const novoNome = req.body.nome;

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		curso.nome = novoNome;
		res.status(200).send(`O aluno ${aluno.nome} foi atualizado com sucesso!`);
	} else {
		res.status(404).send("Aluno não encontrado");
	}
});

app.delete("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		let nome = curso.nome;
		index = cursos.indexOf(curso);
		cursos.splice(index, 1);
		res.status(200).send(`O curso ${nome} foi REMOVIDO com sucesso!`);
	} else {
		res.status(404).send(`Curso não encontrado.`);
	}
});

app.post("/matricula", (req, res) => {
	const idAluno = req.body.idAluno;
	const idCurso = req.body.idCurso;

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		const aluno = alunos.find((aluno) => aluno.id === idAluno);
		if (aluno) {
			const matriculaExistente = alunos_curso.find((matricula) => matricula.idAluno === idAluno);
			if (matriculaExistente) {
				res.status(400).send("Aluno já está matriculado");
			} else {
				const matricula = {idCurso: idCurso, idAluno: idAluno};
				alunos_curso.push(matricula);
				res.status(200).send(`Aluno matriculado com sucesso meu chapa`)	;
			}
		}
	}
});

app.get("/matriculas", (req, res) => {
	res.status(200).send(alunos_curso);
});

app.get("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		res.status(200).send(curso);
	}
	res.status(404).send("Curso não encontrado");
});

app.put("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);
	const novoNome = req.body.nome;

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		curso.nome = novoNome;
		res.status(200).send(`O aluno ${aluno.nome} foi atualizado com sucesso!`);
	} else {
		res.status(404).send("Aluno não encontrado");
	}
});

app.delete("/curso/:idCurso", (req, res) => {
	const idCurso = parseInt(req.params.idCurso);

	const curso = cursos.find((curso) => curso.id === idCurso);
	if (curso) {
		let nome = curso.nome;
		index = cursos.indexOf(curso);
		cursos.splice(index, 1);
		res.status(200).send(`O curso ${nome} foi REMOVIDO com sucesso!`);
	} else {
		res.status(404).send(`Curso não encontrado.`);
	}
});








