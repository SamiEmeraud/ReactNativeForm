import { getDb } from './connexion';

// [id, nom, univers, prix, stock] : l'image est {id}.jpeg dans assets/produits
const PRODUITS_DE_DEPART = [
 [1, 'Son Goku Jr.', 'Dragon Ball', 15, 1000],
 [2, 'Équipage du Chapeau de paille', 'One Piece', 13, 1000],
 [3, 'Équipe 7', 'Naruto', 12, 123456],
 [4, 'Gon, Killua, Kurapika & Leorio', 'Hunter x Hunter', 11.59, 4568],
 [5, "Bataillon d'exploration", "L'Attaque des Titans", 11, 9658],
 [6, 'Itadori, Megumi & Nobara', 'Jujutsu Kaisen', 9.99, 78541],
 [7, 'Tanjiro, Nezuko, Zenitsu & Inosuke', 'Demon Slayer', 12.79, 85421],
 [8, 'Deku, Bakugo & Uraraka', 'My Hero Academia', 8.76, 789456],
 [9, 'Figurine Guts', 'Berserk', 19.99, 12468],
 [10, 'Figurine Lelouch Vi Britannia', 'Code Geass', 15.99, 12487],
 [17, 'Figurine Shinichi', 'Parasyte', 16.32, 145699],
 [18, 'Figurine Ye Xiu', 'Quanzhi Gaoshou', 9.36, 1236985],
 [19, 'Figurine Subaru x Rem', 'Re:Zero', 15.32, 56982],
 [22, 'Figurine Ultraman', 'Ultraman', 9, 184],
 [24, 'Figurine Tristepin', 'Wakfu', 19, 268],
 [30, 'Monkey D. Luffy', 'One Piece', 18.99, 10],
 [31, 'Roronoa Zoro', 'One Piece', 22.5, 10],
 [32, 'Sanji', 'One Piece', 19.99, 10],
 [33, 'Nami', 'One Piece', 17.99, 10],
 [34, 'Tony Tony Chopper', 'One Piece', 15.99, 10],
 [35, 'Franky', 'One Piece', 24.99, 10],
 [36, 'Son Goku', 'Dragon Ball', 25.99, 10],
 [37, 'Vegeta', 'Dragon Ball', 24.99, 10],
 [38, 'Freezer', 'Dragon Ball', 19.99, 10],
 [39, 'Gohan', 'Dragon Ball', 21.99, 10],
 [40, 'Piccolo', 'Dragon Ball', 18.99, 10],
 [41, 'Naruto Uzumaki', 'Naruto', 20.99, 10],
 [42, 'Sasuke Uchiha', 'Naruto', 20.99, 10],
 [43, 'Kakashi Hatake', 'Naruto', 22.99, 10],
 [44, 'Itachi Uchiha', 'Naruto', 26.99, 10],
 [45, 'Sakura Haruno', 'Naruto', 18.99, 10],
 [46, 'Tanjiro Kamado', 'Demon Slayer', 23.99, 10],
 [47, 'Nezuko Kamado', 'Demon Slayer', 21.99, 10],
 [48, 'Zenitsu Agatsuma', 'Demon Slayer', 19.99, 10],
 [49, 'Inosuke Hashibira', 'Demon Slayer', 20.99, 10],
 [50, 'Giyu Tomioka', 'Demon Slayer', 24.99, 10],
 [51, 'Izuku Midoriya', 'My Hero Academia', 19.99, 10],
 [52, 'Katsuki Bakugo', 'My Hero Academia', 21.99, 10],
 [53, 'Shoto Todoroki', 'My Hero Academia', 22.99, 10],
 [54, 'All Might', 'My Hero Academia', 27.99, 10],
 [55, 'Ochaco Uraraka', 'My Hero Academia', 17.99, 10],
 [56, 'Figurine Kirua "God Speed"', 'Hunter x Hunter', 21.99, 10],
 [57, 'Figurine Hisoka Morow', 'Hunter x Hunter', 22.01, 10],
 [58, 'Figurine Gon "Rock"', 'Hunter x Hunter', 15.65, 10],
 [59, 'Figurine Kurapika', 'Hunter x Hunter', 33.8, 10],
 [60, 'Figurine Meruem', 'Hunter x Hunter', 20.03, 10],
 [61, 'Livaï', "L'Attaque des Titans", 34.87, 10],
 [62, 'Mikasa', "L'Attaque des Titans", 23.66, 10],
 [63, 'Eren', "L'Attaque des Titans", 30.78, 10],
 [64, 'Armin', "L'Attaque des Titans", 34.9, 10],
 [65, 'Erwin', "L'Attaque des Titans", 20.66, 10],
 [66, 'Satoru Gojo', 'Jujutsu Kaisen', 24.7, 10],
 [67, 'Figurine Itadori Yuji "Rayon noir"', 'Jujutsu Kaisen', 15.36, 10],
 [68, 'Figurine Megumi', 'Jujutsu Kaisen', 21.61, 10],
 [69, 'Figurine Sukuna "Fourneau"', 'Jujutsu Kaisen', 28.88, 10],
 [70, 'Figurine Yuta "Union Maudite"', 'Jujutsu Kaisen', 31.96, 10],
 [71, 'Figurine Guts armure du Berserker', 'Berserk', 19.68, 10],
 [72, 'Figurine Guts "Mad Dog"', 'Berserk', 29.64, 10],
 [74, 'Figurine C.C.', 'Code Geass', 26.2, 10],
 [75, 'Figurine Shiki Granbell', 'Edens Zero', 33.36, 10],
 [76, 'Figurine Rebecca', 'Edens Zero', 24.38, 10],
 [77, 'Figurine Erza "Armure Hakama"', 'Fairy Tail', 34.41, 10],
 [78, 'Figurine LED Natsu Dragnir', 'Fairy Tail', 30.51, 10],
 [79, 'Figurine Rudo "Rebre"', 'Gachiakuta', 17.52, 10],
 [80, 'Figurine Enjin "Parapluie"', 'Gachiakuta', 19.56, 10],
 [81, 'Figurine Mark', 'Inazuma Eleven', 22.51, 10],
 [82, 'Figurine Nathan', 'Inazuma Eleven', 22.71, 10],
 [83, 'Figurine Reno Ichikawa', 'Kaiju n°8', 24.86, 10],
 [84, 'Figurine Kafka Hibino', 'Kaiju n°8', 25.95, 10],
 [85, 'Figurine Nico Yazawa', 'Love Live!', 33.59, 10],
 [86, 'Figurine Rin Hoshizora', 'Love Live!', 29.99, 10],
 [91, 'Figurine Emilia', 'Re:Zero', 26.9, 10],
 [92, 'Figurine Rem & Ram', 'Re:Zero', 20.12, 10],
 [93, 'Figurine Taro Sakamoto', 'Sakamoto Days', 28.03, 10],
 [94, 'Figurine Nagumo', 'Sakamoto Days', 25.58, 10],
 [101, 'Figurine Yugo', 'Wakfu', 20.97, 10],
 [102, 'Figurine Evangelyne', 'Wakfu', 33.78, 10],
 [107, 'Figurine Zodd', 'Berserk', 23.88, 10],
 [108, 'Figurine Chevalier Squelette', 'Berserk', 27.15, 10],
 [109, 'Figurine Lelouch x Suzaku', 'Code Geass', 16.83, 10],
 [110, 'Figurine Lelouch Lamperouge', 'Code Geass', 22.67, 10],
 [113, 'Figurine Grey Fullbuster', 'Fairy Tail', 26.45, 10],
 [114, 'Figurine Lucy Heartfilia', 'Fairy Tail', 16.47, 10],
 [115, 'Figurine Riyo "Jinki"', 'Gachiakuta', 15.53, 10],
 [116, 'Figurine Zanka "Vital Instrument"', 'Gachiakuta', 32.77, 10],
 [117, 'Figurine Axel', 'Inazuma Eleven', 24.62, 10],
 [118, 'Figurine Jude', 'Inazuma Eleven', 17.62, 10],
 [119, 'Figurine Kafka Hibino (Kaiju)', 'Kaiju n°8', 28.57, 10],
 [120, 'Figurine Kikoru Shinomiya', 'Kaiju n°8', 32.66, 10],
 [129, 'Figurine Shin', 'Sakamoto Days', 26.62, 10],
 [131, 'Figurine Norman, Emma & Ray', 'The Promised Neverland', 16.71, 10],
 [135, "Figurine Jack l'Éventreur", 'Valkyrie Apocalypse', 20.76, 10],
 [136, 'Figurine Le Roi', 'Valkyrie Apocalypse', 17.62, 10],
 [137, 'Figurine Amalia', 'Wakfu', 15.32, 10],
 [140, 'Figurine Ichihara', 'xxxHOLiC', 28.14, 10],
 [142, 'Figurine Yaiba Kurogane', 'Yaiba', 32.07, 10],
];

