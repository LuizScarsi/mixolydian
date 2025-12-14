DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS playlist_music;
DROP TABLE IF EXISTS user_playlist;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS musics;
DROP TABLE IF EXISTS users;

-- =========================================
-- TABELAS BASE
-- =========================================
CREATE TABLE users (
  id bigint NOT NULL,
  name varchar NOT NULL,
  email varchar NOT NULL,
  password_hash varchar NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'user',
  PRIMARY KEY (id)
);

CREATE TABLE musics (
  id bigint NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE playlists (
  id bigint NOT NULL,
  name varchar NOT NULL,
  description text,
  PRIMARY KEY (id)
);

-- =========================================
-- TABELAS DE ASSOCIAÇÃO
-- =========================================
CREATE TABLE user_playlist (
  id_user bigint NOT NULL,
  id_playlist bigint NOT NULL,
  PRIMARY KEY (id_user, id_playlist),
  CONSTRAINT fk_user_playlist_user
    FOREIGN KEY (id_user)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_user_playlist_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id)
    ON DELETE CASCADE
);

CREATE TABLE playlist_music (
  id_playlist bigint NOT NULL,
  id_music bigint NOT NULL,
  PRIMARY KEY (id_playlist, id_music),
  CONSTRAINT fk_playlist_music_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_playlist_music_music
    FOREIGN KEY (id_music)
    REFERENCES musics (id)
    ON DELETE CASCADE
);

-- =========================================
-- RATINGS
-- =========================================
CREATE TABLE ratings (
  id serial NOT NULL,
  stars integer NOT NULL,
  review text,
  id_user bigint NOT NULL,
  id_playlist bigint NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_ratings_user
    FOREIGN KEY (id_user)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_ratings_playlist
    FOREIGN KEY (id_playlist)
    REFERENCES playlists (id)
    ON DELETE CASCADE,
  CONSTRAINT unique_user_playlist_rating
    UNIQUE (id_user, id_playlist)
);

-- =========================================
-- SEED
-- =========================================
INSERT INTO users (id, name, email, password_hash, role) VALUES 
(1, 'Luiz', 'luiz@email.com', '$2b$10$hashfake', 'user'),
(2, 'Otavio', 'otavio@email.com', '$2b$10$hashfake', 'user'),
(3, 'Admin Sistema', 'admin@email.com', '$2b$10$hashfake', 'admin');

INSERT INTO musics (id, name) VALUES 
-- Rock / Clássico
(1, 'Bohemian Rhapsody'),
(2, 'Hotel California'),
(3, 'Stairway to Heaven'),

-- Grunge
(4, 'Creep'),
(5, 'Smells Like Teen Spirit'),
(6, 'Everlong'),

-- Jazz
(7, 'So What'),
(8, 'Take Five'),
(9, 'My Favorite Things'),

-- Metal Clássico
(10, 'Master of Puppets'),
(11, 'Iron Man'),
(12, 'Painkiller'),

-- Metalcore
(13, 'My Curse'),
(14, 'This Fire Burns'),
(15, 'Shadow Moses'),

-- Post-Punk
(16, 'Disorder'),
(17, 'A Forest'),
(18, 'Just Like Honey');


INSERT INTO playlists (id, name, description) VALUES 
-- Luiz
(10, 'Rock Clássico do Luiz', 'As melhores do rock clássico'),
(11, 'Jazz Noturno', 'Jazz pra estudar ou relaxar'),
(12, 'Post-Punk Vibes', 'Clima sombrio e introspectivo'),

-- Otavio
(20, 'Grunge do Otavio', 'Anos 90'),
(21, 'Metal Clássico', 'Peso e riffs eternos'),
(22, 'Metalcore Insano', 'Pra quebrar o pescoço'),

-- Admin
(30, 'Curadoria Jazz', 'Clássicos indispensáveis'),
(31, 'Post-Punk Essencial', 'O melhor do pós-punk');

INSERT INTO user_playlist (id_user, id_playlist) VALUES 
-- Luiz
(1, 10),
(1, 11),
(1, 12),

-- Otavio
(2, 20),
(2, 21),
(2, 22),

-- Admin
(3, 30),
(3, 31);

INSERT INTO playlist_music (id_playlist, id_music) VALUES 
-- Rock Clássico
(10, 1), (10, 2), (10, 3),

-- Jazz Noturno
(11, 7), (11, 8), (11, 9),

-- Post-Punk Vibes
(12, 16), (12, 17), (12, 18),

-- Grunge
(20, 4), (20, 5), (20, 6),

-- Metal Clássico
(21, 10), (21, 11), (21, 12),

-- Metalcore
(22, 13), (22, 14), (22, 15),

-- Curadoria Jazz
(30, 7), (30, 8), (30, 9),

-- Post-Punk Essencial
(31, 16), (31, 17);
