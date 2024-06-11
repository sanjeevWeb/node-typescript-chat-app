import dotenv from 'dotenv'

dotenv.config({ path: ".env." }); 

export const config = {
    HOST: process.env.DATABASE_HOST || "localhost",
    USER: process.env.DATABASE_USER || "root",
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_NAME || "testdb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const dialect = "mysql"