const VERSION_PRODUITS = 2;

export const initProduits = async () => {
 const db = await getDb();
 // Si la liste PRODUITS_DE_DEPART change, augmenter VERSION_PRODUITS :
 // l'ancienne table est alors supprimée puis recréée avec la nouvelle liste
 const { user_version } = await db.getFirstAsync('PRAGMA user_version');
 if (user_version < VERSION_PRODUITS) {
 await db.execAsync(`DROP TABLE IF EXISTS produits; PRAGMA user_version = ${VERSION_PRODUITS};`);
 }
 await db.execAsync(`
 CREATE TABLE IF NOT EXISTS produits (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nom TEXT NOT NULL,
 categorie TEXT NOT NULL,
 prix REAL NOT NULL,
 stock INTEGER NOT NULL DEFAULT 0,
 image TEXT
 );
 `);
 // On ne remplit la table que si elle est vide
 const { n } = await db.getFirstAsync('SELECT COUNT(*) AS n FROM produits');
 if (n > 0) return;
 await db.withTransactionAsync(async () => {
 // Boucle : chaque produit reçoit l'image {id}.jpeg
 for (const [id, nom, categorie, prix, stock] of PRODUITS_DE_DEPART) {
 await db.runAsync(
 'INSERT INTO produits (id, nom, categorie, prix, stock, image) VALUES (?, ?, ?, ?, ?, ?)',
 id, nom, categorie, prix, stock, `${id}.jpeg`
 );
 }
 });
};

