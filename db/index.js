const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:code@localhost/subscription_logger_db');
const {UUID, UUIDV4, STRING, ENUM, DECIMAL} = Sequelize;


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

const Subscription = conn.define('subscription', {
    name: {
        type: ENUM('NETFLIX', 'HULU', 'DISNEY+', 'SPOTIFY'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Subscriber.hasMany(Subscription);
Subscription.belongsTo(Subscriber);
const syncAndSeed = async() => {
    await conn.sync({force:true});
    const [Rose, Phil, Thomas] = await Promise.all(
        ['Rose', 'Phil', 'Thomas'].map(name => Subscriber.create({name:name}))
    );
    await Promise.all([
        Subscription.create({name:'NETFLIX', price: 15.99, subscriberId:Rose.id}),
        Subscription.create({name:'NETFLIX', price: 15.99, subscriberId:Phil.id}),
        Subscription.create({name:'NETFLIX', price: 15.99, subscriberId:Thomas.id}),
        Subscription.create({name:'HULU', price: 11.99, subscriberId:Thomas.id}),
        Subscription.create({name:'HULU', price: 11.99, subscriberId:Rose.id}),
        Subscription.create({name:'DISNEY+', price: 15.99, subscriberId:Thomas.id})
    ])
}

module.exports = {
    syncAndSeed,
    Subscriber,
    Subscription
};