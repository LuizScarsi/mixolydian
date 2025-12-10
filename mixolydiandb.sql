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

-- 5. Inserção de Dados de Teste
INSERT INTO users (id, name, email) VALUES (1, 'Alice Miranda', 'alice@email.com');
INSERT INTO users (id, name, email) VALUES (2, 'Bob Silva', 'bob@email.com');

INSERT INTO musics (id, name) VALUES (1, 'Bohemian Rhapsody');
INSERT INTO musics (id, name) VALUES (2, 'Interstate Love Song');
INSERT INTO musics (id, name) VALUES (3, 'In the End');

INSERT INTO playlists (id, name, description) VALUES (1, 'Rock Clássico', 'Melhores do Rock dos anos 70/80');
INSERT INTO playlists (id, name, description) VALUES (2, 'Grunge & Nu Metal', 'Anos 90 e 2000');

-- Associações: Bob é dono das duas playlists
INSERT INTO user_playlist (id_user, id_playlist) VALUES (2, 1);
INSERT INTO user_playlist (id_user, id_playlist) VALUES (2, 2);

-- Músicas nas playlists
INSERT INTO playlist_music (id_playlist, id_music) VALUES (1, 1);
INSERT INTO playlist_music (id_playlist, id_music) VALUES (2, 2);
INSERT INTO playlist_music (id_playlist, id_music) VALUES (2, 3);

-- Avaliação: Alice avalia a playlist do Bob
INSERT INTO ratings (stars, review, id_user, id_playlist) VALUES (5, 'Seleção incrível!', 1, 1);