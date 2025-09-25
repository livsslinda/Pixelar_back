const pool = require("../conexao");

// Criar nova candidatura
const criarCandidatura = async (id_vaga, id_curriculo) => {
  const result = await pool.query(
    `INSERT INTO candidatura (id_vaga, id_curriculo) 
     VALUES ($1, $2) RETURNING *`,
    [id_vaga, id_curriculo]
  );
  return result.rows[0];
};

// Listar todas candidaturas
const listarCandidaturas = async () => {
  const result = await pool.query(
    `SELECT c.id_candidatura, c.data_candidatura, c.status_candidatura,
            v.titulo AS vaga, u.nome AS candidato
     FROM candidatura c
     JOIN vaga v ON c.id_vaga = v.id_vaga
     JOIN curriculo cur ON c.id_curriculo = cur.id_curriculo
     JOIN usuario u ON cur.id_usuario = u.id_usuario
     ORDER BY c.data_candidatura DESC`
  );
  return result.rows;
};

// Buscar candidatura por ID
const buscarCandidaturaPorId = async (id) => {
  const result = await pool.query(
    `SELECT * FROM candidatura WHERE id_candidatura = $1`,
    [id]
  );
  return result.rows[0];
};

// Atualizar status
const atualizarStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE candidatura 
     SET status_candidatura = $1 
     WHERE id_candidatura = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

// Deletar candidatura
const deletarCandidatura = async (id) => {
  await pool.query(`DELETE FROM candidatura WHERE id_candidatura = $1`, [id]);
  return { mensagem: "Candidatura removida com sucesso" };
};

module.exports = {
  criarCandidatura,
  listarCandidaturas,
  buscarCandidaturaPorId,
  atualizarStatus,
  deletarCandidatura,
};
