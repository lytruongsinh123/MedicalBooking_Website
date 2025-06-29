module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn("Users", "image", {
                type: Sequelize.BLOB('long'), // có 3 kiểu BLOB tiny, medium, long, mặc định là BLOB tiny
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
