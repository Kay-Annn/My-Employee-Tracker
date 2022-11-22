import Sequelize from 'sequelize';

// Enable access to .env variables
import * as dotenv from 'dotenv'
dotenv.config();

// Use environment variables to connect to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3000
  }
);

export default sequelize;