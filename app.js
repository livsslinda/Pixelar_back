require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conexao = require("./conexao");

const usuariosRoutes = require("./routes/usuariosRoutes");
const vagasRoutes = require("./routes/vagasRoutes");
const curriculoRoutes = require("./routes/curriculoRoutes");
const candidaturaRoutes = require("./routes/candidaturaRoutes");
const triagemRoutes = require("./routes/triagemRoutes");

const app = express();

const bodyParser = require('body-parser');
const { put, del } = require('@vercel/blob');

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});

app.use("/usuarios", usuariosRoutes);
app.use("/vagas", vagasRoutes);
app.use("/curriculos", curriculoRoutes);
app.use("/candidaturas", candidaturaRoutes);
app.use("/triagem", triagemRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor executando em: http://localhost:${port}`);
});
