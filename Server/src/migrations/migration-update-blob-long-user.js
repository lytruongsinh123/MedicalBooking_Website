module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "image", {
                type: Sequelize.BLOB, // có 3 kiểu BLOB tiny, medium, long, mặc định là BLOB tiny Sequelize.BLOB('long'),
                allowNull: true,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "image", {
                type: Sequelize.STRING,
                allowNull: true,
            }),
        ]);
    },
};
