import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config(); 
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,        
  password: process.env.PASSWORD,         
  database: process.env.DATABASE ,   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
});

const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully!");
    connection.release(); // Release connection back to pool
  } catch (err) {
    console.error("Failed to connect to MySQL database:");
    console.error(err.message);
  }
};

connectToDatabase();

export default pool;
