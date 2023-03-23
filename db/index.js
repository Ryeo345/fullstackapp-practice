const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:code@localhost/subscription_logger_db');
const {UUID, UUIDV4, STRING, ENUM, INTEGER} = Sequelize;


const Subscriber = conn.define('subscriber', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

const syncAndSeed = async() => {
    await conn.sync({force:true});
    await Promise.all(
        ['Michael', 'Phil', 'David'].map(name => Subscriber.create({name:name}))
    );
}

module.exports = {
    syncAndSeed,
    Subscriber
};