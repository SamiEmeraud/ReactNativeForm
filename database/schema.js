import { getDb } from './connexion';
import { initProduits } from './produits';

// Comme getDb : la base n'est initialisée qu'une seule fois,
// même si plusieurs écrans appellent initDb en même temps
let initPromise = null;
export const initDb = () => {
 if (!initPromise) {
 initPromise = creerTables().catch((e) => {
 initPromise = null; // en cas d'erreur, on pourra réessayer
 throw e;
 });
 }
 return initPromise;
};

const creerTables = async () => {
 const db = await getDb();
 await db.execAsync(`
 PRAGMA journal_mode = WAL;
 CREATE TABLE IF NOT EXISTS utilisateurs (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nom TEXT NOT NULL,
 prenom TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 telephone TEXT,
 mdp TEXT NOT NULL,
 newsletter INTEGER NOT NULL DEFAULT 0,
 cgu INTEGER NOT NULL DEFAULT 0,
 cree_le TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
 );
 `);
 await initProduits(); // en dernier
};