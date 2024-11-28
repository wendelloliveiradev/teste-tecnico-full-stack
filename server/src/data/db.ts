import sqlite3 from 'sqlite3';

const database = new sqlite3.Database("./database.sqlite");

function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT,
      origin TEXT,
      destination TEXT,
      distance REAL,
      duration TEXT,
      driver_id INTEGER,
      driver_name TEXT,
      value REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Roda a query de criação da tabela
  database.run(createTableQuery, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err.message);
    } else {
      console.log('Tabela "rides" foi inicializada.');
    }
  });
}

// Função para inserir dados no banco de dados
export function insert(table: string, item: Record<string, any>) {
  const columns = Object.keys(item).join(', ');
  const placeholders = Object.keys(item).map(() => '?').join(', ');
  const values = Object.values(item);

  const insert_query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  // Roda a query de inserção
  database.run(insert_query, values, function (err) {
    if (err) {
      console.error('Erro ao Inserir dados na tabela:', err.message);
    } else {
      console.log(`Row inserted with ID: ${this.lastID}`);
    }
  });
}

// Função para selecionar dados no banco de dados
export function select(query: string, params: any[] = []) {
  return new Promise<any[]>((resolve, reject) => {
    database.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


initDB();