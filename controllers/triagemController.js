const triagemModel = require("../models/triagemModels");

const criarTriagem = async (req, res) => {
  const { id_candidatura, pontuacao, resultado } = req.body;
  try {
    const novaTriagem = await triagemModel.criarTriagem({
      id_candidatura,
      pontuacao,
      resultado,
    });
    res.status(201).json(novaTriagem);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao criar triagem", detalhe: error.message });
  }
};

const listarTriagens = async (req, res) => {
  try {
    const triagens = await triagemModel.listarTriagens();
    res.json(triagens);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar triagens", detalhe: error.message });
  }
};

const listarPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const triagem = await triagemModel.listarPorId(id);
    if (!triagem)
      return res.status(404).json({ erro: "Triagem não encontrada" });
    res.json(triagem);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar triagem", detalhe: error.message });
  }
};

const listarPorCandidatura = async (req, res) => {
  const { id_candidatura } = req.params;
  try {
    const triagens = await triagemModel.listarPorCandidatura(id_candidatura);
    res.json(triagens);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar triagens da candidatura",
      detalhe: error.message,
    });
  }
};

const atualizarTriagem = async (req, res) => {
  const { id } = req.params;
  const { pontuacao, resultado } = req.body;
  try {
    const triagemAtualizada = await triagemModel.atualizarTriagem(id, {
      pontuacao,
      resultado,
    });
    if (!triagemAtualizada)
      return res.status(404).json({ erro: "Triagem não encontrada" });
    res.json(triagemAtualizada);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar triagem", detalhe: error.message });
  }
};

const deletarTriagem = async (req, res) => {
  const { id } = req.params;
  try {
    const excluida = await triagemModel.deletarTriagem(id);
    if (!excluida)
      return res.status(404).json({ erro: "Triagem não encontrada" });
    res.json({ mensagem: "Triagem deletada com sucesso", excluida });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar triagem", detalhe: error.message });
  }
};

const dashboardGamificado = async (req, res) => {
  try {
    const dashboard = await triagemModel.dashboardGamificado();
    res.json(dashboard);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao gerar dashboard", detalhe: error.message });
  }
};

module.exports = {
  criarTriagem,
  listarTriagens,
  listarPorId,
  listarPorCandidatura,
  atualizarTriagem,
  deletarTriagem,
  dashboardGamificado,
};
