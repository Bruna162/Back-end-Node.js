import express from 'express';
import cors from 'cors';
import AnimeS from "./service/AnimeS.js"
import UsuarioS from "./service/UsuarioS.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/" , AnimeS)
app.use("/" , UsuarioS )

app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000/');
});
