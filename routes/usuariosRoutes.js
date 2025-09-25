const express = require("express");
const router = express.Router();

const { autenticarToken, somenteAvaliador } = require("../middlewares/authMiddleware")
const usuariosController = require("../controllers/usuariosController");

router.post("/cadastrar", usuariosController.cadastrarUsuario);
router.post("/login", usuariosController.loginUsuario);
router.get("/listarTodos", autenticarToken, usuariosController.listarTodosUsuarios)
router.get("/buscarPorId/:id", autenticarToken, usuariosController.buscarUsuarioPorId)
router.put("/atualizar/:id", autenticarToken, usuariosController.atualizarUsuario)
router.delete("/excluir/:id", autenticarToken, usuariosController.excluirUsuario)

module.exports = router;
 