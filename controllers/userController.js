const express = require("express");
const userService = require("../services/userService");

const userRouter = express.Router();

// POST /user - Criar novo user
userRouter.post("/", userService.createUser);

// GET /users - Retornar todos os users
userRouter.get("/all", userService.returnAllUsers);

// GET /user/:id - Retornar user por ID
userRouter.get("/:id", userService.returnUserById);

// PUT /user/:id - Atualizar user
userRouter.put("/:id", userService.updateUser);

// DELETE /user/:id - Deletar user
userRouter.delete("/:id", userService.deleteUser);

module.exports = userRouter;
