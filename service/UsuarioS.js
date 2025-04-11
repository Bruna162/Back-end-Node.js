import express from "express";
import mysql from "../Dados/mysql.js";

const router = express.Router();

router.post("/InserirUsuario", async (req, res) => {
    const { nome, senha, email } = req.body;
    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute("INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)", [nome, senha, email]);
        res.status(201).send("Usuário cadastrado!");
    } catch (erro) {
        res.status(500).send("Erro ao cadastrar usuário.");
    }
});

router.get("/ListarUsuarios", async (req, res) => {
    try {
        const conexao = await mysql.bancoDados();
        const [resultado] = await conexao.execute("SELECT id_usuarios, nome, email FROM usuarios");
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).send("Erro ao listar usuários.");
    }
});

router.put("/AtualizarUsuario/:id_usuarios", async (req, res) => {
    const { id_usuarios } = req.params;
    const { nome, senha, email } = req.body;
    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute("UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id_usuarios = ?", [nome, senha, email, id_usuarios]);
        res.status(200).send("Usuário atualizado!");
    } catch (erro) {
        res.status(500).send("Erro ao atualizar usuário.");
    }
});

router.delete("/DeletarUsuario/:id_usuarios", async (req, res) => {
    const { id_usuarios } = req.params;
    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute("DELETE FROM usuarios WHERE id_usuarios = ?", [id_usuarios]);
        res.status(200).send("Usuário removido!");
    } catch (erro) {
        res.status(500).send("Erro ao deletar usuário.");
    }
});

export default router;
