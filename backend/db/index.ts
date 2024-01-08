import { Pool } from "pg";
import { config } from "dotenv";
config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const query = (text: string, params: any[]) => pool.query(text, params);
