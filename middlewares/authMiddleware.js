const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // Ex: "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Armazena os dados do usuário no request
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};

const somenteAvaliador = (req, res, next) => {
  if (!req.usuario || req.usuario.tipo_usuario !== "avaliador") {
    return res
      .status(403)
      .json({ erro: "Apenas avaliadores podem acessar esta funcionalidade" });
  }
  next();
};

module.exports = { autenticarToken, somenteAvaliador };
