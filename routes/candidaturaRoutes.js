const express = require("express");
const router = express.Router();
const candidaturaController = require("../controllers/candidaturaController");

const { autenticarToken, somenteAvaliador } = require("../middlewares/authMiddleware")

router.post("/criar", autenticarToken, candidaturaController.criar);
router.get("/listar", autenticarToken, somenteAvaliador, candidaturaController.listar);
router.get("/listar/:id", autenticarToken, candidaturaController.buscarPorId);
router.put("/atualizar/:id", autenticarToken, somenteAvaliador, candidaturaController.atualizar);
router.delete("/deletar/:id", autenticarToken, candidaturaController.deletar);

module.exports = router;
