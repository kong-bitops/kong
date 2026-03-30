export const createShoesTableSql = `
CREATE TABLE IF NOT EXISTS shoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  era TEXT NOT NULL,
  releaseYear INTEGER NOT NULL,
  priceKRW INTEGER NOT NULL,
  positionTag TEXT NOT NULL,
  traction REAL NOT NULL,
  cushioning REAL NOT NULL,
  support REAL NOT NULL,
  stability REAL NOT NULL,
  weightScore REAL NOT NULL,
  breathability REAL NOT NULL,
  outdoorDurability REAL NOT NULL,
  retroStyleScore REAL NOT NULL,
  footWidthFit TEXT NOT NULL,
  summary TEXT NOT NULL,
  imageUrl TEXT
);
`;

export const createFavoritesTableSql = `
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shoeId INTEGER NOT NULL UNIQUE,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (shoeId) REFERENCES shoes(id)
);
`;

export const createRecommendationLogsTableSql = `
CREATE TABLE IF NOT EXISTS recommendation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profileJson TEXT NOT NULL,
  resultJson TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
`;
