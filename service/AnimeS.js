import express from "express";
import mysql from "../Dados/mysql.js";

const router = express.Router();

router.post("/InserirAnime", async (req, res) => {
    const { titulo, sinopse, estudio, imagem_url, episodios, genero } = req.body;

    if (!titulo || !genero || !episodios || isNaN(parseInt(episodios))) {
        return res.status(400).send("Dados inválidos: título, gênero e episódios são obrigatórios.");
    }

    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute(
            "INSERT INTO animes (titulo, sinopse, estudio, imagem_url, episodios_totais, genero) VALUES (?, ?, ?, ?, ?, ?)",
            [titulo, sinopse, estudio, imagem_url, parseInt(episodios), genero]
        );
        await conexao.end();
        res.status(201).send("Anime cadastrado!");
    } catch (erro) {
        console.error("Erro ao cadastrar anime:", erro);
        res.status(500).send("Erro ao cadastrar anime: " + erro.message);
    }
});

router.get("/ListarAnime", async (req, res) => {
    try {
        const conexao = await mysql.bancoDados();
        const [resultado] = await conexao.execute(
            "SELECT id_anime, titulo, sinopse, estudio, imagem_url, episodios_totais AS episodios, genero FROM animes"
        );
        await conexao.end();
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao listar animes:", erro);
        res.status(500).send("Erro ao listar animes: " + erro.message);
    }
});

router.put("/AtualizarAnime/:id_anime", async (req, res) => {
    const { id_anime } = req.params;
    const { titulo, sinopse, estudio, imagem_url, episodios, genero } = req.body;

    if (!titulo || !genero || !episodios || isNaN(parseInt(episodios))) {
        return res.status(400).send("Dados inválidos: título, gênero e episódios são obrigatórios.");
    }

    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute(
            "UPDATE animes SET titulo = ?, sinopse = ?, estudio = ?, imagem_url = ?, episodios_totais = ?, genero = ? WHERE id_anime = ?",
            [titulo, sinopse, estudio, imagem_url, parseInt(episodios), genero, id_anime]
        );
        await conexao.end();
        res.status(200).send("Anime atualizado!");
    } catch (erro) {
        console.error("Erro ao atualizar anime:", erro);
        res.status(500).send("Erro ao atualizar anime: " + erro.message);
    }
});

router.delete("/DeletarAnime/:id_anime", async (req, res) => {
    const { id_anime } = req.params;

    try {
        const conexao = await mysql.bancoDados();
        await conexao.execute("DELETE FROM animes WHERE id_anime = ?", [id_anime]);
        await conexao.end();
        res.status(200).send("Anime removido!");
    } catch (erro) {
        console.error("Erro ao deletar anime:", erro);
        res.status(500).send("Erro ao deletar anime: " + erro.message);
    }
});

export default router;
