import { getDb } from './connexion';
export const insererUtilisateur = async ({
 nom, prenom, email, telephone, mdp, newsletter, cgu,
}) => {
 const db = await getDb();
 const resultat = await db.runAsync(
 `INSERT INTO utilisateurs
 (nom, prenom, email, telephone, mdp, newsletter, cgu)
 VALUES (?, ?, ?, ?, ?, ?, ?)`,
 nom.trim(),
 prenom.trim(),
 email.trim().toLowerCase(),
 telephone || null,
 mdp,
 newsletter ? 1 : 0,
 cgu ? 1 : 0
 );
 return resultat.lastInsertRowId;
};
export const listerUtilisateurs = async () => {
 const db = await getDb();
 return db.getAllAsync(
 `SELECT id, nom, prenom, email, telephone, newsletter, cree_le
 FROM utilisateurs ORDER BY id DESC`
 
 );
};
// Change l'email de l'utilisateur (erreur UNIQUE si l'email est déjà pris)
export const modifierEmail = async (id, email) => {
 const db = await getDb();
 await db.runAsync(
 'UPDATE utilisateurs SET email = ? WHERE id = ?',
 email.trim().toLowerCase(),
 id
 );
};
// Change le mot de passe seulement si l'ancien est le bon
// Renvoie true si c'est fait, false si l'ancien mot de passe est faux
export const modifierMdp = async (id, ancienMdp, nouveauMdp) => {
 const db = await getDb();
 const resultat = await db.runAsync(
 'UPDATE utilisateurs SET mdp = ? WHERE id = ? AND mdp = ?',
 nouveauMdp,
 id,
 ancienMdp
 );
 return resultat.changes > 0;
};
// Renvoie l'utilisateur si l'email et le mot de passe correspondent, sinon null
export const verifierConnexion = async (email, mdp) => {
 const db = await getDb();
 return db.getFirstAsync(
 `SELECT id, nom, prenom, email FROM utilisateurs
 WHERE email = ? AND mdp = ?`,
 email.trim().toLowerCase(),
 mdp
 );
};
