CREATE DATABASE cherry_crud;

USE cherry_crud;

CREATE TABLE teams(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE members(
  id int NOT NULL AUTO_INCREMENT,
  group_id int,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (group_id) REFERENCES teams (id)
);

INSERT INTO teams (name) VALUES ('NewJeans'), ('(G)-Idle'), ('Woo!ah!'), ('Aespa'), ('Stayc');

INSERT INTO members (group_id, name) VALUES (1, 'Sakura'), (1, 'Eunchae'), (1, 'Chaewon'), (1, 'Yunjin'), (1, 'Kazuha');
INSERT INTO members (group_id, name) VALUES (2, 'Minji'), (2, 'Hanni'), (2, 'Danielle'), (2, 'Haerin'), (2, 'Hyein');
INSERT INTO members (group_id, name) VALUES (3, 'Soyeon'), (3, 'Minnie'), (3, 'Soojin'), (3, 'Miyeon'), (3, 'Yuqi'), (3, 'Shuhua');
INSERT INTO members (group_id, name) VALUES (4, 'Nana'), (4, 'Wooyeon'), (4, 'Sora'), (4, 'Lucy'), (4, 'Minseo');
INSERT INTO members (group_id, name) VALUES (5, 'Karina'), (5, 'Giselle'), (5, 'Winter'), (5, 'Ningning');
INSERT INTO members (group_id, name) VALUES (6, 'Sumin'), (6, 'Sieun'), (6, 'Isa'), (6, 'Seeun'), (6, 'Yoon'), (6, 'J');

SELECT * FROM members;
SELECT * FROM members WHERE id = 7;