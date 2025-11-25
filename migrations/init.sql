create table IF NOT EXISTS  users (id INTEGER primary key, name text);

CREATE TABLE IF NOT EXISTS liste (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     userId INTEGER,
                                     name TEXT,
    comment TEXT, done number, doneBy number, doneComment TEXTE,
                                     FOREIGN KEY(userId) REFERENCES users(id)
    );

-- Seed : exemple de 5 utilisateurs
INSERT OR IGNORE INTO users(id, name) VALUES
(1, 'Guillaume'),
(2, 'Mireille'),
(3, 'Gilles'),
(4, 'Aurelie'),
(5, 'Fred');
(6, 'Arthur');
(7, 'Gabriel');

-- Quelques todos exemples
INSERT OR IGNORE INTO liste(id, userId, name) VALUES
(1, 1, 'Chausson');
