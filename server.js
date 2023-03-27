const express = require('express');
const app = express();
const path = require('path');
const {syncAndSeed, Subscriber, Subscription} = require('./db');


app.use('/dist', express.static('dist'));
app.use('/public', express.static('public'));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/subscribers', async(req, res, next) => {
    try {
        res.send(await Subscriber.findAll());
    }
    catch(err) {
        next(err);
    }
})

app.get('/api/subscriptions', async(req, res, next) => {
    try {
        res.send(await Subscription.findAll());
    }
    catch(err) {
        next(err);
    }
})

app.post('/api/subscribers', async(req, res, next) => {
    try {
        const newSubscriber = await Subscriber.create(req.body);
        res.status(201).send(newSubscriber);
    }
    catch (err) {
        next(err);
    }
})

app.delete('/api/subscribers/:id', async(req, res, next) => {
    try {
        const subscriber = await Subscriber.findByPk(req.params.id);
        await subscriber.destroy();
        res.sendStatus(204);
    }
    catch(err) {
        next(err);
    }
})

app.delete('/api/subscriptions/:id', async(req, res, next) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        await subscription.destroy();
        res.sendStatus(204);
}
    catch(err) {
        next(err);
    }
})

app.put('/api/subscribers/:id', async(req, res, next) => {
    try {
        const subscriber = await Subscriber.findByPk(req.params.id);
        res.send(await subscriber.update(req.body));

    }
    catch(err) {
        next(err);
    }
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({error :err})
})

const port = process.env.PORT || 3000;

app.listen(port, async() => {
    try {
        await syncAndSeed();
        console.log(`Listening on port ${port}`);
    }
    catch (err) {
        console.log(err);
    }
})