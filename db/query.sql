CREATE TABLE pengguna (
	id SERIAL PRIMARY KEY,
	nama VARCHAR,
	email VARCHAR,
	password VARCHAR,
	role VARCHAR,
	no_telepon VARCHAR,
	created_at TIMESTAMPTZ
);

CREATE TABLE lahan (
	id SERIAL PRIMARY KEY,
	id_pengguna INTEGER,
	nama VARCHAR,
	deskripsi TEXT,
	tanaman VARCHAR,
	created_at TIMESTAMPTZ,
	CONSTRAINT pengguna_lahan_idpengguna_fkey FOREIGN KEY (id_pengguna)
      REFERENCES pengguna (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE data_sensor (
	id SERIAL PRIMARY KEY,
	id_lahan INTEGER,
	suhu INTEGER,
	kelembaban INTEGER,
	cahaya INTEGER,
	angin INTEGER,
	cuaca VARCHAR,
	waktu TIMESTAMPTZ,
	CONSTRAINT lahan_datasensor_idlahan_fkey FOREIGN KEY (id_lahan)
      REFERENCES lahan (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE panen (
	id SERIAL PRIMARY KEY,
	id_lahan INTEGER,
	deskripsi TEXT,
	hasil INTEGER,
	profit BIGINT,
	waktu VARCHAR,
	CONSTRAINT lahan_panen_idlahan_fkey FOREIGN KEY (id_lahan)
      REFERENCES lahan (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE data_manual (
	id SERIAL PRIMARY KEY,
	id_lahan INTEGER,
	deskripsi TEXT,
	aktivitas VARCHAR,
	waktu VARCHAR,
	CONSTRAINT lahan_datamanual_idlahan_fkey FOREIGN KEY (id_lahan)
      REFERENCES lahan (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

SET timezone = 'Asia/Jakarta';