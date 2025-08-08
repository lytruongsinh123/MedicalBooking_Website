const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        dialectOptions:
            process.env.DB_SSL === "true"
                ? {
                      ssl: {
                          require: true,
                          rejectUnauthorized: false,
                      },
                      keepAlive: true,
                      connectionTimeoutMillis: 30000,
                  }
                : {
                      keepAlive: true,
                      connectionTimeoutMillis: 30000,
                  },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        query: {
            raw: true,
        },
        timezone: "+07:00",
    }
);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
module.exports = connectDB;
