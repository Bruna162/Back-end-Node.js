CREATE DATABASE banco_anime;

USE banco_anime;

CREATE TABLE usuarios (
    id_usuarios INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(20) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL
);

CREATE TABLE animes (
    id_anime INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT,
    estudio VARCHAR(255),
    imagem_url VARCHAR(500),
    episodios_totais INT NOT NULL,
    genero ENUM('Shonen', 'Seinen', 'Isekai', 'Shoujo') NOT NULL
);

CREATE TABLE listas_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    anime_id INT,
    status ENUM('Quero Assistir', 'Assistindo', 'Concluído', 'Abandonado') NOT NULL,
    episodios_assistidos INT DEFAULT 0,
    adicionado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuarios) ON DELETE CASCADE,
    FOREIGN KEY (anime_id) REFERENCES animes(id_anime) ON DELETE CASCADE
);
