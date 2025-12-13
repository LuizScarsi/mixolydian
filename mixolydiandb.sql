-- 1. Remoção das tabelas (em ordem inversa para evitar erros de dependência)
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS playlist_music;
DROP TABLE IF EXISTS user_playlist;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS musics;
DROP TABLE IF EXISTS users;

-- 2. Criação das tabelas base
CREATE TABLE users
(
  id bigint NOT NULL,
  name varchar NOT NULL,
  email varchar NOT NULL,
  password_hash varchar NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (id)
);

CREATE TABLE musics
(
  id bigint NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE playlists
(
  id bigint NOT NULL,
  name varchar NOT NULL,
  description text,
  PRIMARY KEY (id)
);

-- 3. Tabelas de Associação (N:N)
CREATE TABLE user_playlist
(
  id_user bigint NOT NULL,
  id_playlist bigint NOT NULL,
  PRIMARY KEY (id_user, id_playlist),
  CONSTRAINT FK_user_playlist_user
    FOREIGN KEY (id_user)
    REFERENCES users (id),
  CONSTRAINT FK_user_playlist_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id)
);

CREATE TABLE playlist_music
(
  id_playlist bigint NOT NULL,
  id_music bigint NOT NULL,
  PRIMARY KEY (id_playlist, id_music),
  CONSTRAINT FK_playlist_music_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id),
  CONSTRAINT FK_playlist_music_music
    FOREIGN KEY (id_music)
    REFERENCES musics (id)
);

-- 4. Tabela de Avaliações
CREATE TABLE ratings
(
  id serial NOT NULL,
  stars integer NOT NULL,
  review text,
  id_user bigint NOT NULL,
  id_playlist bigint NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_ratings_user
    FOREIGN KEY (id_user)
    REFERENCES users (id),
  CONSTRAINT FK_ratings_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id)
);

-- ---------------------------------------------------------
-- INSERÇÃO DE DADOS (SEED)
-- ---------------------------------------------------------

-- Inserindo Usuários (Senhas convertidas para hash de '123456')
INSERT INTO users (id, name, email, password_hash, role) VALUES 
(1, 'Luiz', 'luiz@email.com', '$2b$10$7R9I6I2Wn5vH5I8p9P5uO.A6YfH9UeG0F1Xm3Y4Z5A6B7C8D9E0F1', 'user'),
(2, 'Otavio', 'otavio@email.com', '$2b$10$7R9I6I2Wn5vH5I8p9P5uO.A6YfH9UeG0F1Xm3Y4Z5A6B7C8D9E0F1', 'user'),
(3, 'Admin Sistema', 'admin@email.com', '$2b$10$7R9I6I2Wn5vH5I8p9P5uO.A6YfH9UeG0F1Xm3Y4Z5A6B7C8D9E0F1', 'admin');

-- Inserindo Músicas
INSERT INTO musics (id, name) VALUES 
(1, 'Bohemian Rhapsody'), (2, 'Hotel California'), (3, 'Stairway to Heaven'),
(4, 'Creep'), (5, 'Smells Like Teen Spirit'), (6, 'Everlong');

-- Inserindo Playlists
INSERT INTO playlists (id, name, description) VALUES 
(10, 'Rock Clássico do Luiz', 'As melhores do Luiz'),
(11, 'Vibe Relax Luiz', 'Para estudar'),
(20, 'Grunge do Otavio', 'Anos 90'),
(21, 'Favoritas do Otavio', 'As que mais ouço');

-- Associando Playlists aos Usuários
INSERT INTO user_playlist (id_user, id_playlist) VALUES 
(1, 10), (1, 11), -- Luiz dono das playlists 10 e 11
(2, 20), (2, 21); -- Otavio dono das playlists 20 e 21

-- Adicionando Músicas às Playlists
-- Playlist 10 (Luiz): Musicas 1, 2, 3
INSERT INTO playlist_music (id_playlist, id_music) VALUES (10, 1), (10, 2), (10, 3);
-- Playlist 20 (Otavio): Musicas 4, 5, 6
INSERT INTO playlist_music (id_playlist, id_music) VALUES (20, 4), (20, 5), (20, 6);
