"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        //  name: DataTypes.STRING,
        //     nameEn: DataTypes.STRING,
        //     descriptionHTML: DataTypes.TEXT,
        //     descriptionMarkdown: DataTypes.TEXT,
        //     image: DataTypes.TEXT,
        //     address: DataTypes.STRING,
        //     lat: DataTypes.FLOAT,
        //     lng: DataTypes.FLOAT,
        await queryInterface.createTable("Clinics", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            descriptionHTML: {
                type: Sequelize.TEXT,
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT,
            },
            image: {
                type: Sequelize.BLOB("long"),
            },
            name: {
                type: Sequelize.STRING,
            },
            nameEn: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            lat: {
                type: Sequelize.FLOAT,
            },
            lng: {
                type: Sequelize.FLOAT,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Clinics");
    },
};
