import sqlite3 from 'sqlite3';

// Open database or create database if not exist


const db = new sqlite3.Database('database.db', (err) => {
	if (err)
		console.error('Error opening database', err.message);
	else
		console.log('successful connection');
});

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		fullname TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		twofa_enable BOOLEAN NOT NULL,
		twofa_secret TEXT,
		twofa_token TEXT,
		login_token TEXT,
		avatar TEXT,
		connected BOOLEAN NOT NULL,
		preferredLanguage TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`);
	db.run(`CREATE TABLE IF NOT EXISTS games (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		game_token TEXT NOT NULL,
		users TEXT NOT NULL,
		finished BOOLEAN NOT NULL,
		winner TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		end_at TIMESTAMP
	)`);
	db.run(`CREATE TABLE IF NOT EXISTS customizations (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		color TEXT,
		powerup BOOLEAN,
		mapevents BOOLEAN	
	)`);
	db.run(`CREATE TABLE IF NOT EXISTS friends (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		caller TEXT NOT NULL,
		target TEXT NOT NULL,
		accepted BOOLEAN NOT NULL
	)`);
});


export default db; 