const FILTRE = 'nom LIKE ? AND (? IS NULL OR categorie = ?)';
const parametresFiltre = (recherche, categorie) => [
 `%${recherche.trim()}%`, categorie, categorie,
];

export const listerProduits = async ({
 recherche = '', categorie = null, limite = -1, decalage = 0,
} = {}) => {
 const db = await getDb();
 return db.getAllAsync(
 `SELECT id, nom, categorie, prix, stock, image FROM produits
 WHERE ${FILTRE}
 ORDER BY nom, id
 LIMIT ? OFFSET ?`,
 ...parametresFiltre(recherche, categorie),
 limite,
 decalage
 );
};

export const compterProduits = async ({ recherche = '', categorie = null } = {}) => {
 const db = await getDb();
 const { n } = await db.getFirstAsync(
 `SELECT COUNT(*) AS n FROM produits WHERE ${FILTRE}`,
 ...parametresFiltre(recherche, categorie)
 );
 return n;
};

export const listerCategories = async () => {
 const db = await getDb();
 const lignes = await db.getAllAsync(
 'SELECT DISTINCT categorie FROM produits ORDER BY categorie'
 );
 return lignes.map((ligne) => ligne.categorie);
};

export const insererProduit = async (nom, categorie, prix, stock) => {
 const db = await getDb();
 const resultat = await db.runAsync(
 'INSERT INTO produits (nom, categorie, prix, stock) VALUES (?, ?, ?, ?)',
 nom, categorie, prix, stock
 );
 return resultat.lastInsertRowId;
};
