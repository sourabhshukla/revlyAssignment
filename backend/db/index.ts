import { Pool } from "pg";

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "revlyAssignment",
//   password: "sHUKLA@1999",
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const query = (text: string, params: any[]) => pool.query(text, params);
