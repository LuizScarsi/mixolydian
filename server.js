const express = require("express");
const userRouter = require("./controllers/user-controller");
const playlistRouter = require("./controllers/playlist-controller");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}.`));

// Usar o router de alunos
app.use("/user", userRouter);
app.use("/playlist", playlistRouter);
