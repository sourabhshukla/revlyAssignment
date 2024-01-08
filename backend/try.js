const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://fgwngdtm:1VvGZ6twtQ73X_iozXZtFfMTqg_4pZfX@mahmud.db.elephantsql.com/fgwngdtm",
});
const a = `CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    user_type VARCHAR(20) CHECK (user_type IN ('Student', 'Tutor')) NOT NULL,
    user_language VARCHAR(255),
    subject_expertise VARCHAR(255),
    class_grade VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);`;
pool.query(a, []);
